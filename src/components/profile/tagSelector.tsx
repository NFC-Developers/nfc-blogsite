"use client";

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, Button, Switch } from "@/components/ui";
import { Check } from "lucide-react";
import { TagSelectorProps, Rating } from "@/types/post";

const categoryColors: Record<string, string> = {
  Genre: "bg-purple-100 text-purple-700",
  Theme: "bg-green-100 text-green-700",
  Characters: "bg-blue-100 text-blue-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function TagSelector({
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
}: TagSelectorProps) {
  const ratings: Rating[] = ["GENERAL", "TEEN", "MATURE"];

  const getTagStyle = (category: string) =>
    categoryColors[category] || categoryColors.Default;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          ➕ Add a New Tag
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter tag..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2 rounded flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />

          <select
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
            className="border p-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <Button type="button" onClick={addTag}>
            Add
          </Button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">
          ✅ Selected Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <div
              key={tag.name + tag.categoryName}
              className={`${getTagStyle(
                tag.categoryName
              )} px-2 py-1 rounded-full text-sm flex items-center gap-1`}
            >
              {tag.name} ({tag.categoryName})
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
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">
          🔍 Search Existing Tags
        </label>
        <Command className="border rounded-lg shadow-md">
          <CommandInput
            placeholder="Search tags..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {tags.length === 0 && <CommandEmpty>No tags found.</CommandEmpty>}
            <CommandGroup>
              {tags
                .filter((t) =>
                  t.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .slice(0, 5)
                .map((tag) => (
                  <CommandItem
                    key={tag.name + tag.categoryName}
                    onSelect={() => toggleTag(tag)}
                    className="flex items-center justify-between"
                  >
                    <span className={getTagStyle(tag.categoryName)}>
                      {tag.name} ({tag.categoryName})
                    </span>
                    {selectedTags.some(
                      (t) =>
                        t.name === tag.name &&
                        t.categoryName === tag.categoryName
                    ) && <Check className="ml-2 h-4 w-4" />}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label className="font-semibold text-sm">Content Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value as Rating)}
          className="border p-2 rounded"
        >
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        {rating === "MATURE" && (
          <div className="flex items-center gap-2 mt-2">
            <Switch
              id="explicit"
              checked={isExplicit}
              onCheckedChange={setIsExplicit}
            />
            <label htmlFor="explicit" className="text-sm">
              Explicit Content?
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
