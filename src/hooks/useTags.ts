import { useState } from "react";
import { Tag, Rating } from "@/types/post";

export function useTags(initialTags: Tag[] = []) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputCategory, setInputCategory] = useState<Tag["categoryName"]>("Genre");
  const [rating, setRating] = useState<Rating>("GENERAL");
  const [isExplicit, setIsExplicit] = useState(false);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some(t => t.name === tag.name && t.categoryName === tag.categoryName)
        ? prev.filter(t => t.name !== tag.name || t.categoryName !== tag.categoryName)
        : [...prev, tag]
    );
  };

  const addTag = () => {
    if (!inputValue) return;

    const exists = tags.some(t => t.name === inputValue && t.categoryName === inputCategory);
    if (!exists) {
      const newTag: Tag = { name: inputValue, categoryName: inputCategory };
      setTags([...tags, newTag]);
      toggleTag(newTag);
      setInputValue("");
    }
  };

  const categories: Tag["categoryName"][] = ["Genre", "Characters", "Theme", "Other"];

  return {
    tags,
    selectedTags,
    toggleTag,
    addTag,
    inputValue,
    setInputValue,
    inputCategory,
    setInputCategory,
    categories,
    rating,
    setRating,
    isExplicit,
    setIsExplicit,
  };
}
