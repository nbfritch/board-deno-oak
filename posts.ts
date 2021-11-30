import { helpers, Router } from "./deps.ts";
import type { Context } from "./deps.ts";

const postRouter = new Router();

postRouter.get("/", (context: Context) => {
  // TODO
  context.response.body = "post index";
});

postRouter.get("/new", (context: Context) => {
  // TODO
  context.response.body = "new post";
});

postRouter.post("/new", (context: Context) => {
  // TODO
  context.response.body = "post created";
});

postRouter.get("/:post-id", (context: Context) => {
  // TODO
  const { requestedPost } = helpers.getQuery(context, { mergeParams: true });

  context.response.body = `view post ${requestedPost ?? "unknown"}`;
});

export { postRouter };
