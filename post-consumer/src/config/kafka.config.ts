import { Kafka, logLevel, Consumer } from "kafkajs";

export class KafkaConfig {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly broker: string;

  constructor() {
    this.broker = process.env.KAFKA_BROKER!;
    this.kafka = new Kafka({
      clientId: "post-comsumer",
      brokers: [this.broker],
      logLevel: logLevel.WARN,
    });
    this.consumer = this.kafka.consumer({ groupId: "post-consumer" });
  }

  async connect() {
    try {
      await this.consumer.connect();

      console.log("Kafka is connected");
    } catch (error) {
      console.log("Error connecting to Kafka", (error as Error).message);
    }
  }

  async subscribeTopic(topic: string) {
    try {
      await this.consumer.subscribe({ topic, fromBeginning: true });
      console.log("Subscribed to topic", topic);
    } catch (error) {
      console.log("Error subscribing to topic", error);
    }
  }

  async consumeTopic(callback: (message: any) => void) {
    try {
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          message.value && callback(JSON.parse(message.value.toString()));
        },
      });
    } catch (error) {
      console.log("Error consuming topic", (error as Error).message);
    }
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();
      console.log("Kafka is disconnected");
    } catch (error) {
      console.log("Error disconnecting from Kafka", (error as Error).message);
    }
  }
}
