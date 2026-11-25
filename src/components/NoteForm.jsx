import { useState } from "react";

function NoteForm({
  addNote,
  updateNote,
  editingNote,
  cancelEdit,
}) {
  const [title, setTitle] = useState(editingNote?.title ?? "");
  const [content, setContent] = useState(editingNote?.content ?? "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Content is required
    if (content.trim() === "") {
      setError("Content is required");
      return;
    }

    // Title maximum length
    if (title.length > 100) {
      setError("Title cannot be more than 100 characters");
      return;
    }

    setError("");

    if (editingNote) {
      updateNote(title, content);
    } else {
      const wasAdded = addNote(title, content);
      if (!wasAdded) {
        return;
      }
    }

    setTitle("");
    setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow"
    >

      {/* Title */}
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      {/* Character count */}
      <p className="text-xs text-gray-500 mb-3">
        {title.length}/100
      </p>


      {/* Content */}
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        className="w-full border p-2 rounded"
      ></textarea>


      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}


      {/* Buttons */}
      <div className="flex gap-2 mt-3">

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default NoteForm;