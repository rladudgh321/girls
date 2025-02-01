// api/user.ts
import { backUrl } from '../config'; // http://localhost:3065
import axios from 'axios';
axios.defaults.baseURL = backUrl;

export async function logInAPI(data: { email: string; password: string }) {
  try {
    const response = await axios.post('/auth/signin', data, { withCredentials: true });
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
