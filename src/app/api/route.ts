// api/post/route.ts
import { connectToDatabase } from '../lib';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const postsPerPage = Number(url.searchParams.get('postsPerPage')) || 10;

  const offset = (page - 1) * postsPerPage;

  const connection = await connectToDatabase();

  try {
    // 1. 전체 게시물 수를 구하는 쿼리
    const countQuery = `SELECT COUNT(*) AS totalCount FROM posts`;
    const countResult = await new Promise<any>((resolve, reject) => {
      connection.query(countQuery, (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    const totalCount = countResult[0].totalCount;

    // 2. 현재 페이지에 해당하는 게시물 데이터를 가져오는 쿼리
    const query = `
      SELECT 
        p.id AS id, 
        p.title, 
        p.createdAt AS date, 
        GROUP_CONCAT(DISTINCT t.name) AS tags,
        GROUP_CONCAT(DISTINCT i.src) AS images
      FROM posts p
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN images i ON p.id = i.postId
      GROUP BY p.id
      LIMIT ? OFFSET ?
    `;

    const rows = await new Promise<any>((resolve, reject) => {
      connection.query(query, [postsPerPage, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return Response.json({ totalCount, posts: rows });
  } catch (error) {
    console.error('500 err', error);
    return new Response('Database connection error', { status: 500 });
  } finally {
    connection.end(); // 연결 종료
  }
};
