import http from "./http.js";

const tokenStorageKey = 'user-token';

export function isAuthenticated() {
    const token = getToken();
    return !!token;
}

export function getToken() {
    return localStorage.getItem(tokenStorageKey) || '';
}

export function setToken(token) {
    localStorage.setItem(tokenStorageKey, token);
}

export function removeToken() {
    localStorage.removeItem(tokenStorageKey);
}

export function authenticateUser(user) {
    return new Promise((resolve, reject) => {
        console.log(user);
        http({ url: 'login', data: user, method: 'POST' })
            .then(res => {
                const token = `Bearer ${res.data}`;
                console.log(`Bearer ${token}`)
                setToken(token);
                http.defaults.headers.common['Authorization'] = token;
                resolve(res);
            })
            .catch(err => {
                console.log(err)
                removeToken();
                reject(err);
            })
    })
}

export function logoutUser() {
    delete http.defaults.headers.common['Authorization'];
    removeToken();
}