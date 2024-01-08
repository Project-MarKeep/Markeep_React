import styles from '../../styles/MyFolders.module.scss';
import Loading from '../../components/ui/Loading';
import { getMyFolders } from '../../services/folderApi';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../../components/ui/ErrorPage';

const MyFolders = () => {
  const location = useLocation();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['myFolders'],
    queryFn: () => {
      return getMyFolders();
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage>{error}</ErrorPage>;

  return (
    <>
      <h2 className={styles.title}>내 폴더 목록</h2>
      <div className={styles.list}>
        <ul>
          {data.map((f) => (
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

export default MyFolders;
