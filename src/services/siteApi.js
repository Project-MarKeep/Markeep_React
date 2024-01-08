import axios from 'axios';
import { SITE } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');

const api = axios.create({
  baseURL: SITE,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});

// 사이트 목록 요청
export async function getSites(id) {
  console.log('getSites 함수 호출!');

  try {
    const res = api.get({
      params: {
        folderId: id,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 사이트 삭제 요청
export async function deleteSite(folderId, siteId) {
  console.log('deleteSite 함수 호출!');

  try {
    const res = api.delete('', { folderId: folderId, siteId: siteId });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 사이트 저장 요청
export async function updateSite(updateData) {
  console.log('updateSite 함수 호출!');

  try {
    const res = await api.patch('', updateData);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 사이트 추가
export async function addSite(folderId, title, url, comment) {
  console.log('addSite 함수 호출!');

  try {
    const res = await api.post('', {
      folderId: folderId,
      siteName: title,
      url: url,
      comment: comment,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
