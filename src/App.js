import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import Detail from './pages/Detail';
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='nav'>
          <Nav />
        </div>
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
                path='/search'
                element={<Search />}
              />
              <Route
                path='/detail'
                element={<Detail />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
