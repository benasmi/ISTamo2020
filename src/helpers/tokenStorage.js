export const getAccessToken = () => localStorage.getItem('username');
export const isAuthenticated = () => !!getAccessToken()