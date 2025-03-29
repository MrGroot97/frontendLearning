import Note from "./note";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const initialNotes = [
  {
    id: 1,
    title: "Add sticky note",
  },
  {
    id: 2,
    title: "Add favorite functionality",
  },
  {
    id: 3,
    title: "Add delete functionality",
  },
];

export const StickyNote = () => {
  const [notes, setNotes] = useState([]);
  const containerRef = useRef(null);
  const noteRefs = useRef([]);
  const { effectiveTheme } = useTheme();
  const isDarkMode = effectiveTheme === "dark";

  const determinePosition = () => {
    if (!containerRef.current) return { x: 50, y: 50 };

    const containerBounds = containerRef.current.getBoundingClientRect();
    // Calculate available space in the container
    const containerWidth = containerBounds.width || window.innerWidth;
    const containerHeight = containerBounds.height || window.innerHeight;

    // Make sure notes stay within the visible container area
    // Leave some margin for the sticky note (300px wide, 100px tall)
    const maxX = Math.max(50, containerWidth - 350);
    const maxY = Math.max(50, containerHeight - 150);

    // Generate random position within the container's boundaries
    const x = Math.floor(Math.random() * maxX) + 50;
    const y = Math.floor(Math.random() * maxY) + 50;

    return { x, y };
  };

  useEffect(() => {
    // Load saved notes from localStorage, or initialize with default notes
    const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNote")) || [];

    if (savedNotes.length > 0) {
      setNotes(savedNotes);
    } else {
      const initialPositionedNotes = initialNotes.map((note) => {
        const pinnedNote = pinnedNotes.find((pin) => pin.id === note.id);
        if (pinnedNote) {
          return { ...pinnedNote };
        }
        return { ...note, position: determinePosition() };
      });
      setNotes(initialPositionedNotes);
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("stickyNotes", JSON.stringify(notes));
    }
  }, [notes]);

  // Add a style element to the top of the component to globally remove focus outlines
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      #note-input:focus {
        outline: none !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        border-color: ${isDarkMode ? "#4B5563" : "#000000"} !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [isDarkMode]);

  const addNote = () => {
    const newNoteTitle = document.getElementById("note-input").value;
    if (newNoteTitle.length < 3) return;

    const newNote = {
      id: Date.now(), // Use timestamp for unique ID
      title: newNoteTitle,
      position: determinePosition(),
    };

    setNotes([...notes, newNote]);
    document.getElementById("note-input").value = ""; // Clear input
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    // Also remove from pinned notes if it exists
    const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNote")) || [];
    const newPinnedNotes = pinnedNotes.filter((note) => note.id !== id);
    localStorage.setItem("pinnedNote", JSON.stringify(newPinnedNotes));
  };

  const pinNote = (id) => {
    const alreadyPinned = JSON.parse(localStorage.getItem("pinnedNote")) || [];
    const isNotePinned = alreadyPinned.some((note) => note.id === id);

    if (isNotePinned) {
      // Unpin the note
      const newPinnedNote = alreadyPinned.filter((note) => note.id !== id);
      setNotes((prev) => {
        return prev.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              starred: false,
            };
          }
          return note;
        });
      });
      localStorage.setItem("pinnedNote", JSON.stringify(newPinnedNote));
    } else {
      // Pin the note
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            starred: true,
          };
        }
        return note;
      });
      setNotes(updatedNotes);

      const noteToPin = updatedNotes.find((note) => note.id === id);
      if (noteToPin) {
        localStorage.setItem(
          "pinnedNote",
          JSON.stringify([...alreadyPinned, noteToPin])
        );
      }
    }
  };

  const updateNotePosition = (id, position) => {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            position,
          };
        }
        return note;
      });
    });
  };

  const handleDragStart = (e, id) => {
    e.preventDefault();

    const note = noteRefs.current[id];
    if (!note) return;

    const noteBounds = note.getBoundingClientRect();
    const offsetX = e.clientX - noteBounds.left;
    const offsetY = e.clientY - noteBounds.top;

    const handleMouseMove = (e) => {
      if (!note || !containerRef.current) return;

      const containerBounds = containerRef.current.getBoundingClientRect();

      // Calculate position relative to the container
      const x = e.clientX - offsetX - containerBounds.left;
      const y = e.clientY - offsetY - containerBounds.top;

      // Ensure the note stays within the container boundaries
      const maxX = containerBounds.width - noteBounds.width;
      const maxY = containerBounds.height - noteBounds.height;

      const boundedX = Math.max(0, Math.min(maxX, x));
      const boundedY = Math.max(0, Math.min(maxY, y));

      // Update note style position
      note.style.left = `${boundedX}px`;
      note.style.top = `${boundedY}px`;

      // Update note data position
      updateNotePosition(id, { x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`relative flex flex-col w-full min-h-[80vh] ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-slate-800"
      }`}
    >
      <h5
        className={`text-sm text-left p-2 ${
          isDarkMode ? "text-gray-300" : "text-black"
        }`}
      >
        *Best viewed on desktop
      </h5>
      <div className="inline-flex items-center justify-center max-w-[300px] overflow-hidden mx-auto p-1">
        <input
          type="text"
          placeholder="Add note"
          id="note-input"
          className={`h-[40px] w-full p-2 border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-black bg-white text-black"
          } rounded-l-md border-r-0`}
          style={{
            outline: "none",
            boxShadow: "none",
            WebkitAppearance: "none",
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md h-[40px] flex items-center"
          onClick={addNote}
        >
          Add
        </button>
      </div>
      <div
        className="notes-area relative w-full flex-1"
        ref={containerRef}
        style={{ minHeight: "500px", position: "relative" }}
      >
        {notes.map((note) => {
          const { id } = note;
          return (
            <Note
              key={id}
              onDelete={() => deleteNote(id)}
              onStarred={() => pinNote(id)}
              note={note}
              ref={(el) => {
                noteRefs.current[id] = el;
              }}
              onMouseDown={(e) => handleDragStart(e, id)}
              isDarkMode={isDarkMode}
            />
          );
        })}
      </div>
    </div>
  );
};
