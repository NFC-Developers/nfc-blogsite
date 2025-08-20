import { Star } from "lucide-react";
import { useState } from "react";

export function InteractiveStarRating({ rating }: { rating: number }) {
  const totalStars = 5;
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const starsArray = Array.from({ length: totalStars }, (_, i) => i + 1); 

  return (
    <div className="inline-flex gap-0.5">
      {starsArray.map((i) => {
        const starValue = i / 2;
        const isFilled = displayRating >= starValue;
        return (
          <Star
            key={i}
            size={16}
            fill={isFilled ? "currentColor" : "none"}
            stroke={isFilled ? "currentColor" : "#d1d5db"} 
            className={`text-yellow-400 cursor-pointer`}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => console.log("Selected rating:", starValue)}
          />
        );
      })}
    </div>
  );
}
