import axios from "axios";

export function isAuthenticated() {
    const token = getToken();
    return !!token;
}

export function getToken() {
    return localStorage.getItem('user-token') || '';
}

export function setToken(token) {
    localStorage.setItem('user-token', token);
}

export function removeToken() {
    localStorage.removeItem('user-token');
}

export const authenticateUser = user => new Promise((resolve, reject) => {
    console.log(user);
    axios({ url: 'login', data: user, method: 'POST' })
        .then(res => {
            const token = res.data;
            console.log(`Bearer ${token}`)
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            resolve(res);
        })
        .catch(err => {
            removeToken();
            reject(err);
        })
})