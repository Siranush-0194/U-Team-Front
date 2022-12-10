import { createStore } from 'redux'

const store = createStore(function (state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload
            };
        case 'logout':
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
}, {
    rule: "admin",
    rules: {
        admin: {
            title: "Login Admin",
            submit: '/admin/login',
            invitation: '/admin/send-invitation'
        },
        student: {
            title: "Login Student",
            submit: '/student/login',
            invitation: '/student/send-invitation'
        },
        teacher: {
            title: "Login Teacher",
            submit: '/teacher/login',
            invitation: '/teacher/send-invitation'
        }
    },
    user: null
})

export default store;