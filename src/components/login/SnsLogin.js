import React, { createContext, useState } from "react";
import { NAVER_AUTH_URL } from "../../config/naver-config";

const SnsLogin = () => {
  return (
    <div className="sns-box">
      <button>카카오</button>
      <a href={NAVER_AUTH_URL}>네이버</a>
      <button>구글</button>
    </div>
  );
};

export default SnsLogin;
