"use client";

import Link from "next/link";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { ChevronDown, Heart, HelpCircle } from "lucide-react";

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
            <button className="flex items-center gap-1 rounded-md bg-muted px-3 py-1 text-foreground hover:bg-muted/80">
              <span>Browse</span>
              <ChevronDown size={16} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full sm:w-[420px] p-0 bg-background text-foreground">
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="text-left">Browse</SheetTitle>
            </SheetHeader>

            <div className="h-[calc(100dvh-3.25rem)] overflow-y-auto p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="genres" className="border-b border-border">
                  <AccordionTrigger className="text-primary hover:no-underline">Genres</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      {GENRES.map((g) => (
                        <li key={g}>
                          <SheetClose asChild>
                            <Link href={`/genres/${g.toLowerCase().replace(/\s+/g,"-")}`} className="block rounded px-2 py-1 hover:bg-muted">
                              {g}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lists" className="border-b border-border">
                  <AccordionTrigger className="text-primary hover:no-underline">Story Lists</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      {STORY_LISTS.map((l) => (
                        <li key={l}>
                          <SheetClose asChild>
                            <Link href={`/stories/${l.toLowerCase().replace(/\s+/g,"-")}`} className="block rounded px-2 py-1 hover:bg-muted">
                              {l}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tags" className="border-b border-border">
                  <AccordionTrigger className="text-primary hover:no-underline">Tag Directory</AccordionTrigger>
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
                            <Link href={href} className="block rounded px-2 py-1 hover:bg-muted">
                              {label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support">
                  <AccordionTrigger className="text-destructive hover:no-underline">Support</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <Button className="w-full bg-destructive hover:bg-destructive/90">
                        <Heart className="mr-2 h-4 w-4" /> Donate
                      </Button>
                      <Button variant="outline" className="w-full">
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
            <button className="flex items-center gap-1 rounded-md bg-muted px-3 py-1 text-foreground hover:bg-muted/80">
              <span>Browse</span>
              <ChevronDown size={16} />
            </button>
          </DialogTrigger>

          <DialogContent className="!max-w-3xl w-[90vw] bg-background text-foreground border border-border shadow-xl rounded-xl p-8">
            <DialogTitle className="text-2xl font-semibold mb-4">Browse</DialogTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="mb-3 border-b border-border pb-1 text-lg font-semibold text-primary">Genres</h3>
                <ul className="space-y-2 text-sm">
                  {GENRES.map((g) => (
                    <li key={g}>
                      <Link href={`/genres/${g.toLowerCase().replace(/\s+/g,"-")}`} className="hover:text-primary">
                        {g}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-border pb-1 text-lg font-semibold text-primary">Story Lists</h3>
                <ul className="space-y-2 text-sm">
                  {STORY_LISTS.map((l) => (
                    <li key={l}>
                      <Link href={`/stories/${l.toLowerCase().replace(/\s+/g,"-")}`} className="hover:text-primary">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 border-b border-border pb-1 text-lg font-semibold text-primary">Tag Directory</h3>
                <ul className="mb-6 space-y-2 text-sm">
                  <li><Link href="/tags" className="hover:text-primary">All Tags</Link></li>
                  <li><Link href="/tags/popular" className="hover:text-primary">Popular Tags</Link></li>
                  <li><Link href="/tags/series" className="hover:text-primary">Series</Link></li>
                  <li><Link href="/tags/characters" className="hover:text-primary">Characters</Link></li>
                </ul>

                <h3 className="mb-3 border-b border-border pb-1 text-lg font-semibold text-primary">Neuro</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/news" className="hover:text-primary">News Archive</Link></li>
                  <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                  <li><Link href="/staff" className="hover:text-primary">Staff</Link></li>
                </ul>
              </div>

              <div className="flex flex-col">
                <h3 className="mb-3 border-b border-border pb-1 text-lg font-semibold text-destructive">Support Us</h3>
                <p className="mb-4 text-sm text-muted-foreground">Help us improve and keep the platform running.</p>
                <Button className="mb-3 bg-destructive hover:bg-destructive/90">
                  <Heart className="mr-2 h-4 w-4" /> Donate
                </Button>
                <Button variant="outline">
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
