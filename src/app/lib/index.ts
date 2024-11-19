// lib/db.ts
import { PrismaClient } from '@prisma';

let prisma: PrismaClient;
console.log('prisma', prisma);

// 개발 환경에서의 재연결을 위한 설정
if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 Prisma 클라이언트를 여러 번 초기화해도 오류가 발생하지 않도록 설정
  // hot reloading(핫 리로딩)에서 클라이언트가 중복으로 생성되는 것을 방지
  if (globalThis.prisma) {
    prisma = globalThis.prisma;
  } else {
    prisma = new PrismaClient();
    globalThis.prisma = prisma;  // global scope에 할당하여 중복 생성을 방지
  }
} else {
  // 프로덕션 환경에서는 한 번만 연결하도록 설정
  prisma = new PrismaClient();
}

// Prisma 클라이언트 연결 종료 시 처리
const disconnectPrisma = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting Prisma client:', error);
  }
};

// 연결 오류 처리
prisma.$on('error', (e) => {
  console.error('Prisma Client Error:', e);
  // 필요시 데이터베이스 연결을 끊고 재시도 할 수 있습니다.
  disconnectPrisma();
});

// Prisma 클라이언트 인스턴스를 기본으로 내보냄
export { prisma };
