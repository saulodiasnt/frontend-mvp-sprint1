import { parseHtmlFromString } from "./parse-html-from-string.helper";

export function render(
  htmlElement,
  app,
  isDomParser = false,
  finishCallback = null
) {
  let htmlRender = isDomParser ? htmlElement.body.firstChild : htmlElement;

  if (typeof htmlRender === "string") {
    debugger;
    htmlRender = parseHtmlFromString(htmlRender);
  }
  app.innerHTML = "";
  app.appendChild(htmlRender);

  if (finishCallback) {
    finishCallback();
  }
}
