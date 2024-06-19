import { database } from "@/db/database";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore();
  const rooms = await database.query.room.findMany();
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await database.query.room.findFirst({
    where: eq(room.userId, roomId),
  });
}
