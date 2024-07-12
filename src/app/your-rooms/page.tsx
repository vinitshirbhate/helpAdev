import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/data-access/room";
import Link from "next/link";
import { UserRoomCard } from "./User-RoomCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function YourRooms() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/api/auth/signin");
  }

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
        {rooms.length === 0 && (
          <div className="flex justify-center items-center flex-col mt-20">
            <Image
              src="/no-data.svg"
              alt="empty state"
              width={400}
              height={400}
            />
            <h2 className="text-2xl">make your first one!</h2>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return (
      <div className="flex  flex-col items-center justify-between p-24">{`Something went wrong${error}`}</div>
    );
  }
}
