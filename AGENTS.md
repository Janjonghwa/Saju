# AGENTS.md - Single Source of Truth

이 문서는 저장소의 단일 운영 문서다. 개발/검증/배포/정책 기준은 본 문서를 우선한다.

## 1) Repository Reality Check
- 현재는 Next.js App Router + TypeScript + Tailwind + ESLint + pnpm 기반으로 부트스트랩 완료.
- 핵심 디렉토리: `src/app`, `src/server`, `src/lib`, `src/types`, `prisma`, `tests`.
- 인증/저장 Phase 1 골격(NextAuth + Prisma + 기본 사주 API + 골든 데이터셋 템플릿)까지 포함.

## 2) Commands

### 2.1 필수 개발 명령
```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:watch
```

### 2.2 Prisma 명령
```bash
pnpm prisma:generate
pnpm prisma:migrate:dev
pnpm prisma:studio
```

### 2.3 단일 테스트 실행
```bash
# Vitest 단일 파일
pnpm vitest run tests/golden/golden-cases.test.ts

# Vitest 테스트명 필터
pnpm vitest run -t "has exactly 25 initial cases"

# (선택) Jest/Playwright 도입 시
npx jest path/to/file.test.ts
npx playwright test tests/e2e/basic-flow.spec.ts --project=chromium
```

## 3) Architecture Constraints
- 단일 Next.js 프로젝트 유지.
- 비즈니스 로직은 `src/server`에만 둔다.
- UI 컴포넌트에 사주 계산 로직을 넣지 않는다.
- API Route는 얇게 유지: 입력 검증(Zod) + 서비스 호출 + 표준 에러 응답.

### 3.1 레이어 규칙
1. `src/server/engines`: 순수 계산
2. `src/server/analyzers`: 규칙 기반 분석/태그
3. `src/server/interpreters`: 태그 기반 문구 조합
4. `src/server/services`: 유스케이스 오케스트레이션
5. `src/server/repositories`: DB 접근

## 4) Directory Guide
```bash
src/
  app/
    api/
      auth/[...nextauth]/route.ts
      saju/route.ts
      report/route.ts
    start/page.tsx
  server/
    engines/saju-core.ts
    analyzers/basic-analyzer.ts
    interpreters/compose-report.ts
    services/generate-basic-report.ts
    repositories/
  lib/
    prisma.ts
    zod.ts
    api.ts
  types/
    saju.ts
    report.ts
    next-auth.d.ts
prisma/
  schema.prisma
tests/
  golden/golden-cases.json
  golden/golden-cases.test.ts
```

## 5) Code Style & Naming
- TypeScript strict 유지 (`tsconfig.json` 기준).
- 파일/디렉토리: `kebab-case`.
- 타입/인터페이스: `PascalCase`.
- 함수/변수: `camelCase`.
- import 순서:
  1) framework/react/next
  2) external libs
  3) `@/` alias
  4) relative import

## 6) API Error Envelope (표준)
```ts
{
  success: false,
  errorCode: "INVALID_INPUT" | "UNAUTHORIZED" | ...,
  message: string,
  requestId: string,
  retryable?: boolean,
  details?: Record<string, unknown>
}
```

기본 코드 세트:
- `INVALID_INPUT`
- `INVALID_CALENDAR_TYPE`
- `INVALID_BIRTH_DATE`
- `INVALID_BIRTH_TIME`
- `UNSUPPORTED_TIMEZONE`
- `CHART_CALCULATION_FAILED`
- `REPORT_GENERATION_FAILED`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

## 7) Accuracy & Golden Dataset
- 파일: `tests/golden/golden-cases.json`
- 초기 25개 카테고리 템플릿 운영:
  - normal 10
  - jasi-boundary 5
  - jeolip-boundary 5
  - leap/month/day/year-boundary 5
- 현재 baseline: 25개 전부 `active` + expected pillar 채움 완료 (`@fullstackfamily/manseryeok` 1.0.7 기준).
- 향후 신규/변경 케이스는 `needs-review`로 시작하고, 7.1 정책의 교차검증 후 `active` 승격.

### 7.1 Reference Source Policy
- Primary reference 1개 + 보조 검증 1~2개를 고정.
- 케이스마다 `reference`, `referenceVersion`, `confidence` 기록.
- 기준 충돌 시 `needs-review`로 격리 후 확정 전 배포 기준 미변경.

## 8) Privacy & Retention (Engineering Baseline)
> 본 섹션은 엔지니어링 가이드이며 법률 자문이 아니다.

