import { backUrl } from '../config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;

export async function getPostsAPI() {
  try {
    console.log('getPostsAPI');
    const response = await axios.get('/api');
    return response.data;
  } catch(error) {
    console.error('Error fetching data:', error);
    return null;
  }
}