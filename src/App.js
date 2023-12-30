import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import Detail from './pages/Detail';
import './styles/App.scss';
import Folders from './components/Folders';
import Finds from './components/Finds';
import Modify from './pages/Modify';
import { AuthContextProvider } from './utils/AuthContext';
import SearchDetail from './pages/SearchDetail';

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
              >
                <Route path='detail' element={<Detail />} />
              </Route>
              <Route
                path='/mypage'
                element={<MyPage />}
              >
                <Route
                  path='folders'
                  element={<Folders />}
                >
                  <Route
                    path='detail'
                    element={<Detail />}
                  />
                  <Route
                    path='modify'
                    element={<Modify />}
                  />
                </Route>
                <Route
                  path='finds'
                  element={<Finds />}
                />
              </Route>
              <Route
                path='/search/:keyword'
                element={<Search />}
              />
              <Route
                path='/detail/:folderId/:title/:tagNames/:folderImg'
                element={<SearchDetail />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
