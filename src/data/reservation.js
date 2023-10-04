
import { addOwner, createPointer, encodeDate, encodeObject, filterRelation } from "../util.js";
import { get, post } from "./api.js";


const endpoints = {
    'reservationsByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(filterRelation('room', 'Room', roomId)),
    'reservations': '/classes/Reservation'
}

export async function getRoomId(roomId) {
    return get(endpoints.reservationsByRoomId(roomId))
}

export async function create(roomData, roomId, userId) {
    roomData = addOwner(roomData, userId);
    roomData.startDate = encodeDate(roomData.startDate)
    roomData.endDate = encodeDate(roomData.endDate)
    roomData.room = createPointer('Room', roomId);
    return await post(endpoints.reservations, roomData)
}

/*  -d "{ \"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" },
\"room\":{ \"__type\": \"Pointer\", \"className\": \"Room\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" },\"startDate\":{ \"__type\": \"Date\",
 \"iso\": \"2018-11-06T18:02:52.249Z\" },\"endDate\":{ \"__type\": \"Date\", \"iso\": \"2018-11-06T18:02:52.249Z\" },
\"host\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" } }" \ */