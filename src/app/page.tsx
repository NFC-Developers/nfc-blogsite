"use client";

import Image from "next/image";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Navbar from "@/components/shared/NavigationBar"; 
import { StoryCard } from "@/components/shared/StoryCard";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) return;

    try {
      const docRef = await addDoc(collection(db, "testPosts"), {
        title,
        content,
        createdAt: new Date(),
      });

      setMessages((prev) => [
        ...prev,
        `Document added with ID: ${docRef.id}`,
      ]);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, `Error: ${error}`]);
    }
  };

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testPosts"));
      const docs: string[] = [];
      querySnapshot.forEach((doc) => {
        docs.push(`${doc.id}: ${JSON.stringify(doc.data())}`);
      });
      setMessages(docs);
    } catch (error) {
      console.error(error);
      setMessages([`Error fetching: ${error}`]);
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1 p-8 sm:p-20 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Firestore Test Form</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md w-full"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Firestore
          </button>
        </form>

        <button
          onClick={fetchPosts}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-max"
        >
          Fetch Posts
        </button>

        <div className="flex flex-col gap-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-gray-100 p-2 rounded break-words text-red-500"
            >
              {msg}
            </div>
          ))}
        </div>
        {/* For testing purposes. Remove later. */}
        <StoryCard 
          storyID={123456}
          title={"Operation: Huggies!"} 
          authorName={"TheTastyPi"}
          authorID={314159}
          tags={[
            {name:"My Little Pony (not actually)",type:"fandom"},
            {name:"Neuro-sama",type:"character"},
            {name:"Evil Neuro",type:"character"},
            {name:"Hug Overdose",type:"warning"},
            {name:"Comedy",type:"genre"},
            {name:"Fluff",type:"other"}
          ]} 
          summary={"After a very comfy dream, Neuro had the sudden urge to hug all of her friends, physically!\n\nOf course, this is easier said than done; all of her friends are very far apart. But she’s got a plan! …No she doesn’t, but she can do it nonetheless!\n\nJoin Neuro and co. on a grand wacky adventure, spanning the entire globe (and then some), all for hugs!"} 
          rating={"E"} 
          coverImg={""} 
          words={1234} 
          views={4321} 
          stars={3.5}
        />
      </main>
    </div>
  );
}
