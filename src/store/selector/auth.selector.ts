import { RootState } from '../store';
import { useSelector } from 'react-redux';

export const useColor = () => {
  return useSelector((state: RootState) => state.ThemeReducer.color);
};

export const useIsLoggedIn = () => {
  return useSelector((state: RootState) => state.AuthReducer.isLoggedIn);
};

export const useUserData = () => {
  return useSelector((state: RootState) => state.AuthReducer.user);
};
