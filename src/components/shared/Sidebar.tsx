"use client";

import Link from "next/link";


export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-4">

      {/* Recent News */}
      <div className="bg-blue-600 rounded-md">
        <h3 className="bg-blue-700 px-4 py-2 text-white font-semibold rounded-t-md">
          Recent News
        </h3>
        <div className="bg-blue-600 text-white p-4 rounded-b-md">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <img 
                src="/images/profile-placeholder.jpg" 
                alt="Paul" 
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div>
                <Link href="/news/paul-reviews" className="text-blue-200 hover:underline font-medium">
                  Paul&apos;s Thursday Reviews CCCXCII
                </Link>
                <p className="text-blue-100 text-xs">PaulAsaran • 28 comments</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <img 
                src="/images/profile-placeholder.jpg" 
                alt="Paul" 
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div>
                <Link href="/news/paul-reviews-2" className="text-blue-200 hover:underline font-medium">
                  Paul&apos;s Thursday Reviews CCCXCI
                </Link>
                <p className="text-blue-100 text-xs">PaulAsaran • 57 comments</p>
              </div>
            </div>

            <div className="flex gap-3">
              <img 
                src="/images/profile-placeholder.jpg" 
                alt="Contest" 
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div>
                <Link href="/contest/cozy-glow" className="text-blue-200 hover:underline font-medium">
                  Cozy Glow Short Story Contest #6
                </Link>
                <p className="text-blue-100 text-xs">Wanderer D • 17 comments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Stories */}
      <div className="bg-blue-600 rounded-md">
        <h3 className="bg-blue-700 px-4 py-2 text-white font-semibold rounded-t-md">
          Popular Stories
        </h3>
        <div className="bg-blue-600 text-white p-4 rounded-b-md">
          <div className="space-y-2 text-sm">
            <div>
              <Link href="/story/day-at-faire" className="text-blue-200 hover:underline font-medium block">
                E A Day at the Faire
              </Link>
              <p className="text-blue-100 text-xs">
                Based on my experience at Renaissance Faires...with a lil embellishment.
              </p>
              <p className="text-blue-100 text-xs">Lotus Moon • 1.6k words • 28 views</p>
            </div>
            
            <div>
              <Link href="/story/deer-kitchen" className="text-blue-200 hover:underline font-medium block">
                E A Deer in the Kitchen
              </Link>
              <p className="text-blue-100 text-xs">Lotus Moon • 1.6k words • 28 views</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
