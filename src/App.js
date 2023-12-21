import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NaverLogin from './components/login/NaverLogin';
import { AuthContextProvider } from './utils/AuthContext';
import ModalEmail from './components/ModalEmail';

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Header />
        <Routes>
          <Route
            path='/oauth/naver'
            element={<NaverLogin />}
          />
          <Route
            path='/email'
            element={<ModalEmail />}
          />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
