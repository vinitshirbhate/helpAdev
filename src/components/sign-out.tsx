import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        className="flex text-lg items-center justify-center gap-1"
        type="submit"
      >
        <LogOutIcon />
        Sign Out
      </button>
    </form>
  );
}
