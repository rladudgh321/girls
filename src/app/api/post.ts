// api/post.ts
import { backUrl } from '../config'; // http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;

export async function getPostsAPI(page: number, postsPerPage: number, tag: string) {
  try {
    console.log('getPostsAPI');
    console.log('node_env', process.env.NODE_ENV);
    console.log('backUrl:', backUrl); // 실제 baseURL로 설정되는 값 확인

    const response = await axios.get('/api', {
      params: {
        page,
        postsPerPage,
        tag, // tag 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
