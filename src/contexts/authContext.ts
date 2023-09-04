import { UserRoles } from '@/constants/userRoles';
import storageUtil from '@/utils/storage.util';
import { create } from 'zustand';

interface UserInfo {
  id: string;
  name: string;
  role: UserRoles;
}

export type IAuthStore = {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;

  setUserInfo: (userInfo: UserInfo | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useAuthStore = create<IAuthStore>(() => ({
  userInfo: storageUtil.getAuthData()?.user || {
    id: '',
    name: '',
    role: '',
  },

  isLoggedIn: storageUtil.getAuthData() ? true : false,

  setUserInfo: (userInfo: UserInfo | null) => {
    useAuthStore.setState({ userInfo });
  },

  setIsLoggedIn: (isLoggedIn: boolean) => {
    useAuthStore.setState({ isLoggedIn });
  },
}));
