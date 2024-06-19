import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Github } from "lucide-react";
import { getRooms } from "@/data-access/room";
import { TagList, splitTags } from "@/components/TagsList";
function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex gap-2 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            Github Repo
          </Link>
        )}
        <div className="mt-3">
          <TagList languages={splitTags(room.language)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.userId}`}> Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default async function Home() {
  try {
    const rooms = await getRooms();
    return (
      <main className="flex min-h-screen flex-col p-16">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-4xl">Find Dev Room</h1>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.userId} room={room} />
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
