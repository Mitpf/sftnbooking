
import { addOwner, createPointer, encodeDate, encodeObject, filterRelation } from "../util.js";
import { get, post } from "./api.js";


const endpoints = {
    'reservationsByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(filterRelation('room', 'Room', roomId))+'&include=owner',
    'reservations': '/classes/Reservation'
}

export async function getRoomId(roomId) {
    const data = await get(endpoints.reservationsByRoomId(roomId));
    data.results.forEach(r => {
        r.startDate = new Date(r.startDate.iso);
        r.endDate = new Date(r.endDate.iso);
    });
    return data;
}

export async function create(roomData, userId) {
    roomData = addOwner(roomData, userId);
    roomData.startDate = encodeDate(roomData.startDate)
    roomData.endDate = encodeDate(roomData.endDate)
    roomData.room = createPointer('Room', roomData.room);
    roomData.host = createPointer('_User', roomData.host);
    return await post(endpoints.reservations, roomData)
}
//from documentation:
/*  . . .      :{ \"__type\": \"Date\", \"iso\": \"2018-11-06T18:02:52.249Z\" }             .... */

/*  -d "{ \"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" },
\"room\":{ \"__type\": \"Pointer\", \"className\": \"Room\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" },\"startDate\":{ \"__type\": \"Date\",
 \"iso\": \"2018-11-06T18:02:52.249Z\" },\"endDate\":{ \"__type\": \"Date\", \"iso\": \"2018-11-06T18:02:52.249Z\" },
\"host\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" } }" \ */