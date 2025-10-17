import axios from "axios";


const API_URL = "https://vercel.com/gikrazs-projects/backend-testing";

export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
