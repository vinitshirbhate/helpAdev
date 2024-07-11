"use server";

import { auth } from "@/auth";
import { deleteRoom, getRoom } from "@/data-access/room";
import { error } from "console";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Not authenticated");
  }

  const room = await getRoom(roomId);

  if (room?.userId !== session.user.id) {
    console.log(error);
  }

  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
