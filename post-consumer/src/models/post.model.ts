import { model, Model, Schema } from "mongoose";

export const PostSchema = new Schema<Post>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const PostModel = model<Post>("Post", PostSchema, "posts");

export interface Post {
  title: string;
  content: string;
}

export interface PostDocument extends Post, Document {}
