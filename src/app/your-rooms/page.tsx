import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/data-access/room";
import Link from "next/link";
import { UserRoomCard } from "./User-RoomCard";

export default async function YourRooms() {
  try {
    const rooms = await getUserRooms();
    return (
      <main className="flex min-h-screen flex-col p-16">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-4xl">Your Rooms</h1>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => (
            <UserRoomCard key={room.id} room={room} />
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return (
      <div className="flex  flex-col items-center justify-between p-24">{`Something went wrong${error}`}</div>
    );
  }
}
