import { StoryCardProps } from "@/types/story";
import { StoryCard } from "./StoryCard";

export function StoryList({ title, stories, large }: { title: string, stories: StoryCardProps[], large: boolean }) {
  const content = stories.map(story =>
    <div key={story.storyID} className="mt-3">
        <StoryCard large={large} {...story}/>
    </div>
  );
  return (
    <div>
        <div className="w-full bg-gray-500 rounded-md pl-4 py-2 text-xl text-white">{title}</div>
        {content}
    </div>
  );
}

