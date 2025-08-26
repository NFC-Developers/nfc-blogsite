import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import StoryCard from "./StoryCard";
import { Story } from "@/types/story";

export function Announcement({ stories }: { stories: Story[] }) {
  const triggers = stories.map((story,index) =>
    <TabsTrigger 
      key={index}
      value={index.toString()}
      className="inline-block w-full truncate"
    >{story.title}</TabsTrigger>
  );
  const contents = stories.map((story,index) =>
    <TabsContent key={index} value={index.toString()}>
      <StoryCard fetchData={false} {...story}/>
    </TabsContent>
  );
  return (
    <Tabs orientation="vertical" defaultValue={"0"} className="hidden sm:flex flex-row">
      <TabsList className="flex-col h-fit w-[200px]">
        {triggers}
      </TabsList>
      {contents}
    </Tabs>
  );
}

