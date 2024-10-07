import { Hono } from "hono";
import { init } from "services/start.service";

const app = new Hono();

init();

app.get("/", c => {
  return c.json({ seccuess: "Hello from consumer!" }, 200);
});

export default {
  port: 3001,
  fetch: app.fetch,
};