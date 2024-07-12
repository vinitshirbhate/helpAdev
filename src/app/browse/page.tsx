import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { getRooms } from "@/data-access/room";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { auth } from "@/auth";
import { redirect, useRouter } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/api/auth/signin");
  }
  try {
    const rooms = await getRooms(searchParams.search);

    return (
      <main className="flex min-h-screen flex-col p-16">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-4xl">Find Dev Room</h1>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
        <div className="mb-6 mt-[-7]">
          <SearchBar />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
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
