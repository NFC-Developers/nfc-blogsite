export function getRatingColor(rating: string): string {
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

export function getTagColor(tagType: string): string {
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