import RequestType from "./networking";

// Auth
const login = (payload) => RequestType.postRequest("auth/login", payload);
const Auth = {login};


const getNews = () => RequestType.getRequest("news/");
const News = {getNews};

const API = {Auth, News};

export default API