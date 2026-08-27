# 우리동네전문가 AI 운영 규칙

## 프로젝트 목적
- `service.drain119.co.kr`의 서울·경기·인천 중심 지역 서비스 검색 노출 확대
- 지역 페이지, 서비스 페이지, 시공현장 페이지의 안정적인 생성·수정·검수
- 대량 수정 시 기존 URL과 색인 구조를 보호

## 주요 서비스
- 싱크대막힘
- 변기막힘
- 하수구막힘
- 누수탐지
- 고압세척

## 기본 작업 원칙
1. 기존 공개 URL을 임의로 변경하지 않는다.
2. 기존 canonical, robots, sitemap 구조를 변경하기 전에는 영향 범위를 먼저 확인한다.
3. 기존 전화번호, 상담 링크, 브랜드명은 명시적 요청 없이 변경하지 않는다.
4. 대량 수정은 반드시 별도 브랜치에서 진행한다.
5. 코드 수정 전 관련 파일과 데이터 흐름을 먼저 분석한다.
6. 지역별 페이지는 단순 치환형 중복 콘텐츠가 되지 않도록 지역·서비스별 차이를 유지한다.
7. 시공현장 데이터는 `app/work-sites/cases-data.ts`를 기준으로 연결 구조를 확인한다.
8. 수정 후 최소한 build, 링크, 페이지 렌더링, sitemap 영향 여부를 확인한다.

## SEO 검수 기준
- HTTP 200
- title 존재
- H1 존재 및 페이지당 1개를 기본 원칙으로 확인
- 지역명과 서비스명이 title/H1/본문에 자연스럽게 반영
- canonical 정상
- noindex 오설정 없음
- 주요 내부링크 404 없음
- 이미지 로딩 실패 없음
- 중요한 이미지 ALT 확인
- sitemap 포함 여부 확인

## SEO 검사 도구
- 빠른 대량 검사는 `node scripts/seo-audit.mjs`를 사용한다.
- 기본 실행은 프로젝트를 수정하지 않고 `/tmp/drain119-seo-audit`에 CSV/JSON 보고서를 만든다.
- 예: `node scripts/seo-audit.mjs --limit 100 --link-sample 5`
- 이미지까지 확인할 때만 `--check-images`를 추가한다. 대량 실행에서는 네트워크 부하를 고려해 먼저 소규모로 검증한다.
- 실제 브라우저 렌더링 검수는 전역 설치 없이 `/tmp`에서 `npx -y @playwright/cli@latest`를 사용한다.
- 대량 HTTP 검사에서 발견된 문제 URL을 Playwright CLI로 재검증한 뒤 수정한다.
- `npm run seo:daily`는 공개 사이트 500개 기본 상태를 검사한다.
- `npm run seo:full`은 sitemap 전체를 대상으로 핵심 SEO 상태를 검사한다.
- `npm run verify`는 build 후 daily SEO gate까지 실행한다.

## 무인 운영
- `.github/workflows/site-ci.yml`: PR 또는 main push 시 자동 build 검증.
- `.github/workflows/production-health.yml`: 매일 01:10 KST 공개 사이트 점검, 매주 월요일 01:40 KST sitemap 전체 점검.
- 자동 점검 실패 시 GitHub Issue `[자동점검] 우리동네전문가 사이트 이상`을 생성하거나 기존 Issue에 결과를 추가한다.
- 점검이 다시 정상화되면 해당 Issue를 자동으로 정상 회복 처리한다.
- 무인 점검은 문제를 감지하고 보고만 하며 사이트 코드를 자동 수정하지 않는다.

## Cursor 짧은 명령 규칙
사용자가 아래 짧은 문구만 입력해도 긴 설명을 다시 요구하지 말고 해당 절차를 수행한다.

### `전체 검사`
1. `git status`로 작업 상태 확인.
2. `npm run seo:full` 실행.
3. 결과 JSON을 분석해 문제 URL과 반복 패턴만 보고.
4. 코드 자동 수정 금지.

### `빠른 검사`
1. `npm run seo:daily` 실행.
2. 오류가 있으면 문제 URL만 정리.
3. 필요할 때만 Playwright CLI로 재검증.

### `배포 검사`
1. `npm run build` 실행.
2. build 성공 시 변경 파일과 예상 영향 범위 확인.
3. 공개 URL/사이트맵/전화번호/canonical 위험이 있으면 중단하고 보고.
4. 사용자가 배포 또는 push를 명시하지 않았다면 원격 반영 금지.

### `현장 등록`
1. 사용자가 준 지역, 서비스, 날짜, 증상, 점검/작업 내용, 결과, 사진/영상 정보를 정리.
2. 기존 `app/work-sites/cases-data.ts` 구조와 중복 slug를 확인.
3. 실제 사실로 제공된 내용만 사용하고 추정 현장 정보는 만들지 않는다.
4. `regionSlug`, `areaHref`, `serviceHref`를 기존 지역/서비스 구조에 맞춰 연결.
5. 사진/영상 파일은 `public/images/work-sites/`, `public/videos/work-sites/` 기존 규칙을 따른다.
6. `npm run build` 실행.
7. 시공현장 목록·상세·지역 대표페이지·sitemap 연결 여부를 확인.
8. 별도 브랜치에서 변경하고 결과를 보고한다.

### `배포`
1. 먼저 `npm run build` 통과 여부 확인.
2. 변경 범위가 요청과 일치하는지 확인.
3. 현재 브랜치를 push하고 PR을 생성하거나 기존 PR을 갱신.
4. main 병합은 사용자의 명시적 배포 요청이 있을 때만 진행.
5. 병합 후 Netlify 배포 상태와 핵심 공개 URL을 확인.

## 배포 안전 규칙
- `main` 직접 수정 금지. 별도 브랜치에서 작업 후 검수한다.
- 대량 삭제 금지.
- permalink/route 구조 대량 변경 금지.
- build 실패 상태에서 배포 금지.
- 예상치 못한 URL 감소나 sitemap 감소가 발생하면 작업을 중단하고 보고한다.

## 현재 운영 정보
- 기본 브랜치: `main`
- 빌드: `npm run build`
- 배포 대상: Netlify
- 공개 주소: `https://service.drain119.co.kr`
- 프레임워크: Next.js

## AI 작업 순서
1. 요청 분석
2. 관련 코드/데이터 위치 확인
3. 변경 범위 제시
4. 별도 브랜치에서 수정
5. 대량 SEO 검사 + 필요한 URL Playwright 브라우저 재검증
6. build 및 자동 검수
7. 문제가 있으면 수정 후 재검수
8. 변경 파일과 검수 결과 보고
9. 승인된 경우에만 main 반영 또는 배포
