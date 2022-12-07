import { createStore } from 'redux'

const store = createStore(function (state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload
            };
        case 'logout':
            localStorage.removeItem("user");

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
    user: (() => {
        let user = {};

        try {
            user = JSON.parse(localStorage.getItem("user") || JSON.stringify({}));
        } catch (e) {
            user = {};
        }

        return user;
    })()
})

export default store;