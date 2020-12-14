import RequestType from "./networking";

// Auth
const login = (payload) => RequestType.postRequest("auth/login", payload);
const Auth = {login};

//News
const getNews = (requestParams) => RequestType.getRequest("news/", requestParams);
const insertNews = (payload) => RequestType.postRequest("news/", payload);
const updateNews = (payload) => RequestType.patchRequest('news/', payload);
const upvoteNew = (payload) => RequestType.postRequest('news/upvote', payload);
const News = {getNews, insertNews, updateNews, upvoteNew};

//Users
const insertUser = (payload) => RequestType.postRequest("users/", payload);
const getUsers = () =>RequestType.getRequest("users/");
const findOneUser = (requestParams) => RequestType.getRequest("users/", requestParams);
const updateUsers = (payload) => RequestType.patchRequest('users/', payload);
const deleteUser = (payload) => RequestType.deleteRequest("/users/", payload);
const getMe =() =>RequestType.getRequest("users/me");
const Users = {insertUser, getUsers, updateUsers, findOneUser, deleteUser, getMe};

//Settings
const getSettings = () => RequestType.getRequest("system/");
const updateSettings = (payload) => RequestType.patchRequest("system/", payload);
const getReport = () =>RequestType.getRequest("reports");
const System = {getSettings, updateSettings, getReport};


//Subjects
const getSubjects = () =>RequestType.getRequest("subject/");
const Subjects = {getSubjects}

//Marks
const getMarks = ()=>RequestType.getRequest("subject/users");
const insertMark = (payload) => RequestType.postRequest("marks/", payload);
const getMark = (requestParams) => RequestType.getRequest("marks/", requestParams);
const updateMark = (payload) => RequestType.patchRequest("marks/", payload);
const getRatings = () =>RequestType.getRequest("marks/rating");
const Marks = {getMarks, insertMark, getMark, updateMark, getRatings};


//Schedule
const getSchedule = ()=> RequestType.getRequest("schedule/");
const getGlobalSchedule = ()=> RequestType.getRequest("schedule/global");
const addScheduleToSubject = (payload) => RequestType.postRequest("schedule/", payload);
const getScheduleForEditing = (requestParameters) =>RequestType.getRequest("schedule/get/", requestParameters);
const updateSchedule = (payload) =>RequestType.patchRequest("schedule/", payload);
const Schedule = {getSchedule, addScheduleToSubject, getGlobalSchedule, getScheduleForEditing, updateSchedule};

//Rooms
const getRooms = ()=> RequestType.getRequest("schedule/rooms");
const Rooms = {getRooms}

const API = {Auth, News, Users, System, Subjects, Marks, Schedule, Rooms};

export default API