- Birth input은 민감정보로 취급.
- 로그에는 생년월일/출생시간 원문 저장 금지.
- 삭제 요청 시 즉시 Hard Delete 원칙(운영 필요 시 감사로그만 최소 보존).

## 9) Monetization Boundary
- 무료: 기본 사주 요약, 오늘운세 요약
- 유료: 1년/배우자/취업 상세 해설 및 심화 조언
- `ReportSection.accessLevel`로 free/premium 경계 유지.

## 10) Observability Baseline
- 최소: 구조화 로그 + requestId + 에러율/지연시간 추적
- 권장: Sentry 연동
- rate limit 기본안:
  - 비회원: IP 기준 일일 제한
  - 회원: 계정 기준 일일 제한

## 11) Admin Audit Trail
- 해설 문구 생성/수정/비활성화 이력 기록
- 누가/언제/무엇을(before/after) 변경했는지 저장

## 12) Auth/DB 운영 메모
- `src/auth.ts`에서 Auth.js v5(beta) + Prisma adapter 사용.
- 환경 변수:
  - `DATABASE_URL`
  - `AUTH_URL`
  - `AUTH_SECRET`
  - `AUTH_GOOGLE_ID`
  - `AUTH_GOOGLE_SECRET`
  - `AUTH_KAKAO_ID`
  - `AUTH_KAKAO_SECRET`
  - `AUTH_NAVER_ID`
  - `AUTH_NAVER_SECRET`
- Google OAuth Redirect URI (local): `http://localhost:3000/api/auth/callback/google`
- Kakao OAuth Redirect URI (local): `http://localhost:3000/api/auth/callback/kakao`
- Naver OAuth Redirect URI (local): `http://localhost:3000/api/auth/callback/naver`

### 12.1 Google OAuth E2E 완료 기준 (local)
아래를 모두 만족해야 “실 Google OAuth E2E 완료”로 본다.
1. Google Console에 Redirect URI가 `http://localhost:3000/api/auth/callback/google`로 정확히 등록.
2. `.env`에 `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, `AUTH_URL` 유효값 설정.
3. DB 마이그레이션 적용 후 `User/Account/Session` 테이블 준비 완료.
4. `/start`에서 Google 로그인 성공 후 앱으로 복귀하고 세션 생성 확인.
5. `/api/auth/session`에서 로그인 사용자 정보(확장된 `user.id` 포함) 확인.
6. 로그아웃 시 세션 해제 및 비로그인 UI 복귀 확인.

### 12.2 Kakao OAuth E2E 완료 기준 (local)
아래를 모두 만족해야 “실 Kakao OAuth E2E 완료”로 본다.
1. Kakao Developers에 Redirect URI가 `http://localhost:3000/api/auth/callback/kakao`로 정확히 등록.
2. `.env`에 `AUTH_KAKAO_ID`, `AUTH_KAKAO_SECRET`, `AUTH_SECRET`, `AUTH_URL` 유효값 설정.
3. DB 마이그레이션 적용 후 `User/Account/Session` 테이블 준비 완료.
4. `/start`에서 Kakao 로그인 성공 후 앱으로 복귀하고 세션 생성 확인.
5. `/api/auth/session`에서 로그인 사용자 정보(확장된 `user.id` 포함) 확인.
6. 로그아웃 시 세션 해제 및 비로그인 UI 복귀 확인.

### 12.3 Naver OAuth E2E 완료 기준 (local)
아래를 모두 만족해야 “실 Naver OAuth E2E 완료”로 본다.
1. Naver Developers에 Redirect URI가 `http://localhost:3000/api/auth/callback/naver`로 정확히 등록.
2. `.env`에 `AUTH_NAVER_ID`, `AUTH_NAVER_SECRET`, `AUTH_SECRET`, `AUTH_URL` 유효값 설정.
3. DB 마이그레이션 적용 후 `User/Account/Session` 테이블 준비 완료.
4. `/start`에서 Naver 로그인 성공 후 앱으로 복귀하고 세션 생성 확인.
5. `/api/auth/session`에서 로그인 사용자 정보(확장된 `user.id` 포함) 확인.
6. 로그아웃 시 세션 해제 및 비로그인 UI 복귀 확인.

## 13) Cursor/Copilot Rules Discovery
- `.cursor/rules/`: Not Found
- `.cursorrules`: Not Found
- `.github/copilot-instructions.md`: Not Found

추후 해당 파일이 생기면 해당 규칙이 본 문서보다 우선한다.

## 14) Verification Checklist
변경마다 아래를 통과해야 한다.
1. `pnpm typecheck`
2. `pnpm test`
3. `pnpm build`
4. (가능 시) 관련 API 수동 호출 검증
