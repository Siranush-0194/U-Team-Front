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
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// export const axios_02 = axios.create({
//     baseURL: "http://localhost:8003",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true
// });

export const axios_03 = axios.create({
    baseURL: "http://localhost:8002",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});


