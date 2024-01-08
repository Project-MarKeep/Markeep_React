import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/Modal.module.scss';
import { useState } from 'react';

const Modal = () => {
  let navigate = useNavigate();
  const location = useLocation().state.previousLocation;
  const [close, setClose] = useState(false);

  return (
    <div
      className={styles.background}
      onClick={() => navigate(location)}
    >
      {!close && (
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <Outlet context={{ setClose }} />
        </div>
      )}
    </div>
  );
};

export default Modal;
