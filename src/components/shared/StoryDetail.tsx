"use client";
import React from "react";
import type { Story } from "../../types/story";

export default function StoryDetail({ story }: { story: Story }) {
  const tags = story.tags || [];

  return (
    <article className="max-w-3xl mx-auto bg-card backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-foreground">{story.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">By {story.author?.displayName || story.author?.firebaseUid || 'Unknown'} • {new Date(story.createdAt).toLocaleDateString()}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span key={i} className="inline-block bg-primary text-primary-foreground text-sm px-2 py-1 rounded">{t.name}</span>
          ))}
        </div>
      </header>

      <section className="prose dark:prose-invert max-w-none text-foreground">
        {/* If story.content is HTML or rich text, render safely. We'll assume plain HTML for now. */}
        <div dangerouslySetInnerHTML={{ __html: story.content || story.description || "" }} />
      </section>

      <footer className="mt-6 text-sm text-muted-foreground">
        <div>Views: {story.views ?? 0} • Stars: {story.stars ?? 0}</div>
      </footer>
    </article>
  );
}
