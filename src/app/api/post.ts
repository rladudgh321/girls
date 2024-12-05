// api/post.ts
import { backUrl } from '../config'; // http://localhost:3065
import axios from 'axios';
import https from 'https';
axios.defaults.baseURL = backUrl;

// SSL 인증서 검증 비활성화 설정
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false  // 인증서 검증을 비활성화
});

interface DataAPIProps {
  title: string;
  content: string;
  tags: number[];
  images: string[];
}

interface GetPostsProps {
  page: number;
  postsPerPage: number;
  tag?: string;
}
export async function getPostsAPI(data: GetPostsProps) {
  try {
    const response = await axios.get('/post', {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error('getPostsAPI Error fetching data:', error);
    return [];
  }
}


export async function getPostAPI(id: number) {
  try {
    const response = await axios.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error('getPostAPI findOne Error fetching data:', error);
    return null; // 데이터가 없으면 null 반환
  }
}


export async function getPostsAllAPI() {
  try {
    const response = await axios.get('/post/all');
    return response.data;
  } catch (error) {
    console.error('getPostsAllAPI Error fetching data:', error);
    return [];
  }
}



interface CreatePostAPIProps extends DataAPIProps {}
export async function createPostAPI(data: CreatePostAPIProps) {
  try {
    const response = await axios.post('/post', data);
    return response.data;
  } catch (error) {
    console.error('getPostsAllAPI Error fetching data:', error);
    return null;
  }
}

interface UpdatePostAPIProps extends DataAPIProps {
  id: number;
}
export async function updatePostAPI(data: UpdatePostAPIProps) {
  try {
    const response = await axios.patch('/post', data, {
      params: { id: data.id }
    });
    return response.data;
  } catch (error) {
    console.error('getPostsAllAPI Error fetching data:', error);
    return null;
  }
}

export async function deletePostAPI(id: number) {
  try {
    const response = await axios.delete(`/post`, { params: id} );
    return response.data;
  } catch (error) {
    console.error('getPostsAllAPI Error fetching data:', error);
    return null;
  }
}