import axios from "../../../modules/axios";


const getAdminBoard=()=>{
    return axios.get('/admin/login')
};

const getStudentBoard=()=>{
    return axios.get('/student/login')
};

const getTeacherBoard=()=>{
    return axios.get('/teacher/login')
};

const userService={
    getTeacherBoard,
    getStudentBoard,
    getAdminBoard
}

export default userService;