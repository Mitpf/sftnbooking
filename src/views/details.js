


import { html, nothing } from '../lib/lit-html.js';

const detailsTemplate = (room, isOwner, hasUser) =>
    html`
    <h1>${room.name}</h1>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    ${hasUser && !isOwner ? html`<a href="/edit/${room.objectId}">Book room</a>` : nothing}
    ${isOwner ? html`<a href="/edit/${room.objectId}">Edit</a>
    <a href="javascript:void()">Delete</a>
    ` : nothing
        }
    `;


export function detailsView(ctx) {
    const hasUser = Boolean(ctx.user);
    //const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;
    const isOwner = ctx.data?.owner?.objectId === (ctx.user?.objectId || null);
    console.log(isOwner);
    ctx.render(detailsTemplate(ctx.data, isOwner, hasUser));
}

