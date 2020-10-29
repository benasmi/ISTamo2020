export const getAccessToken = () => localStorage.getItem('username');
export const getRefreshToken = () => localStorage.getItem('password');
export const isAuthenticated = () => !!getAccessToken() && !!getRefreshToken;