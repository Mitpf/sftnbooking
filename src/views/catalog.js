


import { html } from '../lib/lit-html.js';
import { classMap } from '../lib/directives/class-map.js'
import { repeat } from '../lib/directives/repeat.js';

import * as roomService from '../data/room.js';

const catalogTemplate = (list) =>
    html`
    <h1>Available Rooms</h1>
    ${list}
    
    `;

const listTemplate = (rooms) => html`
<section>
    ${repeat(rooms, r => r.objectId, roomCard)}
</section>
`;

const roomCard = (room) => html`
<article class=${classMap({ "room-card": true, 'own-room':room.isOwner })}>
    <h1>${room.name}</h1>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    
<p><a class="action" href="/rooms/${room.objectId}">View Details</a> </p>
</article>
`

export async function catalogView(ctx) {

    ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`));

    const { results: rooms } = await roomService.getAll();

    if (ctx.user) {
        rooms.forEach(r => r.isOwner = r.owner.objectId == ctx.user.objectId)
    }

    ctx.render(catalogTemplate(listTemplate(rooms)));
}

