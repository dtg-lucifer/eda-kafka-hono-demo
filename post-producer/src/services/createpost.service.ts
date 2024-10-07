import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { __kafka } from "index";

const createPostRouter = new Hono();

createPostRouter.post(
  "/create",
  zValidator(
    "json",
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ),
  async c => {
    const { req } = c;
    const { title, content } = req.valid("json");

    try {
      await __kafka.sendToTopic("post", JSON.stringify({ title, content }));
    } catch (e) {
      console.log("Error sending message to Kafka", (e as Error).message);
      c.json({ error: "Internal server error" }, 500);
    }

    return c.json({ response: "Post created", data: { title, content } }, 201);
  }
);

export { createPostRouter };
