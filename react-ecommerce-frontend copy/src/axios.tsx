import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN = localStorage.getItem("token")


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const publicRequest2 = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {authorization: `Bearer ${TOKEN}` }
})

export const userRequest2 = axios.create({
    baseURL: BASE_URL,
    headers: {
        authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data',
    }
});
