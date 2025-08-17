import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  likes: number,
  dislikes: number
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
  return <a href={"/tag/"+encodeURIComponent(props.name)} className={`inline-block rounded-sm mr-1 text-white px-2 hover:underline ${getTagColor(props.type)}`}>{props.name}</a>
}

export function StoryCard(props: StoryCardProps) {
  const tagList = props.tags.map((tag,index)=><TagDisp key={index} name={tag.name} type={tag.type}/>);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className={`inline-block rounded-sm w-6 h-6 text-center leading-6 text-white ${getRatingColor(props.rating)}`}>{props.rating}</div>
          <a href={"/story/"+props.storyID} className="ml-3 font-bold text-lg hover:underline">{props.title}</a>
          <span className="ml-2 text-md text-gray-500">by <a href={"/user/"+props.authorID} className="hover:underline">{props.authorName}</a></span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tagList}
        <hr className="my-3"/>
        {props.summary}
      </CardContent>
      <CardFooter>
        <div className="rounded-sm bg-gray-100 w-full p-2 text-sm text-gray-800">
          {props.words} words • {props.views} views • {props.likes} likes • {props.dislikes} dislikes
        </div>
      </CardFooter>
    </Card>
  )
}

