# 워크트리로 Claude 여러 개 돌리기

> 여러 작업을 **충돌 없이 병렬로** 진행하기 위한 git worktree 사용법.
> 핵심: 각 Claude가 별도 브랜치 + 별도 작업 폴더에서 일하므로 파일이 서로 안 부딪힌다.

---

## 언제 쓰나

- 한 작업을 기다리는 동안 **다른 작업도 같이** 굴리고 싶을 때
- 실험적인 리디자인을 **메인을 더럽히지 않고** 따로 시도할 때
- 리뷰 중인 PR을 받아 **로컬에서 확인**하면서 다른 기능을 계속 짤 때

같은 폴더에서 터미널 탭만 두 개 띄우면 **둘 다 같은 파일을 보고 서로 덮어쓴다.** 편집을 병렬로 할 거면 반드시 워크트리를 쓴다.

---

## 기본 명령어

```bash
# 새 워크트리에서 Claude 시작 (브랜치 worktree-<이름> 자동 생성)
claude --worktree bg-alternating

# 이름 자동 생성
claude --worktree

# 리뷰용 PR을 워크트리로 받아오기 → .claude/worktrees/pr-1234/
claude --worktree "#1234"
```

- 워크트리는 `.claude/worktrees/<이름>/` 에 생성된다 (이미 `.gitignore` 처리됨).
- 기본적으로 `origin/HEAD`(원격 기본 브랜치)에서 깔끔하게 분기한다.
  현재 로컬 상태에서 분기하고 싶으면 `settings.json`에 `"worktree": { "baseRef": "head" }`.
- 세션 종료 시: 변경사항 있으면 **유지/삭제**를 물어보고, 변경 없으면 자동 정리.

---

## 규칙 (꼭 지키기)

1. **전환·종료 전에 커밋.** 워크트리 안의 변경은 그 브랜치에만 있다. 커밋 안 하고 워크트리를 지우면 날아간다.
   (지난번 "배경색 교차"가 롤백된 게 정확히 이 케이스 — 커밋 안 한 작업이 사라졌다.)
2. **브랜치 네이밍**: `worktree-<작업명>` 이 자동 생성된다. 작업명은 짧고 명확하게 (`bg-alternating`, `hero-redesign`).
3. **`.env.local` 등 gitignore된 파일이 워크트리에도 필요하면** 루트에 `.worktreeinclude` 파일을 만들어 (`.gitignore` 문법) 거기 적는다. gitignore된 파일만 복사 대상.
4. **작업이 끝나 메인에 머지했으면** 워크트리를 정리한다:
   ```bash
   git worktree remove .claude/worktrees/<이름>
   git branch -d worktree-<이름>
   ```
5. 비대화식(`claude -p ...`) 실행은 자동 정리를 건너뛰므로 수동으로 `git worktree remove` 한다.

---

## 전형적인 흐름

```bash
# 1. 메인에서 작업 A 시작
claude

# 2. 다른 터미널 탭에서 작업 B를 워크트리로 병렬 시작
claude --worktree feature-b

# 3. 작업 B 끝 → 워크트리 안에서 커밋 후 종료
#    (Claude한테 /commit 시키거나 직접 git commit)

# 4. 메인으로 와서 머지
git merge worktree-feature-b

# 5. 워크트리 정리
git worktree remove .claude/worktrees/feature-b
git branch -d worktree-feature-b
```
