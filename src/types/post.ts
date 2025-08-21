export type Rating = "GENERAL" | "TEEN" | "MATURE";

export interface Tag {
  name: string;
  categoryName: string; 
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags?: Tag[];
  rating?: Rating;
  isExplicit?: boolean;
  description?: string;
  createdAt?: string;
}

export interface TagSelectorProps {
  tags: Tag[];
  selectedTags: Tag[];
  toggleTag: (tag: Tag) => void;
  addTag: () => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  inputCategory: Tag["categoryName"];
  setInputCategory: (cat: Tag["categoryName"]) => void;
  categories: Tag["categoryName"][];
  rating: Rating;
  setRating: (rating: Rating) => void;
  isExplicit: boolean;
  setIsExplicit: (val: boolean) => void;
}

export interface PostFormProps {
  onSubmit: (
    title: string,
    content: string,
    selectedTags: Tag[],
    rating: Rating,
    isExplicit: boolean,
    description?: string
  ) => Promise<void>;
}
