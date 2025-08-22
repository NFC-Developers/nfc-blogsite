import { useEffect } from "react";
import { usePosts } from "./usePosts";

export function useHome() {
    const { messages, fetchPosts } = usePosts();

    useEffect(()=>{
        if (messages.length === 0) fetchPosts()
    },[fetchPosts, messages.length]);

    const allStories = messages.map(str=>JSON.parse(str));

    function strCompare(str1: string, str2: string) {
        if (str1 < str2) return -1;
        if (str1 > str2) return 1;
        return 0;
    }

    function getTop() {
        return getNewest();
    }

    function getNewest() {
        return allStories.sort((a,b)=>strCompare(b.createdAt, a.createdAt)).slice(0,10);
    }

    function getLatestUpdate() {
        return getNewest();
    }

    return { getTop, getNewest, getLatestUpdate };
}
