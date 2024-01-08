import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import styles from '../../styles/SearchFolder.module.scss';
import { Link, useLocation } from 'react-router-dom';
import Input from '../../components/ui/Input';
import { useInput } from '../../hoc/useInput';
import { useState } from 'react';
import { searchMyFolders } from '../../services/folderApi';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/ui/Loading';
import ErrorPage from '../../components/ui/ErrorPage';

const SearchMyFolder = () => {
  const location = useLocation();
  const handleClick = async () => {
    refetch();
    inputRef.current.blur();
  };
  const { inputRef, keyword, handleInputChange, handleKeyDown } = useInput(
    '',
    handleClick
  );

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ['searchedMy'],
    queryFn: () => searchMyFolders(keyword),
    enabled: false,
  });
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage>{error}</ErrorPage>;

  return (
    <>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='내 폴더 검색'
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <div
            className={styles.icon_box}
            onClick={handleClick}
          >
            <SearchIcon className={styles.icon} />
          </div>
        </Input>
      </div>
      <div className={styles.list}>
        <ul>
          {data &&
            data.map((f) => (
              <li key={f.id}>
                <Link
                  to={`/view/folders/${f.id}`}
                  state={{ previousLocation: location, data: f }}
                  id={f.id}
                >
                  {f.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchMyFolder;
