// Todo

const logout = () => {
    setLoggedIn(false);
    setAccessToken(null);
    if (JSON.parse(localStorage.getItem('remember_me'))) {
      localStorage.removeItem('remember_me');
      Cookies.remove('access_token');
    }
  };