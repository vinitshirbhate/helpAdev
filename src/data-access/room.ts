import { database } from "@/db/database";
import { unstable_noStore } from "next/cache";

export default async function getRooms() {
  unstable_noStore();
  const rooms = await database.query.room.findMany();
  return rooms;
}
