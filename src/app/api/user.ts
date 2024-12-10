// api/user.ts
import { backUrl } from '../config'; // http://localhost:3065
import axios from 'axios';
import https from 'https';
axios.defaults.baseURL = backUrl;

// SSL 인증서 검증 비활성화 설정
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false  // 인증서 검증을 비활성화
});

export async function logInAPI(data: { email: string; password: string }) {
  try {
    const response = await axios.post('/auth/signin', data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function logOutAPI() {
  const response = await axios.post('/auth/logout');
  return response.data;
}

export async function getUserIdAPI(token: string) {
  if(!token) return null;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get('/user/findOne', { headers });
    return response.data;
  } catch (err) {
    console.error('getUserIdAPI', err);
  }
}
