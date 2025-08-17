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
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className={`inline-block rounded-sm w-6 h-6 text-center leading-6 text-white ${ratingColor}`}>
            {props.rating}
          </div>
          <Link href={"/story/"+props.storyID} className="ml-3 font-bold text-lg hover:underline">
            {props.title}
          </Link>
          <span className="ml-2 text-md text-gray-500">
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
        {props.summary}
      </CardContent>
      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800">
          {props.words} words • {props.views} views • {props.stars} stars
        </div>
      </CardFooter>
    </Card>
  );
}

