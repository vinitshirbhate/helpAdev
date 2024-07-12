import { getRoom } from "@/data-access/room";
import EditRoomForm from "./edit-room-form";

const page = async ({ params }: { params: { roomId: string } }) => {
  const room = await getRoom(params.roomId);
  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
};

export default page;
