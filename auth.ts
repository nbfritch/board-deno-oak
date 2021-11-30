import { Router } from "./deps.ts";
import type { Context } from "./deps.ts";
import { renderView } from "./viewHelper.ts";

const authRouter = new Router();

authRouter.get("/", (context: Context) => {
  renderView(context, "log_in.eta", {
    title: "Log In",
  });
});

export { authRouter };
