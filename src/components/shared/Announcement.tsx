// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import StoryCardComponent from "@/components/shared/StoryCard";

// export function Announcement({ stories }: { stories: StoryCardProps[] }) {
//   const triggers = stories.map(story =>
//     <TabsTrigger 
//       key={story.storyID}
//       value={story.storyID.toString()}
//       className="inline-block w-full truncate"
//     >{story.title}</TabsTrigger>
//   );
//   const contents = stories.map(story =>
//     <TabsContent key={story.storyID} value={story.storyID.toString()}>
//       <StoryCardComponent {...story}/>
//     </TabsContent>
//   );
//   return (
//     <Tabs orientation="vertical" defaultValue={stories[0].storyID.toString()} className="flex-row">
//       <TabsList className="flex-col h-fit w-[200px]">
//         {triggers}
//       </TabsList>
//       {contents}
//     </Tabs>
//   );
// }

