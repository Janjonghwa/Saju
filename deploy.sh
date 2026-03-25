#!/bin/bash
# 사주 서비스 프로덕션 배포 스크립트
# 사용법: ./deploy.sh

set -e

echo "=== 사주 서비스 배포 시작 ==="

# 1. Prisma 클라이언트 생성
echo "1/4 Prisma 클라이언트 생성 중..."
npx prisma generate

# 2. 린트 + 타입체크 + 테스트
echo "2/4 검증 중..."
npm run lint
npm run typecheck
npm run test

# 3. Vercel 배포
echo "3/4 Vercel 배포 중..."
vercel --prod

# 4. 배포 완료 안내
echo "=== 배포 완료 ==="
echo ""
echo "다음 단계:"
echo "1. Vercel 대시보드에서 환경변수 설정:"
echo "   - DATABASE_URL (Supabase 연결 문자열)"
echo "   - AUTH_URL (프로덕션 도메인)"
echo "   - AUTH_SECRET (아래 값 사용):"
echo ""
echo "   AUTH_SECRET=qYl64B7iYk-4pSOAH7wDM-j6T4sDr7-ozND6M0pSvdk"
echo ""
echo "2. Google Console에서 프로덕션 Redirect URI 등록:"
echo "   https://[your-domain].vercel.app/api/auth/callback/google"
echo ""
echo "3. Prisma 마이그레이션 실행:"
echo "   npx prisma migrate deploy"
