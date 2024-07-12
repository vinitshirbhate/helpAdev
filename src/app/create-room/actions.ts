"use server";

import { Room, room } from "@/db/schema";
import { database } from "@/db/database";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createRoom } from "@/data-access/room";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("User is not authenticated");
  }

  const userId: string = session.user.id;

  const room = await createRoom(roomData, userId);

  revalidatePath("/");
  return room;
}
