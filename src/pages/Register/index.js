import { store } from "../../store";
import { registerUser } from "../../store/user-slice";

export function register() {
  const app = document.getElementById("app");
  console.log("register");

  app.innerHTML = `
    <h1>register</h1><button onClick=></button>`;
}
import { parseHtmlFromString, render } from "../../utils/helpers";

import "./style.scss";
import registerTemplate from "./templates/register.hbs";

export function registerPage() {
  const app = document.getElementById("app");

  const htmlString = registerTemplate();
  const html = parseHtmlFromString(htmlString);

  const formRegisterElement = html.querySelector("#form-register");

  formRegisterElement?.addEventListener("submit", (event) => {
    event.preventDefault();
    const bodyRequest = {
      name: formRegisterElement.querySelector("#name").value,
      email: formRegisterElement.querySelector("#email").value,
      password: formRegisterElement.querySelector("#password").value,
    };

    store.dispatch(registerUser(bodyRequest));
  });

  render(html, app);
}
