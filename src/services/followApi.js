import axios from 'axios';
import { FOLLOW } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');

const api = axios.create({
  baseURL: FOLLOW,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});

export async function follow(toId) {
  console.log('follow 요청 들어옴!');
  try {
    const res = await api.post({
      params: { toId: toId },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
