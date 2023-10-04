interface AuthData {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  rememberMe: boolean;
}

class StorageUtil {
  getAuthData() {
    const data = sessionStorage.getItem("auth") || localStorage.getItem("auth");
    if (!data) return null;
    return JSON.parse(data);
  }

  setAuthData(authData: AuthData, rememberMe = false) {
    if (!rememberMe)
      return sessionStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, rememberMe })
      );

    return localStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, rememberMe })
    );
  }

  getLocalRefreshToken() {
    const authData = this.getAuthData();
    return authData?.refreshToken;
  }

  removeAuthData() {
    sessionStorage.removeItem("auth");
    localStorage.removeItem("auth");
  }

  setCurrentUser(user: any) {
    const authData = this.getAuthData();

    if (authData?.rememberMe)
      return localStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, user })
      );

    return sessionStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, user })
    );
  }

  getCurrentUser() {
    const authData = this.getAuthData();
    return authData?.user;
  }

  getLocalAccessToken() {
    const token = this.getAuthData()?.access_token;
    return token;
  }
}

export default new StorageUtil();
