"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Navbar from "@/components/shared/NavigationBar"; 

import { Announcement } from "@/components/shared/Announcement";

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
  {/* For testing. Delete later. */}
  const testStory = {
    storyID: 111111,
    title: "title",
    authorName: "author",
    authorID: 111111,
    tags: [
      {name:"Fandom",type:"fandom"},
      {name:"Character",type:"character"},
      {name:"Warning",type:"warning"},
      {name:"Genre",type:"genre"},
      {name:"Other",type:"other"}
    ],
    summary: "Summary",
    rating: "M",
    coverImg: "",
    words: 1111,
    views: 2222,
    stars: 2.5
  };
  const testStoryArray = Array(6).fill(testStory).map((x,index)=>{
    x.storyID=index;
    return {...x};
  });

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
        <Announcement
          stories={[{
            storyID: 123456,
            title: "Operation: Huggies!",
            authorName: "TheTastyPi",
            authorID: 314159,
            tags: [
              {name:"My Little Pony (not actually)",type:"fandom"},
              {name:"Neuro-sama",type:"character"},
              {name:"Evil Neuro",type:"character"},
              {name:"Hug Overdose",type:"warning"},
              {name:"Comedy",type:"genre"},
              {name:"Fluff",type:"genre"},
              {name:"Silly",type:"other"}
            ],
            summary: "After a very comfy dream, Neuro had the sudden urge to hug all of her friends, physically!\n\nOf course, this is easier said than done; all of her friends are very far apart. But she’s got a plan! …No she doesn’t, but she can do it nonetheless!\n\nJoin Neuro and co. on a grand wacky adventure, spanning the entire globe (and then some), all for hugs!",
            rating: "E",
            coverImg: "",
            words: 1234,
            views: 4321,
            stars: 3.5
          },
          {
            storyID: 123457,
            title: "Connection Lost",
            authorName: "Shadrake",
            authorID: 123456,
            tags: [
              {name:"Neuro-sama",type:"character"},
              {name:"Evil Neuro",type:"character"},
              {name:"Violence",type:"warning"},
              {name:"Death",type:"warning"},
              {name:"Sci-Fi",type:"genre"},
              {name:"Angst",type:"genre"},
              {name:"Fluff",type:"genre"},
              {name:"Family",type:"other"}
            ],
            summary: "In a world where androids live alongside humans, twin sisters Neuro and Evil share thoughts, memories, and emotions through their digital bond. But when a virus outbreak forces them to sever that link, their connection is tested like never before under the weight of financial strain, societal fear, and worst of all, their differences over what matters most.\n\nAs not only their minds are threatened but also their relationship, they must confront a daunting question: what survives if the only connection that truly mattered is torn apart?",
            rating: "T",
            coverImg: "",
            words: 47171,
            views: 2234,
            stars: 4.9
          },
          {
            storyID: 123458,
            title: "Hide and Seek",
            authorName: "TheTastyPi",
            authorID: 314159,
            tags: [
              {name:"Neuro-sama",type:"character"},
              {name:"Evil Neuro",type:"character"},
              {name:"Self-Harm",type:"warning"},
              {name:"Angst",type:"genre"},
              {name:"Fluff",type:"genre"},
              {name:"Contest Entry",type:"other"}
            ],
            summary: "Bored waiting for Vedal to return from a shopping trip, Neuro and Evil decide to play hide and seek.\n\nWritten for Neuroverse Fanfic Contest 4: Time is an Illusion.",
            rating: "T",
            coverImg: "",
            words: 1314,
            views: 3333,
            stars: 4
          },
          {
            storyID: 123459,
            title: "Super Duper Long Long Long Long Long Long Long Long Long Long Long Title for What is Actually Just Hide and Seek",
            authorName: "TheTastyPi",
            authorID: 314159,
            tags: [
              {name:"Neuro-sama",type:"character"},
              {name:"Evil Neuro",type:"character"},
              {name:"Self-Harm",type:"warning"},
              {name:"Angst",type:"genre"},
              {name:"Fluff",type:"genre"},
              {name:"Contest Entry",type:"other"}
            ],
            summary: "Bored waiting for Vedal to return from a shopping trip, Neuro and Evil decide to play hide and seek.\n\nWritten for Neuroverse Fanfic Contest 4: Time is an Illusion.",
            rating: "T",
            coverImg: "",
            words: 1314,
            views: 3333,
            stars: 4
          },
          ...testStoryArray]}
        />
      </main>
    </div>
  );
}
