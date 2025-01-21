import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export function MySheet({ wordsData }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-white text-black link hover:bg-blue-200">
          show words of current chapter
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          {wordsData.map((word, i) => (
            <SheetDescription className="text-black" key={i}>
              {word.word}
            </SheetDescription>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
