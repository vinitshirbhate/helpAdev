"use server";

import { Room, room } from "@/db/schema";
import { database } from "@/db/database";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { editRoom, getRoom } from "@/data-access/room";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("User is not authenticated");
  }

  const room = await getRoom(roomData.id);
  if (room?.userId !== session.user.id) {
    throw new Error("User is not authorized");
  }

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your-rooms");
  revalidatePath("edit-room/" + roomData.id);
  redirect("/your-rooms");
}
