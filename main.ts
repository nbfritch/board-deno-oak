import { Application, eta, log, Router } from "./deps.ts";
import { aboutRouter } from "./about.ts";
import { authRouter } from "./auth.ts";
import { boardRouter } from "./boards.ts";
import { postRouter } from "./posts.ts";
import type { Context } from "./deps.ts";

// View engine
const { configure } = eta;
const viewPath = `${Deno.cwd()}/views/`;
configure({ views: viewPath });

const app: Application = new Application();

// Logger
const logger = log.getLogger();

// log on listen
app.addEventListener("listen", () => {
  logger.info("Server is listening");
});

// Main routes
const mainRouter = new Router();

mainRouter.use("/about", aboutRouter.routes());
mainRouter.use("/boards", boardRouter.routes());
mainRouter.use("/posts", postRouter.routes());
mainRouter.use("/signup", authRouter.routes());
mainRouter.use("/login", authRouter.routes());

// Serve static files
app.use(async (context: Context, next) => {
  const o = context.request.url.pathname;
  const p = o.replace("/static/", "");
  if (p != o) {
    await context.send({ root: `${Deno.cwd()}/static`, path: p });
  } else {
    await next();
  }
});

app.use(mainRouter.routes());

app.listen("127.0.0.1:3000");
