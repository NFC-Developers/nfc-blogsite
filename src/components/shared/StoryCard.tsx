import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Star, StarHalf} from "lucide-react";
import { getRatingColor, getTagColor } from "@/hooks/useStoryCard";
import { StoryCardProps, Tag } from "@/types/story";

function TagDisp(props: Tag) {
  const tagColor = getTagColor(props.type);
  return <Link 
  href={"/tag/"+encodeURIComponent(props.name)} 
  className={`inline-block rounded-sm mr-1 mb-1 text-white px-2 hover:underline ${tagColor}`}>
    {props.name}
  </Link>;
}

function StarRating({ stars }: { stars: number }) {
  const totalStars = 5;
  const roundedStars = Math.round(stars * 2) / 2; // nearest 0.5

  return (
    <div className="inline-flex align-text-top gap-0.5">
      {Array.from({ length: totalStars }).map((_, i) => {
        if (i + 1 <= roundedStars) {
          return <Star key={i} size={16} className="text-orange-500" fill="currentColor" />;
        } else if (i + 0.5 === roundedStars) {
          return <StarHalf key={i} size={16} className="text-orange-500" fill="currentColor" />;
        } else {
          return <Star key={i} size={16} className="text-gray-300" />;
        }
      })}
    </div>
  );
}

export function StoryCard(props: StoryCardProps & {large: boolean}) {
  const isLarge = props.large ?? true;
  const ratingColor = getRatingColor(props.rating);
  const tagList = props.tags.map((tag,index)=><TagDisp key={index} name={tag.name} type={tag.type}/>);
  const summary = props.summary.split("\n").map((str,index)=><span key={index}>{str}<br/></span>);
  return (
    <Card className={`w-full gap-1 ${isLarge ? "" : "text-sm"}`}>
      <CardHeader>
        <CardTitle>
          <div 
            className={
              `inline-block rounded-sm text-center text-white ${ratingColor} 
              ${isLarge ? "w-8 h-8 text-xl leading-8" : "w-6 h-6 text-base leading-6"}`
            }
          >
            {props.rating}
          </div>
          <Link
            href={"/story/"+props.storyID} 
            className={`hover:underline ${isLarge ? "ml-3 text-xl" : "ml-2 text-lg"}`}
          >
            {props.title}
          </Link>
          <span className={`text-gray-500 ${isLarge ? "ml-2 text-lg" : "ml-1 text-base"}`}>
            by
            <Link href={"/user/"+props.authorID} className="hover:underline ml-1">
              {props.authorName}
            </Link>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tagList}
        <hr className="my-3"/>
        {summary}
      </CardContent>
      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800">
          {props.words} words • {props.views} views • <StarRating stars={props.stars}/> {props.stars} stars
        </div>
      </CardFooter>
    </Card>
  );
}

