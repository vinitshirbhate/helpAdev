import { auth } from "@/auth";
import { database } from "@/db/database";
import { Room, room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string) {
  unstable_noStore();
  const where = search ? like(room.language, `%${search}%`) : undefined;
  const rooms = await database.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  unstable_noStore();
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Not authenticated");
  }
  const rooms = await database.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await database.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  unstable_noStore();
  await database.delete(room).where(eq(room.id, roomId));
}

export async function editRoom(roomData: Room) {
  await database.update(room).set(roomData).where(eq(room.id, roomData.id));
}
