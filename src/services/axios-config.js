import axios from "axios";
const baseURL="http://localhost:2003";
const publicAxios=axios.create({baseURL});
export {publicAxios,baseURL}