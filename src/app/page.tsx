
import { GetNotes } from "@/actions/GetNotes";
import AddNoteInput from "@/components/AddNoteInput";
import EditNoteModal from "@/components/EditNoteModal";
import NoteCard from "@/components/NoteCard";
import Sidebar from "@/components/Sidebar";
import { Note } from "@/types/noteCardType";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const Notes = await GetNotes();

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full p-4 pt-20 md:pt-8 md:p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            My Notes
          </h1>
          <p className="text-sm md:text-base text-slate-500">
            Manage your notes here
          </p>
        </div>

        {/* Add Note Input */}
        <AddNoteInput />

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {Notes?.map((n) => (
            <NoteCard noteInfo={n} key={n._id} />
          ))}
        </div>
      </main>

      {/* Edit Modal */}
      {edit && <EditNoteModal editedId={edit} />}
    </div>
  );
}
