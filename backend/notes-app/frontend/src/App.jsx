import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NoteCard from './components/NoteCard';

const App = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: ""
  });
  const [allNotes, setAllNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const handleChange = (e) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingNote) {
      // Update existing note
      await axios.put(`http://localhost:8000/notes/update/${editingNote._id || editingNote.id}`, formValues);
      setEditingNote(null);
    } else {
      // Create new note
      await axios.post("http://localhost:8000/notes/create", formValues);
    }

    setFormValues({ title: "", description: "" });
    getAllNotes();
  }

  const getAllNotes = async () => {
    try {
      let res = await axios.get("http://localhost:8000/notes/allNotes");
      setAllNotes(res.data.data || []);
    } catch (error) {
      console.log("Error fetching notes: ", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/notes/delete/${id}`);
      getAllNotes();
    } catch (error) {
      console.log("Error deleting note: ", error);
    }
  }

  const handleUpdate = (note) => {
    setEditingNote(note);
    setFormValues({
      title: note.title,
      description: note.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const cancelEdit = () => {
    setEditingNote(null);
    setFormValues({ title: "", description: "" });
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 mb-4">
            <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Notes App</h1>
          <p className="text-slate-400 mt-2 text-sm">Capture your thoughts instantly</p>
        </div>

        {/* Form Card */}
        <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-black/20 mb-12">
          {editingNote && (
            <div className="mb-4 flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2">
              <span className="text-sm text-amber-400 font-medium">Editing: {editingNote.title}</span>
              <button onClick={cancelEdit} className="text-amber-400 hover:text-amber-300 text-sm font-medium">
                Cancel
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Title</label>
              <input
                onChange={handleChange}
                name="title"
                value={formValues.title}
                type="text"
                placeholder="Enter note title..."
                className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Description</label>
              <input
                onChange={handleChange}
                name="description"
                value={formValues.description}
                type="text"
                placeholder="What's on your mind?"
                className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200"
                minLength={20}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {editingNote ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                )}
              </svg>
              {editingNote ? 'Update Note' : 'Add Note'}
            </button>
          </form>
        </div>

        {/* Notes Grid */}
        {allNotes && allNotes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Notes</h2>
              <span className="text-sm text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/50">
                {allNotes.length} note{allNotes.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allNotes.map((note) => (
                <NoteCard
                  key={note._id || note.id}
                  note={note}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!allNotes || allNotes.length === 0) && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/60 mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-300">No notes yet</h3>
            <p className="text-slate-500 text-sm mt-1">Add your first note above to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App