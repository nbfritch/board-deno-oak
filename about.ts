import { Router } from "./deps.ts";
import type { Context } from "./deps.ts";
import { renderView } from "./viewHelper.ts";

const aboutRouter = new Router();

aboutRouter.get("/", (context: Context) => {
  renderView(context, "about.eta", {
    title: "About Denox",
    about: true,
  });
});

export { aboutRouter };
