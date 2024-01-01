import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginBtn = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(clientId);

  const handleGoogleLogin = (res) => {
    const info = jwtDecode(res.credential);
    const email = info.email;
    const nickName = info.name;

    const googleLogin = async () => {};
  };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => handleGoogleLogin(res)}
          onFailure={(err) => {
            console.log(err);
          }}
          shape='circle'
          type='icon'
          style={{ width: '50px' }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginBtn;
