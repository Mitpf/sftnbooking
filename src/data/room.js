
import { addOwner, createPointer } from "../util.js";
import { del, get, post, put } from "./api.js";


const endpoints = {
    'rooms': `/classes/Room?where=${encodeURIComponent(`{"openForBooking":true}`)}`,
    'roomsWithUser': (userId) => `/classes/Room?where=${encodeURIComponent(`{"$or":[{"openForBooking":true},{"owner":${JSON.stringify(createPointer('_User', userId))}}]}`)}`,
    'roomById': '/classes/Room/'
}

export async function getAll(userId) {
    if (userId) {
        return get(endpoints.roomsWithUser(userId));
    } else {
        return get(endpoints.rooms);
    }

}

export async function getById(id) {
    return get(endpoints.roomById + id);
}

export async function create(roomData, userId) {
    return post(endpoints.rooms, addOwner(roomData, userId));
}

export async function update(id, roomData, userId) {
    return put(endpoints.roomById + id, addOwner(roomData, userId))
}

export async function deleteById(id) {
    return del(endpoints.roomById + id);
}

/* 
const rooms= await roomServise.getAll();
const room = rooms.results[2];
const editedRoom={
    name: room.name,
    location: room.location,
    beds: room.beds,
    openForBooking: true
}
await roomServise.update('n6pmcVvFzk',editedRoom,'CWxWc9j3H6')
*/