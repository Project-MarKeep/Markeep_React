import axios from 'axios';
import { USER } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');
const api = axios.create({
  baseURL: USER,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});

// 프로필 조회
export async function getProfile() {
  console.log('getProfile 요청 들어옴!');

  try {
    const res = await api.get('/profile');
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 프로필 사진 수정 요청
export async function updateProfile(file) {
  console.log('updateProfile 요청 들어옴!');

  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const res = await axios.post(USER + '/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 닉네임 수정 요청
export async function updateNickname(newNickname) {
  console.log('updateNickname 요청 들어옴');

  try {
    const res = await api.put('/nickname', {
      params: {
        nickname: newNickname,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
