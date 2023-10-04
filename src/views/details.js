

import { html, nothing } from '../lib/lit-html.js';
import * as roomService from '../data/room.js';
import * as reservationService from '../data/reservation.js';
import { addOwner, submitHandler } from '../util.js';
import { repeat } from '../lib/directives/repeat.js';

const detailsTemplate = (room, hasUser, onDelete, onBook) =>
    html`
    <h1>${room.name}</h1>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    ${hasUser && !room.isOwner ? reservationForm(onBook) : nothing}
    ${room.isOwner ? html`
        <a href="/edit/${room.objectId}">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete}>Delete</a>` : nothing}
    ${hasUser ? html`
            <ul>
               ${repeat(room.reservations, r => r.objectId, reservationCard)} 
            </ul>`: nothing}`;

const reservationForm = (onSubmit) => html`
    <form @submit=${onSubmit}>
       <label>From: <input type="date" name="startDate"></label> 
       <label>To: <input type="date" name="endDate"></label> 
       <button> Request Booking</button>
    </form >`;

const reservationCard = (res) => html`
<li>From: ${res.startDate.toISOString().slice(0,10)} To: ${res.endDate.toISOString().slice(0,10)} By: ${res.owner.username}</li>

`;


export async function detailsView(ctx) {
    const id = ctx.params.id;
    const room = ctx.data;
    const hasUser = Boolean(ctx.user);
    room.isOwner = room.owner.objectId === (ctx.user?.objectId || null);
    room.reservations = [];
    //const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;


    if (hasUser) {
        //load reservations

        const result = await reservationService.getRoomId(id);
        room.reservations = result.results;
    }

    ctx.render(detailsTemplate(ctx.data, hasUser, onDelete, submitHandler(book)));

    async function onDelete() {
        const confirmed = confirm('This action is going to delete the room! Proceed?');

        if (confirmed) {
            await roomService.deleteById(id);
            ctx.page.redirect('/rooms');
        }
    }

    async function book({ startDate, endDate }) {

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (Number.isNaN(startDate.getDate())) {
            return alert('invalid start date');
        }
        if (Number.isNaN(endDate.getDate())) {
            return alert('invalid end date');
        }

        if (endDate <= startDate) {
            return alert('end date must be bigger than startDate')
        }

        const reservationData = {
            startDate,
            endDate,
            room: id,
            host: ctx.data.owner.objectId
        };

        const result = await reservationService.create(reservationData, ctx.user.objectId);

        ctx.page.redirect('/rooms/' + id);
    }
}

