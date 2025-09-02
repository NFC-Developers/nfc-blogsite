import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import StoryCard from "./StoryCard";
import { Story } from "@/types/story";
import { useMemo } from "react";

export function Announcement({ stories }: { stories: Story[] }) {
  const safeStories = useMemo(() => stories || [], [stories]);

  // Memoize mapped items to avoid remapping on each render.
  const triggers = useMemo(
    () =>
      safeStories.map((story, index) => (
        <TabsTrigger key={index} value={index.toString()} className="inline-block w-full truncate">
          {story.title}
        </TabsTrigger>
      )),
    [safeStories]
  );

  const contents = useMemo(
    () =>
      safeStories.map((story, index) => (
        <TabsContent key={index} value={index.toString()}>
          <StoryCard fetchData={false} {...story} />
        </TabsContent>
      )),
    [safeStories]
  );

  // On very small screens render a simplified stacked view.
  if (safeStories.length === 0) {
    return (
      <div className="py-6">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden sm:flex flex-row">
        <Tabs orientation="vertical" defaultValue={"0"} className="flex-1">
          <TabsList className="flex-col h-fit w-[200px]">{triggers}</TabsList>
          {contents}
        </Tabs>
      </div>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden space-y-3">
        {safeStories.map((s, i) => (
          <StoryCard key={i} fetchData={false} compact {...s} />
        ))}
      </div>
    </div>
  );
}

