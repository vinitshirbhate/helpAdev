"use server";

import { auth } from "@/auth";
import { StreamChat } from "stream-chat";

export async function genrateTokenAction() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }
  const userId = session.user.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const apiSecret = process.env.NEXT_PUBLIC_GET_STREAM_SECRET_KEY!;

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);

  const token = serverClient.createToken(userId);
  return token;
}
