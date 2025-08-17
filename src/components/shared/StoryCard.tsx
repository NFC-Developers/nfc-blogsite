import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

type StoryCardProps = {
  storyID: number,
  title: string,
  authorName: string,
  authorID: number,
  tags: Tag[],
  summary: string,
  rating: string,
  coverImg: string,
  words: number,
  views: number,
  stars: number
}

type Tag = {
  name: string,
  type: string
}

function getRatingColor(rating: string): string {
  switch (rating) {
    case "E":
      return "bg-green-500";
    case "T":
      return "bg-yellow-500";
    case "M":
      return "bg-red-500";
  }
  return "";
}

function getTagColor(tagType: string): string {
  switch (tagType) {
    case "fandom":
      return "bg-purple-600";
    case "warning":
      return "bg-orange-700";
    case "genre":
      return "bg-blue-600";
    case "character":
      return "bg-green-600";
    case "other":
      return "bg-gray-600";
  }
  return "";
}

function TagDisp(props: Tag) {
  const tagColor = getTagColor(props.type);
  return <Link 
  href={"/tag/"+encodeURIComponent(props.name)} 
  className={`inline-block rounded-sm mr-1 text-white px-2 hover:underline ${tagColor}`}>
    {props.name}
  </Link>;
}

export function StoryCard(props: StoryCardProps) {
  const ratingColor = getRatingColor(props.rating);
  const tagList = props.tags.map((tag,index)=><TagDisp key={index} name={tag.name} type={tag.type}/>);
  const summary = props.summary.split("\n").map((str,index)=><span key={index}>{str}<br/></span>);
  const gapSize = 0.2; // i cbb to get the actual gap size
  const totalGapSize = gapSize*(Math.ceil(props.stars)-1);
  const starPercent = ((props.stars+totalGapSize)/(5+gapSize*4)*100)+"%";
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className={`inline-block rounded-sm w-8 h-8 text-xl text-center leading-8 text-white ${ratingColor}`}>
            {props.rating}
          </div>
          <Link href={"/story/"+props.storyID} className="ml-3 font-bold text-xl hover:underline">
            {props.title}
          </Link>
          <span className="ml-2 text-lg text-gray-500">
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
          {props.words} words • {props.views} views •
          <span 
            className={"text-xl text-transparent m-1 bg-clip-text"}
            style={{backgroundImage: `linear-gradient(90deg, orange ${starPercent}, gray ${starPercent})`}}
          >
            ★★★★★
          </span>
          {props.stars} stars
        </div>
      </CardFooter>
    </Card>
  );
}

