<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system

`DESIGN.md`는 이 프로젝트의 디자인 시스템 단일 source of truth다. 컬러·타이포그래피·spacing·shape(radius)·elevation(shadow) 관련 모든 작업은 `DESIGN.md`의 토큰 명세를 우선으로 따른다.

- 새 컴포넌트/페이지를 만들거나 기존 스타일을 수정할 때, 먼저 `DESIGN.md` frontmatter의 토큰(`primary`, `secondary`, `surface`, `on-surface`, `display-lg`, `body-md`, `rounded.lg` 등)을 확인하고 그에 매핑된 Tailwind 유틸리티(`bg-primary`, `text-on-surface`, `rounded-lg` 등)를 사용한다.
- 토큰에 없는 임의의 헥스값·폰트 크기·radius를 사용하지 않는다. 새 값이 필요하면 먼저 `DESIGN.md`에 추가하고 `src/app/globals.css`의 `@theme inline` 블록에 토큰을 노출한 뒤 사용한다.
- 컴포넌트 가이드(Buttons / Cards / Chips / Input Fields / Lists)는 `DESIGN.md`의 **Components** 절을 따른다.

# 병렬 작업 (워크트리)

여러 작업을 동시에 진행하거나 실험적 변경을 메인과 분리하고 싶다는 얘기가 나오면, git worktree 사용을 안내한다(`claude --worktree <이름>`). 명령어·규칙·정리 방법은 `docs/WORKTREE.md`에 정리돼 있다. 워크트리 안의 변경은 **커밋해야만** 남으므로, 워크트리를 종료/정리하기 전 커밋 여부를 항상 확인한다.
