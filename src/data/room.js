
import { del, get, post, put } from "./api.js";


const endpoints = {
    'rooms': '/classes/Room',
    'roomById': '/classes/Room'
}

export async function getAll() {
    return get(endpoints.rooms)
}

export async function getById(id) {
    return get(endpoints.roomById + id);
}

export async function create(roomData) {
    return post(endpoints.rooms, roomData);
}

export async function udpate(id, roomData) {
    return post(endpoints.roomById + id, roomData)
}

export async function deleteById(id) {
    return del(endpoints.roomById + id);
}