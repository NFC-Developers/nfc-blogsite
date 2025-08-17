"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const GENRES = [
  "Romance","Adventure","Drama","Mystery","Sad","Slice of Life","Tragedy",
  "Crossover","Dark","Comedy","Horror","Probably more tags",
];

const STORY_LISTS = [
  "What's Hot?","Top - All Time","Top - This Week","Longest","Most Comments",
  "Latest Updates","Top - Today","Completed","Most Viewed",
];

export default function BrowseDialog() {
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-1 rounded-md bg-gray-800 px-3 py-1 text-gray-200 hover:bg-gray-700">
              <span>Browse</span>
              <ChevronDown size={16} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full sm:w-[420px] p-0 bg-gray-900 text-gray-100">
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="text-left">Browse</SheetTitle>
            </SheetHeader>

            <div className="h-[calc(100dvh-3.25rem)] overflow-y-auto p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="genres" className="border-b border-gray-800">
                  <AccordionTrigger className="text-blue-400 hover:no-underline">Genres</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      {GENRES.map((g) => (
                        <li key={g}>
                          <SheetClose asChild>
                            <Link href={`/genres/${g.toLowerCase().replace(/\s+/g,"-")}`} className="block rounded px-2 py-1 hover:bg-gray-800">
                              {g}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lists" className="border-b border-gray-800">
                  <AccordionTrigger className="text-green-400 hover:no-underline">Story Lists</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      {STORY_LISTS.map((l) => (
                        <li key={l}>
                          <SheetClose asChild>
                            <Link href={`/stories/${l.toLowerCase().replace(/\s+/g,"-")}`} className="block rounded px-2 py-1 hover:bg-gray-800">
                              {l}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tags" className="border-b border-gray-800">
                  <AccordionTrigger className="text-purple-400 hover:no-underline">Tag Directory</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        ["All Tags","/tags"],
                        ["Popular Tags","/tags/popular"],
                        ["Series","/tags/series"],
                        ["Characters","/tags/characters"],
                      ].map(([label, href]) => (
                        <li key={href}>
                          <SheetClose asChild>
                            <Link href={href} className="block rounded px-2 py-1 hover:bg-gray-800">
                              {label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support">
                  <AccordionTrigger className="text-red-400 hover:no-underline">Support</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <Button className="w-full bg-red-500 hover:bg-red-600">
                        <Heart className="mr-2 h-4 w-4" /> Donate
                      </Button>
                      <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                        <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 rounded-md bg-gray-800 px-3 py-1 text-gray-200 hover:bg-gray-700">
              <span>Browse</span>
              <ChevronDown size={16} />
            </button>
          </DialogTrigger>

          <DialogContent className="!max-w-3xl w-[90vw] bg-gray-900 text-gray-200 border border-gray-700 shadow-xl rounded-xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="mb-3 border-b border-gray-700 pb-1 text-lg font-semibold text-blue-400">Genres</h3>
                <ul className="space-y-2 text-sm">
                  {GENRES.map((g) => (
                    <li key={g}>
                      <Link href={`/genres/${g.toLowerCase().replace(/\s+/g,"-")}`} className="hover:text-blue-400">
                        {g}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-gray-700 pb-1 text-lg font-semibold text-green-400">Story Lists</h3>
                <ul className="space-y-2 text-sm">
                  {STORY_LISTS.map((l) => (
                    <li key={l}>
                      <Link href={`/stories/${l.toLowerCase().replace(/\s+/g,"-")}`} className="hover:text-green-400">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-gray-700 pb-1 text-lg font-semibold text-purple-400">Tag Directory</h3>
                <ul className="mb-6 space-y-2 text-sm">
                  <li><Link href="/tags" className="hover:text-purple-400">All Tags</Link></li>
                  <li><Link href="/tags/popular" className="hover:text-purple-400">Popular Tags</Link></li>
                  <li><Link href="/tags/series" className="hover:text-purple-400">Series</Link></li>
                  <li><Link href="/tags/characters" className="hover:text-purple-400">Characters</Link></li>
                </ul>

                <h3 className="mb-3 border-b border-gray-700 pb-1 text-lg font-semibold text-yellow-400">Neuro</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/news" className="hover:text-yellow-400">News Archive</Link></li>
                  <li><Link href="/faq" className="hover:text-yellow-400">FAQ</Link></li>
                  <li><Link href="/staff" className="hover:text-yellow-400">Staff</Link></li>
                </ul>
              </div>

              <div className="flex flex-col">
                <h3 className="mb-3 border-b border-gray-700 pb-1 text-lg font-semibold text-red-400">Support Us</h3>
                <p className="mb-4 text-sm text-gray-400">Help us improve and keep the platform running.</p>
                <Button className="mb-3 bg-red-500 hover:bg-red-600">
                  <Heart className="mr-2 h-4 w-4" /> Donate
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-400">
                  <HelpCircle className="mr-2 h-4 w-4" /> Support
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
