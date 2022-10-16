import axios from 'axios';

export default axios.create({
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true
});

axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + 8000;