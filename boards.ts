import { helpers, Router } from "./deps.ts";
import type { Context } from "./deps.ts";
import { renderView } from "./viewHelper.ts";
import { getDb } from "./database.ts";

const boardRouter = new Router();

boardRouter.get("/", async (context: Context) => {
  const db = getDb();
  const boards = await db.queryObject`
      Select
        Id, Name, Url
      From Boards
      Limit 25;
    `;

  renderView(context, "board_index.eta", {
    title: "Boards",
    boards: boards.rows,
  });
});

interface BoardPost {
  id: number;
  title: string;
  body: string;
  boardid: number;
  name: string;
}

boardRouter.get("/:url", async (context: Context) => {
  const { url } = helpers.getQuery(context, { mergeParams: true });

  if (!url) {
    renderView(context, "not_found.eta", {
      title: "Nothing here",
    });
  }

  const db = getDb();

  // This might be vulnerable to sql injection, need to look at this library closer
  const boardPosts = await db.queryObject<BoardPost>`
    Select
      p.id,
      p.title,
      p.body,
      p.boardid,
      b.name
    From Boards b
    Join Posts p
      On p.boardid = b.id
    Where b.url = ${url}
    Order By p.id Desc
    Limit 25;
  `;

  if (boardPosts.rows.length) {
    renderView(context, "board_view.eta", {
      title: boardPosts.rows[0].name,
      boardPosts: boardPosts.rows,
    });
  } else {
    renderView(context, "not_found.eta", {
      title: "Nothing here",
    });
  }
});

export { boardRouter };
