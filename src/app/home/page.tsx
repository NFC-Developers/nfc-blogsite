"use client";

import { Announcement } from "@/components/shared/Announcement";
import { StoryList } from "@/components/shared/StoryList";
import { useHome } from "@/hooks/useHome";
import Navbar from "@/components/shared/NavigationBar";

export default function HomePage() {
	const { getTop } = useHome();
	const topStories = getTop();

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-pink-950 flex flex-col">
			{/* Navigation Bar */}
			<Navbar />

			{/* Main content layout: left sidebar for announcements, right for stories */}
			<main className="flex flex-row flex-1 w-full max-w-7xl mx-auto gap-6 pt-8 px-4">
				{/* Announcements sidebar (one row only) */}
				<aside className="w-[340px] min-w-[260px] max-w-[400px] bg-blue-800/80 dark:bg-blue-900/90 rounded-xl shadow-lg p-4 flex flex-col justify-start">
					<h2 className="text-xl font-bold text-pink-300 mb-4">Announcements</h2>
					{/* Render announcements in a single column layout suitable for sidebar */}
					<div className="flex flex-col gap-2">
						<Announcement stories={topStories} />
					</div>
				</aside>

				{/* Main stories list */}
				<section className="flex-1 bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 backdrop-blur-sm">
					<StoryList title="Top Stories" stories={topStories} />
				</section>
			</main>
		</div>
	);
}
