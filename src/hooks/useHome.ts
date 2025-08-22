import { useEffect } from "react";
import { usePosts } from "./usePosts";

export function useHome() {
    const { messages, fetchPosts } = usePosts();

    useEffect(()=>{
        if (messages.length === 0) fetchPosts()
    },[fetchPosts, messages.length]);

    const allStories = messages.map(str=>JSON.parse(str));

    function getTop() {
        return getNewest();
    }

    function getNewest() {
        return allStories.sort(story=>story.createdAt).slice(0,10);
    }

    function getLatestUpdate() {
        return getNewest();
    }

    return { getTop, getNewest, getLatestUpdate };
}
