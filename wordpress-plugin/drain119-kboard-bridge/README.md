# 응급배관119 KBoard Bridge

이 플러그인은 KBoard 자체가 REST 쓰기 API를 노출하지 않는 환경에서, WordPress Application Password 인증을 사용해 KBoard에 안전하게 글을 등록하기 위한 최소 브리지입니다.

## 제공 API
- `GET /wp-json/drain119/v1/kboard/boards`
  - 현재 KBoard 게시판 ID와 게시판 이름 조회
- `POST /wp-json/drain119/v1/kboard/posts`
  - 인증된 `edit_posts` 권한 사용자만 KBoard 게시글 등록

## 보안
- WordPress 로그인 또는 Application Password 인증 필요
- `edit_posts` 권한 필요
- `wp-config.php`에 아래 상수를 추가하면 자동등록 대상 게시판을 제한할 수 있습니다.

```php
define('DRAIN119_KBOARD_ALLOWED_BOARDS', '3');
```

여러 게시판은 쉼표로 구분합니다.

```php
define('DRAIN119_KBOARD_ALLOWED_BOARDS', '3,5');
```

## 중복 방지
- `dedupe_key`가 있으면 동일 키로 재요청해도 새 글을 만들지 않습니다.
- `dedupe_key`가 없어도 같은 게시판에서 같은 날 같은 제목이 이미 있으면 중복 등록하지 않습니다.

## 클라이언트
저장소 루트에서 환경변수를 설정한 뒤 아래 명령으로 게시판 목록을 확인할 수 있습니다.

```bash
node scripts/kboard-bridge-client.mjs boards
```

실제 등록은 명시적으로 `publish` 명령을 사용합니다.

```bash
node scripts/kboard-bridge-client.mjs publish \
  --board-id 3 \
  --title "경기도 하남시 미사동 싱크대막힘 해결 안내" \
  --content "<p>미사동 싱크대막힘 관련 안내 내용입니다.</p>" \
  --dedupe-key "20260827-hanam-misa-sink-001"
```

첫 실제 쓰기는 대량발행 전에 시험 글 1개로 검증합니다.
