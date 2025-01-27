-- 1. posts 테이블 (게시글)
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. tags 테이블 (태그)
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE -- 태그 이름은 유니크하게 설정
);

-- 3. post_tags 테이블 (게시글과 태그의 관계, 다대다 관계)
CREATE TABLE post_tags (
  post_id INT,
  tag_id INT,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 4. images 테이블 (이미지, 일대다 관계)
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  src VARCHAR(255) NOT NULL, -- 이미지 URL
  postId INT,                -- 외래 키
  FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE -- 외래 키 설정
);



데이터베이스 연동 실패시 재연결 로직 짜기



// lib/db.ts
import { PrismaClient } from '@prisma';

let prisma: PrismaClient;
<!-- console.log('prisma', prisma); -->

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

------

import {prisma} from '../lib';
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      // 새로운 Promise 사용으로 쿼리의 비동기 처리
      const result = await prisma.post.findMany({
        include: {
          tags: true,
          images: true,
        }
      })
      return new Response(JSON.stringify(result), { status: 200 }); // JSON 응답 반환
    } catch (err) {
      console.error('Query Error:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}



-----
new URL(req.url)로 params값을 추출했따

------
export NODE_TLS_REJECT_UNAUTHORIZED=0
하니까 ssl 오류 해결

--------
yarn pnpify를 이용해서 해결
yarn dlx @yarnpkg/sdks vscode

------
model Post {
  id        Int       @id @default(autoincrement()) // 게시글 ID
  title     String    // 게시글 제목
  tags      Tag[]     @relation("PostTags")         // 게시글과 태그의 다대다 관계
  images    Image[]   // 게시글과 이미지의 일대다 관계
}

model Tag {
  id        Int       @id @default(autoincrement()) // 태그 ID
  name      String    @unique                      // 태그 이름 (유니크)
  posts     Post[]    @relation("PostTags")         // 태그와 게시글의 다대다 관계
}

model Image {
  id      Int      @id @default(autoincrement()) // 이미지 ID
  src     String   // 이미지 URL
  postId  Int      // 게시글 ID (외래 키)
  post    Post     @relation(fields: [postId], references: [id]) // 게시글과의 관계
}

----------
lrSxorshRNqOlVzj