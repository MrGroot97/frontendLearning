import Note from "./note";
import { useEffect, useState, useRef } from "react";

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

    const determinePosition = () => {
        const containerBounds = containerRef.current.getBoundingClientRect();
        const containerTop = containerBounds.top + window.scrollY + 20;
        const maxX = window.innerWidth - 300;
        const maxY = containerBounds.height - 100;

        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY) + containerTop;
        return { x, y };
    };

    useEffect(() => {
        const pinnedNotes = JSON.parse(localStorage.getItem("pinnedNote")) || [];
        const leftOverNotes = [];
        initialNotes.forEach((note) => {
            const pinnedNote = pinnedNotes.find((pinnedNote) => pinnedNote.id === note.id);
            if (!pinnedNote){
                leftOverNotes.push({ ...note, position: determinePosition()});
                return;
            }
        });
        setNotes([...pinnedNotes, ...leftOverNotes]);
    }, []);

    const addNote = () => {
        const newNoteTitle = document.getElementById("note-input").value;
        if (newNoteTitle.length < 3 ) return;
        const newNote = {
            id: notes.length + 1,
            title: newNoteTitle,
            position: determinePosition(),
        };
        setNotes([...notes, newNote]);
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    const pinNote = (id) => {
        const alreadyPinned = JSON.parse(localStorage.getItem("pinnedNote")) || [];
        const isNotePinned = alreadyPinned.some((note) => note.id === id);  
        if (isNotePinned) {
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
            localStorage.setItem("pinnedNote", JSON.stringify(updatedNotes.filter((note) => note.id === id || note.starred)));
        }
    }

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
    }

    const handleDragStart = (e, id) => {
        const note = noteRefs.current[id];
        const noteBounds = note.getBoundingClientRect();
        const noteTop = noteBounds.top + window.scrollY;
        const noteLeft = noteBounds.left + window.scrollX;
        const offsetX = e.clientX - noteLeft;
        const offsetY = e.clientY - noteTop;
        const containerBounds = containerRef.current.getBoundingClientRect();
        const containerTop = Math.floor(containerBounds.top/2) + window.scrollY + 20;

        const handleMouseMove = (e) => {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY - containerTop;
            note.style.left = `${x}px`;
            note.style.top = `${y}px`;

            //  will handle collision detection later
            // will hadnle starred functionality bug later
            const isCollision = false;
            if (isCollision) {
                return;
            }
            updateNotePosition(id, { x, y });
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    return (
        <div className="relative flex flex-col w-full min-h-[100dvh] bg-white text-slate-800">
            <div className="inline-flex items-center justify-center max-w-[300px] overflow-hidden rounded-lg mx-auto p-1">
                <input
                    type="text"
                    placeholder="Add note"
                    id="note-input"
                    className="focus:outline-none h-[40px] w-full p-2 border border-black rounded-tl-lg rounded-bl-lg"
                />
                <button 
                    className="bg-blue-500 text-white p-2 rounded-tr-lg rounded-br-lg"
                    onClick={addNote}
                >
                    Add
                </button>
            </div>
            <div className="notes-area" ref={containerRef}>
                {notes.map((note) => {
                    const { id } = note;
                    return (
                        <Note
                            key={id}
                            onDelete={() => deleteNote(id)}
                            onStarred={() => pinNote(id)}
                            note={note}
                            ref={(el) => {noteRefs.current[id] = el}}
                            onMouseDown={(e) => handleDragStart(e, id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
