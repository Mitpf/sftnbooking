import { html } from "../lib/lit-html.js";
import { submitHandler } from "../util.js";

const createTemplate = (onSubmit) => html`
  <h2>Host Room</h2>

  <form @submit=${onSubmit}>
    <label>Name: <input type="text" name="name"></label>
    <label>Location: <input type="text" name="location" ></label>
    <label>Beds: <input type="number" name="beds" ></label>
    <button>Beds: Create Room</button>
  </form>
`;

export function createView(ctx) {
  ctx.render(createTemplate(submitHandler(onSubmit)));

  async function onSubmit(data) {
    console.log(data);
  }
}
