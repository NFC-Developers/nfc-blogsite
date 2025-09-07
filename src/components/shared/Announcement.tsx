import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Story } from "@/types/story";
import Image from "next/image";
import { useMemo } from "react";

export function Announcement({ stories }: { stories: Story[] }) {
  const safeStories = useMemo(() => stories || [], [stories]);

  if (safeStories.length === 0) {
    return (
      <div className="py-6">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-pink-200 dark:bg-pink-900 rounded" />
          <div className="h-40 bg-pink-100 dark:bg-pink-900 rounded" />
        </div>
      </div>
    );
  }

  // Render as a vertical list for the left sidebar layout
  return (
    <div className="w-full">
      <Tabs orientation="vertical" defaultValue={"0"} className="w-full">
        {/* Story titles list */}
        <TabsList className="flex-col h-fit w-full space-y-2 bg-transparent p-0">
          {safeStories.map((story, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="w-full text-left justify-start px-3 py-2 rounded-lg text-sm font-medium text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/50 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900 data-[state=active]:text-pink-800 dark:data-[state=active]:text-pink-200"
            >
              {story.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Story preview area */}
        <div className="mt-4">
          {safeStories.map((story, index) => (
            <TabsContent key={index} value={index.toString()} className="p-0 mt-0">
              <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 shadow-md border border-pink-100 dark:border-pink-900/50">
                <div className="flex flex-col gap-3">
                  {/* Story image */}
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center relative">
                    {(() => {
                      const imageSrc = ((story as unknown) as { image?: string }).image || "/images/profile-placeholder.jpg";
                      return (
                        <Image src={imageSrc} alt={story.title} fill className="object-cover" />
                      );
                    })()}
                  </div>
                  
                  {/* Story content */}
                  <div>
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-300 mb-2">{story.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                      {story.description || (story.content ? story.content.slice(0, 120) + '...' : '')}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Editors&apos; pick</span>
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Featured</span>
                      <span className="text-gray-500 dark:text-gray-400">{story.views ?? 0} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

