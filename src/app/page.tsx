import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { database } from "@/db/database";
export default async function Home() {
  const items = await database.query.index.findMany();
  const session = await auth();
  if (!session?.user) return null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? <SignOut /> : <SignIn />}
      {session.user.name}
      <div>hello world</div>
      {items.map((item) => {
        return <div key={item.id}>{item.id}</div>;
      })}
    </main>
  );
}
