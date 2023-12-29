import { useRef, useState } from 'react';

export const useInput = (initial, action) => {
  const [keyword, setKeyword] = useState(initial);
  const inputRef = useRef();

  const getText = (e) => {
    setKeyword(e.target.value);
  };

  const clickCancelHandler = (e) => {
    setKeyword('');
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      action();
      inputRef.current.blur();
    }
  };

  return [inputRef, keyword, getText, clickCancelHandler, keyDownHandler];
};
