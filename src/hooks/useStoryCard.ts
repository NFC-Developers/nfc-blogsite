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