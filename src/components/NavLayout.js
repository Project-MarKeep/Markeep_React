import { Outlet } from 'react-router-dom';
import NavModal from './NavModal';

export const NavLayout = () => {
  <NavModal>
    <Outlet />
  </NavModal>;
};
