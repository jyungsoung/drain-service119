# 응급배관119 WordPress 자동화

대상: `https://drain119.co.kr`

## 목표
- Cafe24 설치형 WordPress의 실제 쓰기 가능 범위를 먼저 확인한다.
- 일반 WordPress 글과 KBoard 게시글을 구분한다.
- KBoard가 필요한 작업을 일반 WordPress 글로 임의 대체하지 않는다.
- 인증·권한·게시판 식별이 확인되기 전에는 실제 글을 생성하지 않는다.

## 1단계: 기능 점검
`scripts/wordpress-capability-check.mjs`가 아래를 읽기 전용으로 확인한다.

- WordPress REST API 접근 여부
- `wp/v2` 글·페이지 읽기 여부
- 공개된 post type 목록
- KBoard/board 관련 REST namespace·route 존재 여부
- `DRAIN119_WP_USER`, `DRAIN119_WP_APP_PASSWORD`가 설정된 경우 로그인 사용자와 글/페이지 쓰기 메서드 노출 여부

이 점검은 글·페이지·KBoard 게시글을 생성하거나 수정하지 않는다.

## 2단계: 인증
GitHub Actions에서 실제 인증 점검을 하려면 저장소 Secrets에 아래 두 값이 필요하다.

- `DRAIN119_WP_USER`
- `DRAIN119_WP_APP_PASSWORD`

일반 WordPress 관리자 비밀번호를 코드나 저장소 파일에 저장하지 않는다. WordPress 애플리케이션 비밀번호를 사용한다.

## 3단계: 발행기 선택
- 일반 WordPress `posts` 쓰기가 확인되면 일반 글 자동발행기를 별도 workflow로 만든다.
- KBoard REST 쓰기가 확인되면 KBoard 전용 발행기를 만든다.
- KBoard REST 쓰기가 없으면 KBoard 전용 서버측 브리지/API를 WordPress에 설치한 뒤 연결한다.
- KBoard 게시판 UID/board_id, 카테고리 구조, 공개/초안/예약발행 지원 여부를 확인하기 전에는 KBoard 자동발행을 켜지 않는다.

## 운영 안전 규칙
- 첫 쓰기 테스트는 1개 초안으로 시작한다.
- 초안 생성 → 다시 조회 → 제목/본문/카테고리 확인 → 삭제 또는 유지 후 대량화한다.
- 하루 대량발행은 중복 제목·slug·본문을 검사한다.
- 실패 시 재시도 전에 실제 생성 여부를 조회해 중복 발행을 막는다.
- 사용자 요청 없이 기존 글·페이지·KBoard 게시글을 삭제하지 않는다.
