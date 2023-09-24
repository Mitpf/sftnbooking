import { setUserData } from '../util.js';
import { post } from './api.js';

export async function register(email, username, password) {

    const { sessionToken, objectId } = await post('/users', { email, username, password });

    const userData = {
        objectId,
        email,
        username,
        sessionToken
    }

    setUserData(userData);
    console.log(result);
}

export async function login(email, password) {

    const { email, username, objectId, sessionToken } = post('/login', { email, password });

    const userData = {
        objectId,
        email,
        username,
        sessionToken
    }

    console.log(result);
}