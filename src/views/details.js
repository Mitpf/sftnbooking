

import { html, nothing } from '../lib/lit-html.js';
import * as roomSErvice from '../data/room.js'


const detailsTemplate = (room, isOwner, hasUser, onDelete) =>
    html`
    <h1>${room.name}</h1>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    ${hasUser && !isOwner ? html`<a href="/edit/${room.objectId}">Book room</a>` : nothing}
    ${isOwner ? html`<a href="/edit/${room.objectId}">Edit</a>
    <a href="javascript:void(0)" @click=${onDelete}>Delete</a>
    ` : nothing
        }
    `;


export function detailsView(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    //const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;
    const isOwner = ctx.data?.owner?.objectId === (ctx.user?.objectId || null);
    console.log(isOwner);
    ctx.render(detailsTemplate(ctx.data, isOwner, hasUser, onDelete));

    async function onDelete() {
        const confirmed = confirm('This action is going to delete the room! Proceed?');

        if (confirmed) {
            await roomSErvice.deleteById(id);
            ctx.page.redirect('/rooms');
        }
    }
}

