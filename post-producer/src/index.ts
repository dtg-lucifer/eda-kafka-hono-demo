import { KafkaConfig } from "config/kafka.config";
import { Hono } from "hono";
import { createPostRouter } from "services/createpost.service";
import { init } from "services/start.service";

//! Constants
const app = new Hono();
let __kafka: KafkaConfig;

//! Kafka initialization
init()
  .then(kafkaConfig => {
    console.log("Kafka initialized");

    __kafka = kafkaConfig;
  })
  .catch(e => {
    console.log("Error initializing Kafka", e);
    process.exit(1);
  });

app
  .get("/", c => {
    return c.json({ success: "Hello Hono!" });
  })
  .route("/post", createPostRouter);

export default app;
export { __kafka };
