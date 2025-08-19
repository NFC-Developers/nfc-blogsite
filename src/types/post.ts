export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags?: string[]; 
  isMature?: boolean;  
  createdAt?: string;    
}
