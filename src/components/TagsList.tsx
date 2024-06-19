import { room } from "@/db/schema";
import { Badge } from "./ui/badge";

// Function to split and trim languages string
export function splitTags(languages: string) {
  return languages.split(",").map((lang) => lang.trim());
}

// Component to display a list of language badges
export function TagList({ languages }: { languages: string[] }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {languages.map((lang) => (
        <Badge className="w-fit" key={lang}>
          {lang}
        </Badge>
      ))}
    </div>
  );
}
