import { KafkaConfig } from "../config/kafka.config";

export const init = async () => {
  const kafkaConfig = new KafkaConfig();

  try {
    await kafkaConfig.connect();
    await kafkaConfig.createTopic("post");
    await kafkaConfig.createTopic("post-processed");
  } catch (e) {
    console.log("Error initializing Kafka", e);
    process.exit(1);
  }

  return kafkaConfig;
};
