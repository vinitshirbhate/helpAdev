import { TagList } from "@/components/TagsList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { splitTags } from "@/lib/utils";
import { Github } from "lucide-react";
import Link from "next/link";

export function RoomCard({ room }: { room: Room }) {
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
