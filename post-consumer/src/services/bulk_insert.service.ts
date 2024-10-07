import { PostModel } from "models/post.model";

export const processMessages = async (messages: any[]) => {
  const batch = [...messages];
  try {
    await PostModel.insertMany(batch, { ordered: false });
  } catch (error) {
    console.log("Error processing messages", (error as Error).message);
		
    // TODO Optionally we can do one thing is to save the batch again to the old messages and retry the bulk insert so that no data will be lost.
  }
};
