import * as api from './data/user.js';

window.api = api;




















/* import { render, html } from './lib/lit-html.js';
import { until } from './lib/directives/until.js';

import page from './lib/page.mjs';

async function dealyed() {

    await new Promise(r => setTimeout(r, 500));

    return html`<h1>hello world</h1>`
}


function home() {
    render(until(dealyed(), html`<p>Loading ...</p>`), document.body);
}

page('/', home);
page.start(); */