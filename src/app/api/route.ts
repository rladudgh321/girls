// import { connectToDatabase } from '../../app/lib/db';
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res:NextApiResponse) {
//   if (req.method === 'GET') {
//     const client = await connectToDatabase();

//     try {
//       const result = await client.query('SELECT * FROM posts'); // `posts`는 데이터베이스 테이블 이름입니다.
//       const posts = result.rows; // 데이터베이스에서 가져온 게시글 목록
//       console.log('Fetched posts:', posts);
//       res.status(200).json(posts); // JSON 응답으로 반환
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     } finally {
//       await client.end(); // 연결 종료
//     }
//   } else {
//     // 다른 HTTP 메소드 처리 (POST, PUT 등)
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// export async function GET() {
//     return NextResponse.json({message: 'hello world'}, {
//         status: 200,
//     });
// }

// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!', {
//     status: 200,
//   })
// }

// import { connectToDatabase } from '../../app/lib/db';
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res:NextApiResponse) {
//   if (req.method === 'GET') {
//     const client = await connectToDatabase();

//     try {
//       const result = await client.query('SELECT * FROM posts'); // `posts`는 데이터베이스 테이블 이름입니다.
//       const posts = result.rows; // 데이터베이스에서 가져온 게시글 목록
//       console.log('Fetched posts:', posts);
//       res.status(200).json(posts); // JSON 응답으로 반환
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     } finally {
//       await client.end(); // 연결 종료
//     }
//   } else {
//     // 다른 HTTP 메소드 처리 (POST, PUT 등)
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

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
