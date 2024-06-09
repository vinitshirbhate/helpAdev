import { signIn } from "@/auth";
import { LogInIcon, LogOutIcon } from "lucide-react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        className="flex text-lg items-center justify-center gap-1"
        type="submit"
      >
        <LogInIcon />
        Signin with Google
      </button>
    </form>
  );
}
