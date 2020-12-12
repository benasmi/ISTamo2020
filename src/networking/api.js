import RequestType from "./networking";

// Auth
const login = (payload) => RequestType.postRequest("auth/login", payload);
const Auth = {login};

const API = {Auth};

export default API