"use client";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function TagList({ languages }: { languages: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-3 flex-wrap">
      {languages.map((tag) => (
        <Badge
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
          className="w-fit cursor-pointer"
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
