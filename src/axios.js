import axios from "axios";

export const PORTS = {
    8000: "http://localhost:8000",
    8001: "http://localhost:8001",
    8002: "http://localhost:8002",
    8003: "http://localhost:8003",
    8004: "http://localhost:8004"
}

export default axios.create({
    baseURL: PORTS[8000],
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});


export const axios_01 = axios.create({
    baseURL: PORTS[8001],
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const axios_02 = axios.create({
    baseURL: PORTS[8003],
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const axios_03 = axios.create({
    baseURL: PORTS[8002],
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});


export const axios_04 = axios.create({
    baseURL: PORTS[8004],
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

