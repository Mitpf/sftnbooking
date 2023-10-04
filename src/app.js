import page from "./lib/page.mjs";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { addUserNav } from "./middlewares/usernav.js";
import { getUserData } from "./util.js";
import { createView } from "./views/create.js";
import { catalogView } from "./views/catalog.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { navTemplate } from "./views/nav.js";
import { homeView } from "./views/home.js";
import { logoutAction } from "./views/logout.js";
import { preloadRoom } from "./middlewares/preloader.js";
import { hasUser, isOwner } from "./middlewares/guards.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";




page(addRender(document.querySelector('main'), document.querySelector('header')));
page(addSession(getUserData));
page(addUserNav(navTemplate))


page('/index.html', '/')
page('/', homeView);
page('/rooms', catalogView);
page('/rooms/:id', preloadRoom('id', 'rooms'), detailsView); //destructured ctx
page('/host', hasUser(), createView);
page('/edit/:id', preloadRoom('id', 'rooms'), isOwner(), editView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutAction);

page.start();

/* 
nested destructuring:

page('/rooms/:id', ({ params: { id } }) => console.log('details', id));
page('/rooms/:id', (ctx) => console.log('details', ctx.params.id));

*/