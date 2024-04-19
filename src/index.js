import Navigo from "navigo";

import { loginPage } from "./pages/Login";
import { registerPage } from "./pages/Register";
import { dashboardPage } from "./pages/Dashboard";
import { store } from "./store";
import { logout } from "./store/user-slice";

import { checkAuth } from "./utils/hooks/";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const root = "/";
    const useHash = true;
    const hash = "#";
    const router = new Navigo(root, useHash, hash);
    const app = document.getElementById("app");

    const bindContext = { router, app };

    const PUBLIC_ROUTES = ["/", "/register"];

    router.hooks({
      before: (done, params) => {
        const currentPage = "/" + params.url;

        if (checkAuth() && PUBLIC_ROUTES.includes(currentPage)) {
          router.navigate("/dashboard");
        }

        if (!checkAuth() && !PUBLIC_ROUTES.includes(currentPage)) {
          router.navigate("/");
        }

        done();
      },
      after: (done, params) => {
        document.getElementById("sign-out")?.addEventListener("click", (e) => {
          e.preventDefault();
          store.dispatch(logout());
        });

        document.querySelectorAll('a[data-route="dynamic"]').forEach((el) => {
          el.addEventListener("click", (e) => {
            e.preventDefault();
            const url = e.target.getAttribute("href");
            router.navigate(url);
          });
        });
      },
    });

    store.subscribe(() => {
      const currentRoute = "/" + router.getCurrentLocation().url;
      const user = checkAuth();
      console.log("currentRoute", currentRoute);

      if (!user && !PUBLIC_ROUTES.includes(currentRoute)) {
        router.navigate("/");
      }

      if (user && PUBLIC_ROUTES.includes(currentRoute)) {
        router.navigate("/dashboard");
      }
    });

    router
      .on({
        "/": loginPage.bind(bindContext),
        "/register": registerPage.bind(bindContext),
        "/dashboard": dashboardPage.bind(bindContext),
      })
      .resolve();
  }.bind(store)
);
