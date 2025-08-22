import DOMPurify from 'dompurify';

export default function StoryContent({ content }: { content: string }) {
  const safeContent = DOMPurify.sanitize(content);
  return (
    <div
      className="prose dark:prose-invert max-w-full leading-relaxed"
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
}
