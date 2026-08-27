<?php
/**
 * Plugin Name: 응급배관119 KBoard Bridge
 * Description: 인증된 WordPress REST 요청으로 KBoard 게시판 목록을 조회하고 게시글을 등록합니다.
 * Version: 0.1.0
 * Author: 응급배관119
 */

if (!defined('ABSPATH')) exit;

final class Drain119_KBoard_Bridge {
    const NS = 'drain119/v1';

    public static function init() {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    public static function register_routes() {
        register_rest_route(self::NS, '/kboard/boards', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array(__CLASS__, 'list_boards'),
            'permission_callback' => array(__CLASS__, 'can_edit'),
        ));

        register_rest_route(self::NS, '/kboard/posts', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array(__CLASS__, 'create_post'),
            'permission_callback' => array(__CLASS__, 'can_edit'),
            'args' => array(
                'board_id' => array('required' => true, 'type' => 'integer', 'minimum' => 1),
                'title' => array('required' => true, 'type' => 'string'),
                'content' => array('required' => true, 'type' => 'string'),
                'member_display' => array('required' => false, 'type' => 'string', 'default' => '응급배관119'),
                'category1' => array('required' => false, 'type' => 'string', 'default' => ''),
                'category2' => array('required' => false, 'type' => 'string', 'default' => ''),
                'dedupe_key' => array('required' => false, 'type' => 'string', 'default' => ''),
            ),
        ));
    }

    public static function can_edit() {
        return is_user_logged_in() && current_user_can('edit_posts');
    }

    private static function kboard_ready() {
        return class_exists('KBContent') && class_exists('KBoard');
    }

    public static function list_boards() {
        if (!self::kboard_ready()) {
            return new WP_Error('kboard_missing', 'KBoard 플러그인을 찾을 수 없습니다.', array('status' => 503));
        }

        global $wpdb;
        $table = $wpdb->prefix . 'kboard_board_setting';
        $rows = $wpdb->get_results("SELECT uid, board_name FROM `{$table}` ORDER BY uid ASC", ARRAY_A);

        if (!is_array($rows)) {
            return new WP_Error('kboard_query_failed', 'KBoard 게시판 목록을 읽지 못했습니다.', array('status' => 500));
        }

        return rest_ensure_response(array(
            'count' => count($rows),
            'boards' => array_map(function($row) {
                return array(
                    'board_id' => intval($row['uid']),
                    'name' => sanitize_text_field($row['board_name']),
                );
            }, $rows),
        ));
    }

    public static function create_post(WP_REST_Request $request) {
        if (!self::kboard_ready()) {
            return new WP_Error('kboard_missing', 'KBoard 플러그인을 찾을 수 없습니다.', array('status' => 503));
        }

        $board_id = absint($request->get_param('board_id'));
        $title = sanitize_text_field($request->get_param('title'));
        $content_html = wp_kses_post($request->get_param('content'));
        $member_display = sanitize_text_field($request->get_param('member_display'));
        $category1 = sanitize_text_field($request->get_param('category1'));
        $category2 = sanitize_text_field($request->get_param('category2'));
        $dedupe_key = sanitize_key($request->get_param('dedupe_key'));

        if (!$board_id || $title === '' || trim(wp_strip_all_tags($content_html)) === '') {
            return new WP_Error('invalid_payload', 'board_id, title, content가 필요합니다.', array('status' => 400));
        }

        $board = new KBoard($board_id);
        if (!$board->getID()) {
            return new WP_Error('board_not_found', '존재하지 않는 KBoard board_id 입니다.', array('status' => 404));
        }

        // 선택적으로 wp-config.php에서 허용 게시판을 제한할 수 있습니다.
        // 예: define('DRAIN119_KBOARD_ALLOWED_BOARDS', '3,5');
        if (defined('DRAIN119_KBOARD_ALLOWED_BOARDS')) {
            $allowed = array_filter(array_map('absint', explode(',', DRAIN119_KBOARD_ALLOWED_BOARDS)));
            if ($allowed && !in_array($board_id, $allowed, true)) {
                return new WP_Error('board_not_allowed', '자동등록이 허용되지 않은 게시판입니다.', array('status' => 403));
            }
        }

        global $wpdb;
        $content_table = $wpdb->prefix . 'kboard_board_content';

        // 같은 외부 작업의 재시도로 인한 중복 발행을 방지합니다.
        // dedupe_key가 없으면 제목 + 당일 + 게시판으로 한 번 더 방어합니다.
        $today = wp_date('Ymd');
        $existing_uid = 0;
        if ($dedupe_key !== '') {
            $option_table = $wpdb->prefix . 'kboard_board_option';
            $existing_uid = intval($wpdb->get_var($wpdb->prepare(
                "SELECT content_uid FROM `{$option_table}` WHERE option_key=%s AND option_value=%s LIMIT 1",
                'drain119_dedupe_key', $dedupe_key
            )));
        }
        if (!$existing_uid) {
            $existing_uid = intval($wpdb->get_var($wpdb->prepare(
                "SELECT uid FROM `{$content_table}` WHERE board_id=%d AND title=%s AND LEFT(date,8)=%s AND status!='trash' ORDER BY uid DESC LIMIT 1",
                $board_id, $title, $today
            )));
        }
        if ($existing_uid) {
            return rest_ensure_response(array(
                'created' => false,
                'duplicate' => true,
                'content_uid' => $existing_uid,
                'board_id' => $board_id,
                'title' => $title,
            ));
        }

        $now = wp_date('YmdHis');
        $data = array(
            'board_id' => $board_id,
            'parent_uid' => 0,
            'member_uid' => get_current_user_id(),
            'member_display' => $member_display ?: '응급배관119',
            'title' => $title,
            'content' => $content_html,
            'date' => $now,
            'update' => $now,
            'view' => 0,
            'comment' => 0,
            'like' => 0,
            'unlike' => 0,
            'vote' => 0,
            'category1' => $category1,
            'category2' => $category2,
            'secret' => '',
            'notice' => '',
            'search' => 1,
            'thumbnail_file' => '',
            'thumbnail_name' => '',
            'status' => '',
            'password' => '',
        );

        $kcontent = new KBContent();
        $uid = intval($kcontent->insertContent($data));
        if (!$uid) {
            return new WP_Error('kboard_insert_failed', 'KBoard 게시글 등록에 실패했습니다.', array('status' => 500));
        }

        if ($dedupe_key !== '') {
            $option_table = $wpdb->prefix . 'kboard_board_option';
            $wpdb->insert($option_table, array(
                'content_uid' => $uid,
                'option_key' => 'drain119_dedupe_key',
                'option_value' => $dedupe_key,
            ), array('%d', '%s', '%s'));
        }

        do_action('kboard_document_insert', $uid, $board_id, $kcontent, $board);
        do_action("kboard_document_insert_{$board_id}", $uid, $board_id, $kcontent, $board);

        return new WP_REST_Response(array(
            'created' => true,
            'duplicate' => false,
            'content_uid' => $uid,
            'board_id' => $board_id,
            'board_name' => $board->getTitle(),
            'title' => $title,
            'date' => $now,
        ), 201);
    }
}

Drain119_KBoard_Bridge::init();
