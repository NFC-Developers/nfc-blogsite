import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function StoryHeader({ story }: { story: any }) {
  return (
    <div className="flex gap-4">
      <Image
        src={story.cover}
        alt={story.title}
        width={120}
        height={120}
        className="rounded-xl"
      />
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl font-bold">{story.title}</h1>
        <p className="text-muted-foreground">
          by {story.author?.name || "Unknown author"}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {story.tags.map((tag: any) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{story.summary}</p>
      </div>
    </div>
  );
}
