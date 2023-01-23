import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});


export const axios_01 = axios.create({
    baseURL: "http://localhost:8001",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});