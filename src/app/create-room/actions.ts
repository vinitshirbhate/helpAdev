"use server";

import { Room, room } from "@/db/schema";
import { database } from "@/db/database";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("User is not authenticated");
  }

  const userId: string = session.user.id;

  await database.insert(room).values({ ...roomData, userId });
  revalidatePath("/");
}
