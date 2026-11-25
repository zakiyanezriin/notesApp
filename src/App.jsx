import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import ColorPicker from "./components/ColorPicker";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      if (!savedNotes) return [];
      const parsedNotes = JSON.parse(savedNotes);
      return Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch {
      return [];
    }
  });
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [editingNote, setEditingNote] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add note
  function addNote(title, content) {
    const normalizedTitle = title.trim().toLowerCase();
    const normalizedContent = content.trim().toLowerCase();
    const duplicate = notes.some((note) => {
      const noteTitle = (note.title ?? "").trim().toLowerCase();
      const noteContent = (note.content ?? "").trim().toLowerCase();
      return noteTitle === normalizedTitle && noteContent === normalizedContent;
    });

    if (duplicate) {
      alert("This note already exists");
      return false;
    }

    const now = Date.now();
    const newNote = {
      id: now,
      title: title,
      content: content,
      color: selectedColor,
      archived: false,
      createdAt: new Date(now).toLocaleString(),
      createdTime: now,
      updatedAt: new Date(now).toLocaleString(),
    };

    setNotes((currentNotes) => [...currentNotes, newNote]);
    return true;
  }

  // Delete note
  function deleteNote(id) {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  }

  // Edit note
  function editNote(note) {
    setShowArchived(false);
    setEditingNote(note);
    setSelectedColor(note.color ?? "yellow");
  }

  // Update note
  function updateNote(title, content) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              title,
              content,
              color: selectedColor,
              updatedAt: new Date().toLocaleString(),
            }
          : note
      )
    );
    setEditingNote(null);
  }

  // Archive / Unarchive
  function toggleArchive(id) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              archived: !note.archived,
              updatedAt: new Date().toLocaleString(),
            }
          : note
      )
    );
  }

  // Search title only
  const filteredNotes = notes.filter((note) => {
    return (note.title ?? "").toLowerCase().includes(search.toLowerCase());
  });

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    const aTime = Number(a.createdTime) || 0;
    const bTime = Number(b.createdTime) || 0;
    if (sortOrder === "newest") {
      return bTime - aTime;
    }

    return aTime - bTime;
  });

  // Show active or archived notes
  const displayedNotes = sortedNotes.filter((note) => {
    return showArchived ? note.archived : !note.archived;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        {showArchived ? "Archived Notes" : "My Notes"}
      </h1>

      {/* Note Form */}
      {!showArchived && (
        <NoteForm
          key={editingNote?.id ?? "new-note"}
          addNote={addNote}
          updateNote={updateNote}
          editingNote={editingNote}
          cancelEdit={() => {
            setEditingNote(null);
            setSelectedColor("yellow");
          }}
        />
      )}

      {/* Color Picker */}
      {!showArchived && (
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}

      {/* Search and Sort */}
      <div className="max-w-xl mx-auto mt-6 flex gap-2">

        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border bg-white rounded-lg px-3"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

      </div>

      {/* Saved Notes */}
      <div className="max-w-6xl mx-auto mt-6">

        {displayedNotes.length === 0 ? (
          <p className="text-center text-gray-500">
            {search
              ? "No matching notes found."
              : showArchived
              ? "No archived notes."
              : "No notes yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {displayedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                editNote={editNote}
                toggleArchive={toggleArchive}
              />
            ))}

          </div>
        )}

      </div>

      {/* Archive button */}
      <div className="max-w-xl mx-auto mt-8">

        <button
          onClick={() => {
            setShowArchived(!showArchived);
            setSearch("");
            setEditingNote(null);
            setSelectedColor("yellow");
          }}
          className="w-full bg-purple-500 text-white px-4 py-3 rounded-lg"
        >
          {showArchived ? "Back to My Notes" : "Open Archive"}
        </button>

      </div>

    </div>
  );
}

export default App;