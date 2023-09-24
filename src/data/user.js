import { post } from './api.js';

export async function register(email, username, password) {

    const result = await post('/users', { email, username, password });

    console.log(result);
}

export async function login(email, password) {
    const result = post('/login', { email, password });
    console.log(result);
}