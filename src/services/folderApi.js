import axios from 'axios';
import { FOLDER } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');

const api = axios.create({
  baseURL: FOLDER,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});

// 폴더 목록 요청
export async function getFolders(pageNo, size, keyword) {
  console.log('getFolders 함수 호출');

  try {
    const res = await api.get('/all', {
      params: {
        page: pageNo,
        size: size,
        keyword: keyword,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 내 폴더 목록 요청
export async function getMyFolders() {
  console.log('getMyFolders 함수 호출!');

  try {
    const res = await api.get('/my');
    return res.data.map((f) => f.folder);
  } catch (e) {
    console.error(e);
  }
}

// 내 폴더 검색 요청
export async function searchMyFolders(keyword) {
  console.log('searchMyFolders 요청 들어옴!');

  try {
    const res = await api.get('/my/search', {
      params: {
        page: 1,
        size: 1,
        keyword: keyword,
      },
    });
    return res.data.list;
  } catch (e) {
    console.error(e);
  }
}

// 폴더 등록 요청
export async function addFolder(formData) {
  console.log('addFolder 요청 들어옴!');

  try {
    const res = await axios.post(FOLDER + '/my', formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 폴더 삭제
export async function deleteFolder(folderIds) {
  console.log('deleteFolder 요청 들어옴');

  try {
    const res = api.delete('/my/ids', { data: { ids: folderIds } });
    // return res.data;
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 폴더 수정 요청
export const updateFolder = async (formData) => {
  console.log('updateFolder 요청 들어옴!');

  try {
    const res = await axios.put(FOLDER + '/my', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// 폴더 핀 요청
export const addFolderPin = async (folderId) => {
  console.log('addFolderPin 요청 들어옴!');

  try {
    const res = api.post('/pin', {
      params: {
        folderId: folderId,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

/*
요청 모음




9. nav>SearchFolder.js
목적: 왼쪽 바에서 첫번째 검색 기능임 / 검색하면 검색 단어가 포함된 폴더의 리스트 or 폴더를 찾아서 반환해주는 요청
const fetchMyFolderList = async () => {
    const res = await fetch(
      requestUri +
        '?page=' +
        `${pageNo}` +
        '&size=' +
        `${size}` +
        `&keyword=` +
        `${searchInput}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    const { list } = await res.json();
    console.log('data: ', list);
    // list.map(())
    setList(list);
  };
10. nav>UserInfo.js
목적: 유저 팔로 정보 COUNT해서 가져오기
const followCount = async () => {
    cosnt getRes = await fetch()
  }; 
아직 미작성 하는중임

12. pages>Detail.js
목적: 폴더 번호 넘기면 그 폴더의 사이트 리스트를 반환한 것을 표현하는 페이지여서 사이트 리스트 요청
const fetchMySiteList = async () => {
    const res = await fetch(requestUri + '?folderId=' + id, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log(res);

    const list = await res.json();
    console.log('lists: ', list);
    // list.map(())
    setSites(list);
  };



15. utils>AuthContext.js
목적: 토큰 값이 유효한지 서버에 찔러보는 함수
const testFunction = async () => {
      // console.log(
      //   'AuthContext useEffect token: ',
      //   localStorage.getItem('ACCESS_TOKEN')
      // );
      const requestHeader = {
        'content-type': 'application/json',
        // JWT에 대한 인증 토큰이라는 타입을 선언
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      };
      const res = await fetch(API_BASE_URL + USER + '/status', {
        method: 'GET',
        headers: requestHeader,
      });
      console.log('status: ', res.status);
      if (res.status === 400) {
        console.log('토큰값 유효하지 않음!');
        alert('다시 로그인 해주세요!');
        localStorage.clear();
        setLoading(false);
        setIsLoggedIn(false);
      }
    };
============================================================
목적: 이게 AuthContext에 써놓고 getFolders()로 다른 컴포넌트에서 쓰려고 한 폴더리스트 요청임
const UsersGetFolderList = async () => {
    console.log('AuthContext 요청 들어옴!');
    const requestUriFolder = API_BASE_URL + FOLDER;
    const res = await fetch(requestUriFolder + '/my', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await res.json();
    return { data };
  };


*/
