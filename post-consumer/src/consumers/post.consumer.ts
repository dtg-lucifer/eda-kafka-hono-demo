import { KafkaConfig } from "config/kafka.config";
import { processMessages } from "services/bulk_insert.service";

export let messages: any[] = [];

export const postConsumer = async (__kafka: KafkaConfig) => {
  let processing: boolean = false;

  try {
    await __kafka.subscribeTopic("post");
    await __kafka.consumeTopic(async m => {
      messages.push(m);

      console.log("Received a message");

      if (messages.length > 10) {
        if (processing) return;
        processing = true;

        console.log("Processing batch of 10 messages");

        await processMessages(messages);
        messages.splice(0, messages.length);
        processing = false;
      }
    });

    /** ///? Also if some messages are left in the messages array after the consumer is stopped,
     *  ///? we can process them in a batch of 100 messages every 10 seconds.
     */
    setInterval(async () => {
      if (messages.length > 0) {
        if (processing) return;
        processing = true;

        console.log("Processing the rest of the batch");

        await processMessages(messages);
        messages.splice(0, messages.length);
        processing = false;
      }
    }, 5000);
  } catch (error) {
    console.log("Error consuming topic", error);
  } finally {
    processing = false;
  }
};
