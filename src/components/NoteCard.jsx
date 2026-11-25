function NoteCard({
  note,
  deleteNote,
  editNote,
  toggleArchive,
}) {
  const colors = {
    yellow: "bg-yellow-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    pink: "bg-pink-200",
  };

  return (
    <div
      className={`${colors[note.color]} p-4 rounded-lg shadow`}
    >

      {/* Title */}
      {note.title && (
        <h2 className="text-xl font-bold">
          {note.title}
        </h2>
      )}


      {/* Content */}
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">
        {note.content}
      </p>


      {/* Dates */}
      <div className="text-xs text-gray-600 mt-4">

        <p>
          Created: {note.createdAt}
        </p>

        <p>
          Updated: {note.updatedAt}
        </p>

      </div>


      {/* Buttons */}
      <div className="flex gap-2 mt-4">

        <button
          onClick={() => editNote(note)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteNote(note.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

        <button
          onClick={() => toggleArchive(note.id)}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

      </div>

    </div>
  );
}

export default NoteCard;