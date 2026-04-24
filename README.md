# MO:RUN

러닝 크루 커뮤니티 플랫폼 (Web + Mobile + API)

## Stack

- **Monorepo**: Turborepo + Bun workspaces
- **Web**: Next.js 15 (App Router) + TypeScript
- **Mobile**: Expo SDK 52 + expo-router + TypeScript
- **API**: NestJS + TypeScript
- **DB/Auth/Storage**: Supabase
- **아키텍처**: NestJS가 모든 비즈니스 로직을 중앙 처리하고, Supabase는 DB/Auth/Storage만 제공

## Structure

```
morun/
├── apps/
│   ├── web/          Next.js
│   ├── mobile/       Expo
│   └── api/          NestJS
├── packages/
│   ├── shared/       공통 타입, DTO, zod 스키마
│   └── tokens/       디자인 토큰 (색/폰트/간격)
├── supabase/         migrations, seed, config
└── docs/             디자인 캡쳐본
```

## Dev

```bash
bun install             # 의존성 설치
bun run dev             # 전체 실행
bun run web             # 웹만
bun run mobile          # 모바일만
bun run api             # API만
```

## Environment

각 앱의 `.env.example`을 `.env.local`로 복사해서 값 채우기.
