import React, { useRef, useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/Add.module.scss';
import Input from '../Input';
import { ReactComponent as AddIcon } from '../../assets/icons/plus.svg';
import { customStyles } from '../../styles/customStyles';

const Add = () => {
  const colors = {
    blue: '#bbb4fe',
    purple: '#ed84f8',
    salmon: '#fcc5b8',
    white: '#fafafa',
    black: '#141414',
    yellow: '#ebfc87',
  };

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const inputRef = useRef();

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getUrl = (e) => {
    setUrl(e.target.value);
  };

  const clickAddHandler = () => {};

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      clickAddHandler();
      inputRef.current.blur();
    }
  };

  const options = [
    { value: '폴더아이디1', label: '폴더 제목1' },
    { value: '폴더아이디2', label: '폴더 제목2' },
    { value: '폴더아이디3', label: '폴더 제목3' },
    { value: '폴더아이디4', label: '폴더 제목4' },
    { value: '폴더아이디5', label: '폴더 제목5' },
    { value: '폴더아이디6', label: '폴더 제목6' },
  ];

  return (
    <div className={styles.wrapper}>
      <Select
        isClearable={true}
        isSearchable={true}
        placeholder={'폴더 선택'}
        options={options}
        maxMenuHeight={'10rem'}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,

            neutral20: 'rgba(187, 180, 254, 0.4)',
            primary: colors.purple,
            neutral80: colors.white,
            neutral60: colors.blue,
          },
        })}
      />
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='북마크 이름'
            value={title}
            onChange={getTitle}
            ref={inputRef}
          />
        </Input>
      </div>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='북마크 주소'
            value={url}
            onChange={getUrl}
            onKeyDown={keyDownHandler}
            ref={inputRef}
          />
        </Input>
      </div>
      <button onClick={clickAddHandler}>
        북마크 추가
        <AddIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default Add;
