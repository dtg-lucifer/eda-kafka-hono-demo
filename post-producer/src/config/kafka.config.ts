import { Admin, Kafka, logLevel, Producer } from "kafkajs";

export class KafkaConfig {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly admin: Admin;
  private readonly broker: string;

  constructor() {
    this.broker = process.env.KAFKA_BROKER!;
    this.kafka = new Kafka({
      clientId: "post-producer",
      brokers: [this.broker],
      logLevel: logLevel.WARN,
    });
    this.producer = this.kafka.producer({
      // createPartitioner:
      //   () =>
      //   ({ topic, partitionMetadata, message }: PartitionerArgs): number => {
      //     console.log("Message", message);
      //     return message.partition || 0;
      //   },
    });
    this.admin = this.kafka.admin();
  }

  async connect() {
    try {
      await this.producer.connect();
      await this.admin.connect();

      console.log("Kafka is connected");
    } catch (error) {
      console.log("Error connecting to Kafka", (error as Error).message);
    }
  }

  async createTopic(topic: string) {
    try {
      await this.admin.createTopics({
        topics: [{ topic }],
      });

      console.log(`Topic ${topic} created`);
    } catch (error) {
      console.log(`Error creating topic ${topic}`, (error as Error).message);
    }
  }

  async sendToTopic(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });

      console.log(`Message sent to topic ${topic}`);
    } catch (error) {
      console.log(
        `Error sending message to topic ${topic}`,
        (error as Error).message
      );
    }
  }
}
