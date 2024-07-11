import { auth } from "@/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function AccountDropDown() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
          {session?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session?.user ? (
          <>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <SignIn />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = async () => {
  const session = await auth();

  return (
    <header className=" bg-gray-200 py-4 dark:bg-gray-800 px-24">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-4 text-xl hover:underline"
        >
          <Image width="40" height="40" src="/help_a_dev.png" alt="" />
          HelpADev
        </Link>
        <div className="flex flex-row justify-between items-center gap-2">
          <AccountDropDown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
