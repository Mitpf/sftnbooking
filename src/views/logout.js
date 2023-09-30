import { logout } from '../data/user.js'
import { clearUserData } from '../util.js';


export function logoutAction(ctx) {
    logout();
    clearUserData();
    ctx.page.redirect('/');
}