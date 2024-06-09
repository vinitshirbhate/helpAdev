import { auth } from "@/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

const Header = async () => {
  const session = await auth();
  return (
    <header>
      <div className="flex flex-row justify-between">
        <ModeToggle />

        {session?.user ? (
          <>
            <div>{session.user.name}</div>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
};

export default Header;
