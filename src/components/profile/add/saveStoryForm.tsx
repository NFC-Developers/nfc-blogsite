"use client";
import { useTags } from "@/hooks/useTags";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TagSelector from "@/components/profile/tagSelector";
import { PostFormProps } from "@/types/post";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import RichTextEditor from "@/components/rich-text-editor";

export default function PostForm({ onSubmit }: PostFormProps) {
  const router = useRouter();
  const {
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
  } = useTags();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      setLoading(true); 
      await onSubmit(title, content, selectedTags, rating, isExplicit, description);
      
      setTitle("");
      setContent("");
      setDescription("");

      router.push("/home");  
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-w-[1000px] w-full border border-gray-300 shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Create your Story!</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded bg-white shadow-md"
        />
        <RichTextEditor value={content} onChange={setContent} />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded bg-white shadow-md h-20"
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Select Tags & Rating</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tags & Rating</DialogTitle>
            </DialogHeader>
            <TagSelector
              tags={tags}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              addTag={addTag}
              inputValue={inputValue}
              setInputValue={setInputValue}
              inputCategory={inputCategory}
              setInputCategory={setInputCategory}
              categories={categories}
              rating={rating}
              setRating={setRating}
              isExplicit={isExplicit}
              setIsExplicit={setIsExplicit}
            />
            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)}>
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          type="submit"
          variant="outline"
          className="max-w-[200px]"
          disabled={loading} 
        >
          {loading ? "Adding..." : "Add Post"}
        </Button>
      </form>
    </div>
  );
}
