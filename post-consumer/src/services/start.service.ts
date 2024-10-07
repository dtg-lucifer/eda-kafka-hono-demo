import { connectDB } from "config/db.config";
import { KafkaConfig } from "../config/kafka.config";
import { postConsumer } from "consumers/post.consumer";

export const init = async () => {
  const kafkaConfig = new KafkaConfig();

  try {
    await kafkaConfig.connect();
    await connectDB();
    await postConsumer(kafkaConfig);
  } catch (e) {
    console.log("Error initializing Kafka", e);
    process.exit(1);
  }

  return kafkaConfig;
};
