import { helpers, Router } from "./deps.ts";
import type { Context } from "./deps.ts";
import { renderView } from "./viewHelper.ts";
import { getDb } from "./database.ts";

const postRouter = new Router();

interface Post {
  id: number;
  title: string;
  body: string;
  boardid: number;
  name: string;
}

postRouter.get("/", async (context: Context) => {
  const db = getDb();

  const posts = await db.queryObject<Post>`
    Select
      p.id,
      p.title,
      p.body,
      p.boardid,
      b.name
    From Posts p
    Join Boards b
      On p.boardid = b.id
    Order By p.id Desc
    Limit 25;
  `;

  renderView(context, "post_index.eta", {
    title: "Latest",
    posts: posts.rows,
  });
});

postRouter.get("/new", (context: Context) => {
  renderView(context, "post_form.eta", {
    title: "New Post",
  });
});

postRouter.post("/new", (context: Context) => {
  // TODO
  context.response.body = "post created";
});

postRouter.get("/:postid", async (context: Context) => {
  const { postid } = helpers.getQuery(context, { mergeParams: true });

  if (!postid) {
    renderView(context, "not_found.eta", {
      title: "Post not found",
    });
  }

  const db = getDb();

  const post = await db.queryObject<Post>`
    Select
      p.id,
      p.title,
      p.body,
      p.boardid,
      b.name
    From Posts p
    Join Boards b
      On p.boardid = b.id
    Where p.id = ${postid}
    Limit 1;
  `;

  if (post.rows.length) {
    const p = post.rows[0];
    renderView(context, "post_view.eta", {
      title: p.title,
      post: p,
    });
  } else {
    renderView(context, "not_found.eta", {
      title: "Post not found",
    });
  }
});

export { postRouter };
