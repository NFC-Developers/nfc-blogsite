"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Check } from "lucide-react";

interface PostFormProps {
  onSubmit: (title: string, content: string, tags: string[], isMature: boolean) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([
    "Adventure",
    "Romance",
    "Mystery",
    "Comedy",
    "Horror",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isMature, setIsMature] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags((prev) => [...prev, inputValue]);
      toggleTag(inputValue);
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit(title, content, selectedTags, isMature);
    setTitle("");
    setContent("");
    setSelectedTags([]);
    setIsMature(false);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-w-[1000px] w-full border border-gray-300 shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Create your Story!</h1>
        <input
          type="text"
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded bg-white shadow-md"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded bg-white shadow-md h-40"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Select Tags</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Select Tags for Your Story</DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <Command className="mt-4 border rounded-lg shadow-md">
              <CommandInput
                placeholder="Search or create tag..."
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <CommandList>
                {tags.length === 0 && <CommandEmpty>No tags found.</CommandEmpty>}
                <CommandGroup>
                  {tags
                    .filter((tag) =>
                      tag.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .slice(0, 6)
                    .map((tag) => (
                      <CommandItem
                        key={tag}
                        onSelect={() => toggleTag(tag)}
                        className="flex items-center justify-between"
                      >
                        {tag}
                        {selectedTags.includes(tag) && <Check className="ml-2 h-4 w-4" />}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>

            <div className="flex items-center gap-2 mt-4">
          <Switch
            id="mature-content"
            checked={isMature}
            onCheckedChange={setIsMature}
          />
          <label htmlFor="mature-content" className="text-sm">
            Mature Content?
          </label>
        </div>
            <DialogFooter>
              <Button onClick={() => console.log(selectedTags)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button type="submit" variant="add" className="max-w-[200px]">
          Add Post
        </Button>
      </form>
    </div>
  );
}

test eslint