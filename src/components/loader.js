import { API_BASE_URL, FOLDER, FOLLOW, SITE, USER } from "../config/host-config"
export const UserRequestUri = API_BASE_URL + USER;
export const FolderRequestUri = API_BASE_URL + FOLDER;
export const SiteRequestUri = API_BASE_URL + SITE;
export const FollowRequestUri = API_BASE_URL + FOLLOW;
export const token = localStorage.getItem('ACCESS_TOKEN');
export const requestTokenHeader = {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + token
}
export const requestHeader = {
    'content-type': 'application/json'
}

// 프로필 조희 요청
export const getProfile = async () => {
    const res = await fetch(UserRequestUri + '/profile');
    const {nickname, email, profileImage, followerCount, followingCount} = await res.json();

    return (nickname, email, profileImage, followerCount, followingCount);
}

// 카카오 로그인 요청 (미완성)
export const kakaoLogin = async () => {
    const res = await fetch(UserRequestUri + '/kakao-login', {
        headers: requestHeader,
        body: JSON.stringify({
            'code': code,
            'autoLogin': autoLogin
        }) 
    });

}

// 네이버 로그인 요청 (미완성)
export const naverLogin = async () => {
    const res = await fetch(UserRequestUri + '/naver-login', {
        headers: requestHeader,
        body: JSON.stringify({
            'code': code,
            'autoLogin': autoLogin
        })
    });
    console.log(API_BASE_URL + USER + '/naver-login?code=' + code);

    const { token, nickName, email } = await res.json();
    onLogin(token, nickName, email);
    redirection('/');
  };

// 구글 로그인 요청 (미완성)
export const googleSignIn = async () => {
    // const email = new URL(window.)//???
    const res = await fetch(UserRequestUri+'google-login', {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify({
            'email': email,
            'nickname': nickName,
            'autoLogin': autoLogin
        })
    })


}

// 폴더 핀 요청
export const addFolderPin = async () => {
    const res = await fetch(FolderRequestUri+ `/pin?folderId=${folderId}`, {
        method: 'POST',
        headers: requestTokenHeader,
    });

    if(res.status === 200) {
        const folder = await res.json(); // FolderResponseDTO
        return folder;
    }
    if(res.status === 400) {
        const message = await res.text(); // "미가입 회원입니다."
        return message;
    }
}

// 팔로우/언팔로우 요청
export const follow = async () => {
    const res = await fetch(FollowRequestUri + `?toId=${toId}`, {
        method: 'POST',
        headers: requestTokenHeader,
    });

    if(res.status === 200){
        redirection('/');
    }
}

// 폴더 추가 요청
export const addFolder = async () => {

    const folderJsonBlob =  new Blob([JSON.stringify(folderValue)], {
        type: 'application/json'
    })

    const folderFormData = new FormData();
    folderFormData.append('dto', folderJsonBlob); // 이름을 바꿔줘야 되는지 오류 보고 확인
    folderFormData.append('folderImage', $fileTag.current.files[0]);

    const res = await fetch(FolderRequestUri + '/my', {
        method: 'POST',
        body: folderFormData,
    });

    const message = await res.text();  //"정상적으로 등록 되었습니다."
    return message;
}

// 폴더 수정 요청
export const updateFolder = async () => {
    const res = await fetch(FolderRequestUri + '/my', {
        method: 'PUT',
        headers: requestTokenHeader,
        body: JSON.stringify({
            'folderId': folderId,
            'title': title,
            'hideFlag': hideFlag,
            'tags': tags // tagNames?
        })
    })

    if(res.status === 200){
        const updatedList = await res.json();
        return updatedList;
    } else {
        const message = await res.text(); 
        return message; 
    }
}

// 폴더 삭제 요청
export const deleteFolder = async () => {
    const res = await fetch(FolderRequestUri + `/my/${folderId}`, {
        method: 'DELETE',
        headers: requestTokenHeader,
    });

    const message = await res.text();
    return message;
    
}

// 사이트 수정 요청
export const updateRegistSiteInfo = async () => {
    const res = await fetch(SiteRequestUri, {
        method: 'PATCH',
        headers: requestTokenHeader,
        body: JSON.stringify({
            'siteName': siteName,
            'comment': comment,
            'siteId': siteId,
            'folderId': folderId
        })
    });

    if(res.status === 200) redirection('detail');
}

// 사이트 삭제 요청
export const deleteSite = async () => {
    const res = await fetch(SiteRequestUri, {
        method: 'DELETE',
        headers: requestTokenHeader,
        body: JSON.stringify({
            'siteId': siteId,
            'folderId': folderId
        })
    });
    const message = await res.text();
    return message;
}
