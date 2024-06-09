import { database } from "@/db/database";

export default async function Home() {
  try {
    const rooms = await database.query.room.findMany();

    return (
      <main className="flex min-h-screen flex-row items-center justify-between p-24">
        {rooms.map((room) => (
          <div key={room.name}>{room.name}</div>
        ))}
        <div>hello world</div>
      </main>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return (
      <div className="flex  flex-col items-center justify-between p-24">{`Something went wrong${error}`}</div>
    );
  }
}
