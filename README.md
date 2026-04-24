# MO:RUN

러닝 크루 커뮤니티 플랫폼 — **Web + Mobile + API** 를 하나의 모노레포에서 운영합니다.

## Stack

| 영역 | 기술 |
| --- | --- |
| Monorepo | Turborepo 2 + Bun workspaces |
| Web | Next.js 15 (App Router) · TypeScript · Tailwind |
| Mobile | Expo SDK 52 · Expo Router · React Native · TypeScript |
| API | NestJS · TypeScript · Zod validation |
| DB / Auth / Storage | Supabase (Postgres + RLS) |
| Deploy | **Vercel** (web + api) · **Expo/EAS** (mobile) |

아키텍처: NestJS가 모든 비즈니스 로직을 중앙 처리하고, Supabase는 DB/Auth/Storage만 제공합니다. 클라이언트(웹·모바일)는 가능하면 API를 통해 접근하고, 단순 읽기는 RLS가 걸린 테이블을 직접 조회할 수 있습니다.

## Structure

```
morun/
├── apps/
│   ├── web/                     Next.js (Vercel)
│   │   └── src/components/      atoms · molecules · organisms · templates
│   ├── mobile/                  Expo (EAS)
│   │   └── src/components/      atoms · molecules · organisms · templates
│   └── api/                     NestJS (Vercel serverless)
├── packages/
│   ├── shared/                  Zod 스키마 + 공유 타입 (api/web/mobile 공통)
│   └── tokens/                  디자인 토큰 (색 · 간격 · 타이포)
├── supabase/                    migrations · RLS · seed · config.toml
├── docs/                        디자인 캡쳐본
└── .claude/skills/              Claude Code 스킬 (아래 참고)
```

## Component philosophy — Atomic design

UI는 **작게 쪼개서 많이 만들고 최대한 재사용**하는 방향으로 갑니다. Web과 Mobile 양쪽 모두 동일한 구조를 씁니다:

- `atoms/` — 원자 단위 (Button, Input, Text, Icon)
- `molecules/` — 원자 2~5개 조합 (FormField, SearchBar, Card)
- `organisms/` — 의미 단위 섹션 (Header, PostList, CrewCard)
- `templates/` — 페이지 레이아웃 셸

규칙:
- 새 컴포넌트는 `atoms/` 파일 한 개로 시작 → 필요하면 폴더로 승격.
- 같은 레벨의 `index.ts` 배럴에 꼭 re-export.
- 색·간격·타이포는 `@morun/tokens` 에서만. 하드코딩 금지.
- 스키마/타입은 `@morun/shared` 에서만. 중복 정의 금지.
- import 방향은 **아래쪽으로만**: atoms → nothing, molecules → atoms, organisms → atoms + molecules, templates → 전부.

Web과 Mobile은 primitive(`<button>` vs `Pressable`)가 다르니 **구현은 분리**하고, 토큰과 스키마만 공유합니다.

## Dev

```bash
bun install             # 의존성 설치
bun run dev             # 전체 실행 (turbo)
bun run web             # 웹만
bun run mobile          # 모바일만
bun run api             # API만
bun run typecheck       # 전체 타입체크
bun run lint            # 전체 린트
bun run build           # 전체 빌드
```

### Environment

각 앱의 `.env.example` 을 `.env.local` 로 복사해서 값을 채우세요.

- `apps/web/.env.example` — Supabase URL / anon key, API base URL
- `apps/api/.env.example` — Supabase URL / service role key, JWT secret
- `apps/mobile/.env.example` — Supabase URL / anon key, API base URL

실제 `.env*` 파일은 gitignore 처리되어 있습니다.

## Supabase

```bash
# 첫 세팅
supabase start                                 # 로컬 Postgres + Studio
supabase db reset                              # 마이그레이션 재적용 + seed

# 새 마이그레이션 (Claude 스킬 rls-migration 참고)
# supabase/migrations/NNNN_<name>.sql 에 스키마 + RLS 를 함께 작성
```

Row Level Security는 **테이블 생성과 같은 마이그레이션**(또는 바로 다음 번호)에서 같이 켭니다. RLS 없이 남아있는 public 테이블 금지.

## Deployment

### Web (Vercel)

- Root: `apps/web`
- Framework preset: Next.js
- Env vars: `apps/web/.env.example` 참고

### API (Vercel serverless)

- Root: `apps/api`
- NestJS를 Vercel function으로 래핑해서 배포.
- 서버리스 제약: long-lived 상태 금지, SIGTERM 훅 금지, cold-start 최소화 (top-level 무거운 import 지양).
- 새 env var 추가 시 `apps/api/.env.example` 반드시 동기화 → Vercel 대시보드 반영.

### Mobile (Expo / EAS)

- `apps/mobile` 에서 `expo start` 로 로컬 개발.
- 배포는 `eas build` → TestFlight / Play Console.

## Claude Code skills

`.claude/skills/` 아래에 이 레포 전용 스킬이 있어, Claude가 작업을 일관된 방식으로 스캐폴딩합니다.

| Skill | 언제 트리거 |
| --- | --- |
| `atomic-component` | UI 컴포넌트 (Button, Form, Header...) 만들기/정리 |
| `shared-schema` | `packages/shared` 에 Zod 스키마 추가 |
| `api-module` | `apps/api` 에 NestJS feature 모듈 추가 |
| `rls-migration` | `supabase/migrations/` 에 스키마 + RLS 마이그레이션 추가 |

Claude가 관련 작업을 받으면 자동으로 해당 스킬을 사용하며, `/<skill-name>` 으로 직접 호출도 가능합니다.

## Git workflow

혼자 개발하는 저장소라 `main` 직푸시입니다. 커밋은 [Conventional Commits](https://www.conventionalcommits.org/) 포맷으로 논리 단위로 쪼개서 올립니다.

```
feat(api): add events module with Zod validation
fix(web): prevent double submission on crew create form
chore(supabase): add 0003_events migration with RLS
docs: update README with deployment notes
```

## License

Private.
