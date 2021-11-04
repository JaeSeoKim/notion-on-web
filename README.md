<div align="center">
  <h1>jaeseokim.dev</h1>
</div>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
 ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Notion Api](https://img.shields.io/badge/Notion%20Api-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 🚩 개발 목표

기존 Gastsby.js로 제작한 블로그의 초기 구조의 문제로 인해 유지보수가 점점 힘들어져서 새롭게 Notion를 Cms로 사용하는 블로그 개발

- [jaeseokim.github.io](https://github.com/JaeSeoKim/jaeseokim.github.io)
- [jaeseokim.github.io#102](https://github.com/JaeSeoKim/jaeseokim.github.io/issues/102)

기존 [nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) 와 같은 비공식 Notion API를 사용한 프로젝트가 있으나 나만의 블로그를 새롭게 만들고 싶어서 공식 Notion API를 이용하여 개발하기로 결정함.

## 🚴‍♀️ 로드뷰

- [X] @notionhq/client 사용 방법 분석하기
- [x] page에 대한 모든 정보를 가져오는 함수 개발 하기 + 해당 Type 정의 하기
  - [x] page api end-point [`/api/page/[page_id]`](https://jaeseokim-dev.vercel.app/api/page/13cb8d2d3328425e815a1896267f5906) -> **임시 테스트용 API 추후 deprecated**
- [ ] 기본적인 Block Component 작성하기
  - [x] paragraph
  - [x] heading
    - [x] heading_1
    - [x] heading_2
    - [x] heading_3
    - [x] id 및 anchor 추가
  - [x] audio
  - [x] bookmark
    - [x] ~~OpenGraph-CORS API 만들기 `/api/bookmark/[encodeURI]`~~ Server Side에서 fetch하여 렌더링 하도록 수정
  - [x] file
  - [x] pdf
    - [x] ~~react-pdf 사용시 Nextjs에서 Component를 어떻게 전달할지 정의 필요~~ react-pdf 사용 안함. file 다운으로 치환
  - [x] video
    - [x] youtube embed - react-youtube
    - [x] viemo embed - react-viemo
    - [ ] Error시 화면 구상 필요
  - [x] embed
  - [x] image
  - [x] column
  - [x] column_list
  - [x] bulleted_list
    - closure + context api를 이용하여 해결
  - [x] numbered_list
  - [ ] callout
  - [ ] child_database
  - [ ] child_page
  - [ ] code
  - [ ] equation
  - [ ] to_do
  - [ ] toggle
  - [ ] table_of_contents
  - [ ] divider
  - [ ] breadcrumb
- [x] Notion-S3 File 접근 제한 시간 이슈 해결
  - [Next.js의 증분빌드](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)를 사용하게 될 경우 1시간 동안 접근 가능한 URL를 반환 즉 revaildate 시간이 1시간 보다 긴 경우 제대로 작동 하지 않는 이슈와 이전 캐시를 이용하여 응답한 경우 파일에 대해서 접근 불가능한 이슈가 있음.
  - 추가 API 제작 및 `swr` 를 이용하여 Client 단에서 src를 fetch 하여 사용하도록 수정
  - [`/api/file/[block_id]`](https://jaeseokim-dev.vercel.app/api/file/ac17cd1f-0332-47fc-ab96-636965b5d41d)
    - file의 src를 전달하는 것이 아닌 해당 body의 stream 전달하는 proxy로 변경!
