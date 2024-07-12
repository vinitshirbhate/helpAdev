import { unstable_noStore } from "next/cache";
import CreateRoomForm from "./create-room-form";

const page = () => {
  unstable_noStore();
  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
};

export default page;
