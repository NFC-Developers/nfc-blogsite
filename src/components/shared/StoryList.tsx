import { Story } from "@/types/story";
import StoryCard from "./StoryCard";

export function StoryList({ title, stories, large }: { title: string, stories: Story[], large?: boolean }) {
  const content = stories.map((story,index) =>
    <div key={index} className="mt-3">
        <StoryCard large={large} {...story}/>
    </div>
  );
  return (
    <div className="flex-1">
        <div className="w-full bg-gray-500 rounded-md pl-4 py-2 text-xl text-white">{title}</div>
        {content}
    </div>
  );
}

