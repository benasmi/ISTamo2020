export const getAccessToken = () => localStorage.getItem('token');
export const isAuthenticated = () => !!getAccessToken()