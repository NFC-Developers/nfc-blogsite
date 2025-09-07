import { useEffect, useState } from "react";
import { usePosts } from "./usePosts";
import type { Story } from "@/types/story";

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

    // Some entries in `messages` may be plain text error messages (not JSON).
    // Parse only valid JSON strings and skip anything that fails to parse.
    const allStories: Story[] = messages
        .map((str) => {
            try {
                return JSON.parse(str) as Story;
            } catch {
                return null;
            }
        })
        .filter((s): s is Story => s !== null);

    function strCompare(str1: string, str2: string) {
        if (str1 < str2) return -1;
        if (str1 > str2) return 1;
        return 0;
    }

    function getTop() {
        return getNewest();
    }

    function getNewest() {
        // don't mutate original array when sorting
        return [...allStories]
            .sort((a, b) =>
                strCompare(String(b.createdAt || ""), String(a.createdAt || ""))
            )
            .slice(0, 10);
    }

    function getLatestUpdate() {
        return getNewest();
    }

    return { getTop, getNewest, getLatestUpdate, loading };
}