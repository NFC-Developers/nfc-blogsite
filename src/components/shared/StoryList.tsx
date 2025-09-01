import { Story } from "@/types/story";
import StoryCard from "./StoryCard";

export function StoryList({ title, stories }: { title: string, stories: Story[] }) {
  const content = stories.map((story,index) => (
    <div key={index} className="mb-4">
        <StoryCard fetchData={false} {...story}/>
    </div>
  ));

  return (
    <div className="flex-1">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-md border-l-4 border-blue-800">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="bg-white border border-gray-300 border-t-0 rounded-b-md p-4">
        {content.length > 0 ? (
          content
        ) : (
          <p className="text-gray-500 text-center py-8">No stories found</p>
        )}
      </div>
    </div>
  );
}

