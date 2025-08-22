export function getRatingColor(rating: string): string {
  switch (rating) {
    case "GENERAL":
      return "bg-green-500";
    case "TEEN":
      return "bg-yellow-500";
    case "MATURE":
      return "bg-red-500";
  }
  return "";
}

export function getTagColor(categoryId: string): string {
  // Placeholder. Would need to use the id to find the color, but currently, color is not stored in the databse.
  const tagType = categoryId;
  switch (tagType) {
    case "fandom":
      return "bg-purple-600";
    case "warning":
      return "bg-orange-700";
    case "genre":
      return "bg-blue-600";
    case "character":
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
}

// there were a bunch of edge cases with the simple split() word count, so I made this
export function getWordCount(str: string|undefined) {
  if (!str) return 0;
  let count = 0;
  let depth = 0;
  let prevSpace = true;
  let space = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    space = false;
    switch (true) {
      case (char === "<"):
        space = true;
        depth++;
        break;
      case (char === ">" && depth > 0):
        space = true;
        depth--;
        break;
      case (depth !== 0 || /\s/.test(char)):
        space = true;
        break;
    }
    if (!space && prevSpace) count++
    prevSpace = space;
  }
  return count;
}