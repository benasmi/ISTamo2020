import RequestType from "./networking";

// Auth
const login = (payload) => RequestType.postRequest("auth/login", payload);
const Auth = {login};


const getNews = () => RequestType.getRequest("news/");
const insertNews = (payload) => RequestType.postRequest("news/", payload);
const News = {getNews};

const API = {Auth, News};

export default API