import { MessageSquare, ThumbsUp, Eye } from "lucide-react";

export default function StoryStats({
  stats = { likes: 0, comments: 0, views: 0 },
  published = "Unknown",
}: {
  stats?: { likes?: number; comments?: number; views?: number };
  published?: string;
}) {
  return (
    <div className="flex justify-between items-center border-b py-3 mb-4 text-sm">
      <span className="text-muted-foreground">Published {published}</span>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" /> {stats.likes ?? 0}
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" /> {stats.comments ?? 0}
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" /> {stats.views ?? 0}
        </div>
      </div>
    </div>
  );
}
