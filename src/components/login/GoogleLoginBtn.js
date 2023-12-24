import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginBtn = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(clientId);
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginBtn;
