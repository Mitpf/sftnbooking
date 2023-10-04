

import { html, nothing } from '../lib/lit-html.js';
import * as roomService from '../data/room.js';
import * as reservationService from '../data/reservation.js';
import { addOwner, submitHandler } from '../util.js';

const detailsTemplate = (room, isOwner, hasUser, onDelete, onBook) =>
    html`
    <h1>${room.name}</h1>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    ${hasUser && !isOwner ? reservationForm(onBook) : nothing}
    ${isOwner ? html`<a href="/edit/${room.objectId}">Edit</a>
    <a href="javascript:void(0)" @click=${onDelete}>Delete</a>
    ` : nothing
        }
    `;

const reservationForm = (onSubmit) => html`
    <form @submit=${onSubmit}>
       <label>From: <input type="date" name="startDate"></label> 
       <label>To: <input type="date" name="endDate"></label> 
       <button> Request Booking</button>
    </form>
`


export async function detailsView(ctx) {
    const id = ctx.params.id;
    const room = ctx.data;
    const hasUser = Boolean(ctx.user);
    //const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;
    const isOwner = ctx.data?.owner?.objectId === (ctx.user?.objectId || null);

    if (isOwner) {
        //load reservations

        const { results: reservations } = await reservationService.getRoomId(id);
        console.log(reservations)
    }

    ctx.render(detailsTemplate(ctx.data, isOwner, hasUser, onDelete, submitHandler(book)));

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

        const result = await reservationService.create(reservationData,ctx.user.objectId);

        ctx.page.redirect('/rooms/' + id);
    }
}

