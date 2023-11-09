import { ILogin, ISignup, ISocialLogin } from '@/interfaces/auth.interface';
import { httpClient } from '@/utils/httpClient';
import storageUtil from '@/utils/storage.util';

export class AuthApi {
  async login(data: ILogin) {
    data.email = data.email.toLowerCase();
    const res = await httpClient.post('/auth/login', data);
    storageUtil.setAuthData(res.data.body, data.rememberMe);
    return res.data;
  }

  async socialLogin(data: ISocialLogin) {
    data.email = data.email.toLowerCase();
    const res = await httpClient.post('/auth/social-login', data);
    storageUtil.setAuthData(res.data.body, true);
    return res.data;
  }

  async signup(data: ISignup) {
    data.email = data.email.toLowerCase();
    const res = await httpClient.post('/auth/signup', data);
    return res.data;
  }

  async logout() {
    storageUtil.removeAuthData();
    return await httpClient.post('/auth/logout');
  }

  async forgotPassword(data: { email: string }) {
    return await httpClient.post('/auth/forgot-password', data);
  }

  async resetPassword(data: { password: string; token: string }) {
    return await httpClient.post('/auth/reset-password', data);
  }
}
