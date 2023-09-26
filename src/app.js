import page from "./lib/page.mjs";
import { addRender } from "./middlewares/render.js";
import { createView } from "./views/create.js";


page(addRender(document.querySelector('main')));

page('/index.html','/')
page('/', '/create');
page('/rooms', () => console.log('catalog'));
page('/create', createView);

page.start();

