import { useEffect, useState } from "react";
import { usePosts } from "./usePosts";

export function useHome() {
    const { messages, fetchPosts } = usePosts();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (messages.length === 0) {
            fetchPosts().then(()=>{
                setLoading(false);
            });
        }
    },[fetchPosts, messages.length]);

    // Parse only valid JSON messages. Some entries in `messages` may be error strings
    // like "Error fetch..." which would throw on JSON.parse — filter those out.
    const allStories = messages.flatMap(str => {
        try {
            return [JSON.parse(str)];
        } catch (e) {
            // ignore invalid JSON
            return [];
        }
    });

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

    return { getTop, getNewest, getLatestUpdate, loading };
}