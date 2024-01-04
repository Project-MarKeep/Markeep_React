import { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Nav from './layouts/nav/Nav';
import Header from './layouts/Header';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Modal from './pages/view/Modal';
import Folder from './pages/view/Folder';
import MyFolder from './pages/view/MyFolder';
import EditFolder from './pages/view/EditFolder';
import Search from './pages/Search';
import './styles/App.scss';
import AddFolder from './pages/view/AddFolder';
import KakaoLogin from './components/sns-login/KakaoLogin';
import NaverLogin from './components/sns-login/NaverLogin';

function App() {
  let location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  let previousLocation = location.state?.previousLocation;
  console.log('previousLocation: ', previousLocation);

  return (
    <div className='app'>
      {isLoggedIn && (
        <div className='nav'>
          <Nav />
        </div>
      )}
      <div className='main-wrapper'>
        <div className='header'>
          <Header />
        </div>
        <div className='content-wrapper'>
          <Routes location={previousLocation || location}>
            <Route
              path='/'
              element={<Community />}
            />
            <Route
              path='/mypage'
              element={<MyPage />}
            />
            <Route
              path='/:keyword'
              element={<Search />}
            />
            <Route
              path='/oauth/redirected/kakao'
              element={<KakaoLogin />}
            />
            <Route
              path='/oauth/naver'
              element={<NaverLogin />}
            />
          </Routes>

          {previousLocation && (
            <Routes>
              <Route
                path='/view'
                element={<Modal />}
              >
                <Route
                  path='public/folders/:id'
                  element={<Folder />}
                />
                <Route
                  path='public/folders/add'
                  element={<AddFolder />}
                />
                <Route
                  path='folders/:id'
                  element={<MyFolder />}
                />
                <Route
                  path='folders/:id/edit'
                  element={<EditFolder />}
                />
              </Route>
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
