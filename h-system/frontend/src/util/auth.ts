import http from "@/util/http";
import { AxiosResponse } from 'axios';

const tokenStorageKey = 'user-token';

interface User {
    username: string;
    password: string;
}

export function getToken(): string {
    return localStorage.getItem(tokenStorageKey) || '';
}

export function isAuthenticated(): boolean {
    const token = getToken();
    return !!token;
}


export function setToken(token: string) {
    localStorage.setItem(tokenStorageKey, token);
}

export function removeToken(): void {
    localStorage.removeItem(tokenStorageKey);
}

export function authenticateUser(user: User): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        console.log(user);
        http({ url: 'login', data: user, method: 'POST' })
            .then(res => {
                const token = `Bearer ${res.data.token}`;
                console.log(`${token}`)
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

export function logoutUser(): void {
    delete http.defaults.headers.common['Authorization'];
    removeToken();
}