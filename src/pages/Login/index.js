import { parseHtmlFromString, render } from "../../utils/helpers";
import { loginUser } from "../../store/user-slice";
import { store } from "../../store";
import "./style.scss";
import loginTemplate from "./templates/login.hbs";

export function loginPage() {
  const htmlString = loginTemplate();

  const html = parseHtmlFromString(htmlString);

  const formLoginElement = html.querySelector("#form-login");

  formLoginElement?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bodyRequest = {
      email: formLoginElement.querySelector("#email").value,
      password: formLoginElement.querySelector("#password").value,
    };
    store.dispatch(loginUser(bodyRequest));
  });

  render(html, this.app);
}
