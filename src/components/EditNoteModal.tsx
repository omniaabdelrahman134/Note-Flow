'use client';
import { UpdateNote } from '@/actions/UpdateNote';
import { NewNote } from '@/types/NewNote';
import { Note } from '@/types/noteCardType';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditNoteModal({ editedId }: { editedId: string }) {
  const router = useRouter();

  async function handleEditForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const titleInput = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
  const contentInput = (e.currentTarget.elements.namedItem('content') as HTMLTextAreaElement).value;

  const values: NewNote = {
    title: titleInput,
    content: contentInput,
  };

  try {
    const data = await UpdateNote(values, editedId);
    console.log('Updated note:', data);
    router.push('/');
  } catch (error) {
    console.error(error);
    alert('Failed to update note');
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border-0">
        <div className="absolute top-0 left-0 h-full w-1.5 bg-purple-400 rounded-l-3xl"></div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-3">Edit Note</h2>

        <form onSubmit={handleEditForm} className="space-y-5 pl-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Note title"
              className="w-full px-4 py-3 bg-purple-50/40 rounded-2xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              rows={4}
              placeholder="Note content"
              className="w-full px-4 py-3 bg-purple-50/40 rounded-2xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/">
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Cancel</button>
            </Link>

            <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-purple-400 hover:bg-purple-500 rounded-xl shadow-md">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}