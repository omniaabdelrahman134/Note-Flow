'use client';

import { AddNotes } from '@/actions/AddNote';
import { NewNote } from '@/types/NewNote';
import { useForm } from 'react-hook-form';

export default function AddNoteInput() {
  const { register, handleSubmit,reset } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });
  async function handleAddNote(values: NewNote) {
    const data = await AddNotes(values);
    
    console.log(data);
    reset()
  }

  return (
    <>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border-0 p-5 mb-6">
        {/* Purple Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-1.5 bg-purple-400 rounded-l-3xl"></div>

        <form onSubmit={handleSubmit(handleAddNote)} className="pl-3">
          <div className="space-y-4">
            {/* Title */}
            <input
              {...register('title')}
              type="text"
              placeholder="Note title..."
              className="w-full px-4 py-3 bg-purple-50/40 rounded-2xl border border-purple-100 
        focus:outline-none focus:ring-2 focus:ring-purple-400 
        placeholder:text-gray-400 font-semibold text-gray-800 transition"
            />

            {/* Content */}
            <textarea
              {...register('content')}
              placeholder="Write your thoughts here..."
              rows={3}
              className="w-full px-4 py-3 bg-purple-50/40 rounded-2xl border border-purple-100 
        focus:outline-none focus:ring-2 focus:ring-purple-400 
        resize-none text-gray-700 placeholder:text-gray-400 transition"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
              onClick={()=> reset()}
                type="button"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer px-5 py-2 text-sm font-semibold text-white bg-purple-400 
          hover:bg-purple-500 rounded-xl shadow-md transition-all duration-300"
              >
                Add Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
