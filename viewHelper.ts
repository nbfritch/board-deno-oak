import { eta } from "./deps.ts";
import type { Context } from "./deps.ts";

const { renderFile } = eta;

export const renderView = async (
  ctx: Context,
  templateName: string,
  data: Record<string, unknown>,
) => {
  const response = await renderFile(templateName, data);
  if (!response) {
    throw `Template ${templateName} did not return any data`;
  }

  ctx.response.body = response;
  ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
};
