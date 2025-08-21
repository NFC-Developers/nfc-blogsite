export default function StoryContent({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none leading-relaxed">
      {content.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
