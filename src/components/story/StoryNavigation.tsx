import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StoryNavigation() {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline" className="flex items-center gap-2">
        <ChevronLeft className="w-4 h-4" /> Previous
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        Next <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
