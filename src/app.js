import page from "./lib/page.mjs";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { getUserData } from "./util.js";
import { createView } from "./views/create.js";


import * as api from './data/user.js';
import { catalogView } from "./views/catalog.js";
window.api = api;

page(addRender(document.querySelector('main')));
page(addSession(getUserData))

page('/index.html', '/')
page('/', '/create');
page('/rooms', catalogView);
page('/rooms/:id', ({ params: { id } }) => console.log('details', id));
page('/create', createView);

page.start();

/* 
nested destructuring:

page('/rooms/:id', ({ params: { id } }) => console.log('details', id));
page('/rooms/:id', (ctx) => console.log('details', ctx.params.id));

*/