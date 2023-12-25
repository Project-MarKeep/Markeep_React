import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import Detail from './pages/Detail';
import './styles/App.scss';
import { NavLayout } from './components/NavLayout';
import FolderList from './components/FolderList';
import Add from './components/Add';
import UserInfo from './components/UserInfo';

function App() {
  return (
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
              path='/search/:keyword'
              element={<Search />}
            />
            <Route
              path='/detail'
              element={<Detail />}
            />
            <Route element={<NavLayout />}>
              <Route
                path='/find'
                element={<FolderList />}
              />
              <Route
                path='/add'
                element={<Add />}
              />
              <Route
                path='/folders'
                element={<FolderList />}
              />
              <Route
                path='/user'
                element={<UserInfo />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
