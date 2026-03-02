'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Note } from '@/types/noteCardType';
import Link from 'next/link';
import { DeleteNote } from '@/actions/DeleteNote';

export default function NoteCard({ noteInfo }: { noteInfo: Note }) {

  async function HandleDelete(id: string) {
    const res = await DeleteNote(id);
    console.log(res);
  }

  return (
    <Card className="group relative rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 p-4 md:p-5">

      {/* Purple Accent Bar */}
      <div className="absolute top-0 left-0 h-full w-1.5 bg-purple-400 rounded-l-3xl"></div>

      {/* Content */}
      <div className="pl-3 space-y-3">

        {/* Title */}
        <p className="text-slate-600 text-sm line-clamp-3">
          {noteInfo.title}
        </p>

        {/* Content */}
        <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-3">
          {noteInfo.content}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">

          {/* Date */}
          <span className="text-xs text-gray-400 break-words">
            {noteInfo._createdAt}
          </span>

          {/* Actions */}
          <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
            
            <Link href={`?edit=${noteInfo._id}`}>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-purple-100 cursor-pointer hover:text-purple-500 rounded-full"
              >
                <Pencil size={16} />
              </Button>
            </Link>

            <Button
              onClick={() => HandleDelete(noteInfo._id)}
              size="icon"
              variant="ghost"
              className="hover:bg-red-100 cursor-pointer hover:text-red-500 rounded-full"
            >
              <Trash2 size={16} />
            </Button>

          </div>
        </div>

      </div>
    </Card>
  );
}