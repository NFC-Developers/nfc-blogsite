export type StoryCardProps = {
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

export type Tag = {
  name: string,
  type: string
}