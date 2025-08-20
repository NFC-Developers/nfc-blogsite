export type Tag = {
  name: string;
  type: string;
};

export type Author = {
  displayName: string;
  firebaseUid: string;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  tags: Tag[];
  rating: string;
  isExplicit: boolean;
  author: Author;
  coverImg?: string;
  words?: number;
  views?: number;
  stars?: number;
};

export interface UserStoriesListProps {
  userId: string;
}
