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
  content1: string;
  content2: string;
  content3: string;
  tags: string[];
  images1: {src:string}[];
  images2: {src:string}[];
  images3: {src:string}[];
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


export async function getPostAPI(id: string) {
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



interface CreatePostAPIProps extends DataAPIProps {
  token: string;
}
export async function createPostAPI(data:CreatePostAPIProps) {
  if(!data.token) return null;
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.post('/post', data, { headers });
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

export async function deletePostAPI({id, token}: { id:string; token: string }) {
  if(!token) return null;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`/post/${id}`, { headers} );
    return response.data;
  } catch (error) {
    console.error('getPostsAllAPI Error fetching data:', error);
    return null;
  }
}

export async function uploadImageAPI(files: File[]) {
  
  try {
    const formData = new FormData();
  
    console.log('beforefiles', files);
  
    // 각 파일을 FormData에 추가
    files.forEach((file, i) => {
      const fieldName = `image${i + 1}`;
      console.log('fieldName', fieldName, 'file', file);
      formData.append(fieldName, file);
    });

    console.log('formData', formData);
    console.log('afterfiles', files);

    const response = await axios.post('/post/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // 파일을 전송할 때의 Content-Type
      },
    });
    return response.data;  // 서버에서 반환된 데이터 처리
  } catch (err) {
    console.error('Error uploading images:', err);
    return null;  // 오류가 발생하면 null 반환
  }
}

