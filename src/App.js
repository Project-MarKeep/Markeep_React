import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import Detail from './pages/Detail';
import './styles/App.scss';
import { AuthContextProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div className='app'>
        <div className='nav'>
          <Nav />
        </div>
        <div className='nav-modal'></div>
        <div className='main-wrapper'>
          <div className='header'>
            <Header />
          </div>
          <div className='content-wrapper'>
            <Routes>
              <Route
                exact
                path='/'
                element={<Community />}
              />
              <Route
                path='/mypage'
                element={<MyPage />}
              />
              <Route
                path='/search/:keyWord'
                element={<Search />}
              />
              <Route
                path='/detail/:folderId'
                element={<Detail />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
