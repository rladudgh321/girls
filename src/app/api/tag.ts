// api/tag.ts
import axios from 'axios';
import { backUrl } from '../config'; // http://localhost:3065
import https from 'https';
axios.defaults.baseURL = backUrl;

// SSL 인증서 검증 비활성화 설정
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false  // 인증서 검증을 비활성화
});

const API_URL = '/tag'; // 백엔드 API URL

// 태그 목록 가져오기
export const getTags = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data.tags;
};

// 태그 생성
export const createTag = async ({ name, token }: { name: string, token: string }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(`${API_URL}`, { name }, { headers });
    return response.data; // 생성된 태그 반환
  } catch (err) {
    console.error(err);
  }
};

// 태그 수정
export const updateTag = async ({id, name, token}: {id: number; name: string; token: string}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { name }, { headers });
    return response.data; // 수정된 태그 반환
  } catch (err) {
    console.error(err);
  }
};

// 태그 삭제
export const deleteTag = async ({id, token}: {id: number; token: string}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    await axios.delete(`${API_URL}/${id}`, { headers });
    return id; // 삭제된 태그의 ID 반환
  } catch (err) {
    console.error(err);
  }
};
