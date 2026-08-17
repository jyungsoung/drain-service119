# 응급배관119 전국 지역 페이지

서울·인천·경기·강원·충청권 시군구 및 읍면동별 배관 서비스 안내 사이트입니다.

## Netlify

- Build command: `npm run build`
- Publish directory: `.next`
- Target URL: `https://drain-service119.netlify.app`
- 전국 대표 페이지: `/`
- 하남 대표 페이지: `/hanam`
- 메인 디자인: 현장 사진 중심 에디토리얼 구성
- 배관막힘 서비스: `/services`
- 누수탐지 전용 페이지: `/leak-detection`

시공현장은 `app/work-sites/cases-data.ts`에 한 항목씩 추가합니다.
