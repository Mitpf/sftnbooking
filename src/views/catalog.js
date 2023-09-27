


import { html } from '../lib/lit-html.js';
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
<article>
    <h1>${room.name}</h1>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>

</article>
`

export async function catalogView(ctx) {
    ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`));

    const { results: rooms } = await roomService.getAll();

    ctx.render(catalogTemplate(listTemplate(rooms)));
}

