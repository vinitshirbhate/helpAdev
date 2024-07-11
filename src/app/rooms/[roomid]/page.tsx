import { getRoom } from "@/data-access/room";
import { Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TagList, splitTags } from "@/components/TagsList";
import { HelpADevVideoPlayer } from "./video-player";
import { auth } from "@/auth";

export default async function page(props: any) {
  const session = await auth();
  if (!session || !session.user) {
    return;
  }
  const userId = session.user.id;
  if (!userId) {
    return;
  }
  const roomId = props.params.roomid;
  const room = await getRoom(roomId);
  if (!room) {
    return <div>No Room Found</div>;
  }

  return (
    <div className="grid grid-cols-4 ">
      <div className="col-span-3 p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <HelpADevVideoPlayer room={room} userId={userId} />
        </div>
      </div>
      <div className="col-span-1 p-4 ">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex-col flex gap-2">
          <h1 className="text-base">{room?.name}</h1>
          <p className="text-base text-gray-600">{room?.description}</p>
          <TagList languages={splitTags(room.language)} />
          <div>
            {room?.githubRepo && (
              <Link
                href={room.githubRepo}
                className="flex gap-2 items-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                Github Repo
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
