import { Author } from "./story";

export interface BlogCardProp {
    id: string;
    title: string;
    createdAt: string;
    views: number;
    author: Author;
    content: string;
}