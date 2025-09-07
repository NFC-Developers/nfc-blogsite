import { Story } from "@/types/story";
import StoryCard from "./StoryCard";
import { useMemo } from "react";

export function StoryList({ title, stories }: { title: string; stories: Story[] }) {
  const safeStories = useMemo(() => stories || [], [stories]);

  const content = useMemo(
    () =>
      safeStories.map((story, index) => (
        <div key={index} className="mt-3">
          {/* Desktop: regular card; Mobile: compact card */}
          <div className="hidden sm:block">
            <StoryCard fetchData={false} {...story} />
          </div>
          <div className="block sm:hidden">
            <StoryCard fetchData={false} compact {...story} />
          </div>
        </div>
      )),
    [safeStories]
  );

  if (safeStories.length === 0) {
    return (
      <div className="flex-1">
        <div className="w-full bg-muted rounded-md pl-4 py-2 text-xl text-foreground">{title}</div>
        <div className="mt-4 space-y-3 animate-pulse">
          <div className="h-20 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="w-full bg-muted rounded-md pl-4 py-2 text-xl text-foreground">{title}</div>
      {content}
    </div>
  );
}

