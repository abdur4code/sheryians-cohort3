import React from 'react'

const NoteCard = ({ note, onDelete, onUpdate }) => {
  // Format relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-lg shadow-black/10 hover:border-amber-500/30 hover:shadow-amber-500/5 transition-all duration-300 group">
      {/* Title & Date */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
          {note.title}
        </h3>
        <span className="text-[10px] text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-700/30 shrink-0 ml-2">
          {new Date(note.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
        {note.description}
      </p>

      {/* Footer: Time + Actions */}
      <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {getRelativeTime(note.createdAt || Date.now())}
        </span>

        <div className="flex items-center gap-2">
          {/* Update Button */}
          <button
            onClick={() => onUpdate(note)}
            className="text-slate-500 hover:text-amber-400 transition-colors p-1.5 rounded-lg hover:bg-amber-500/10"
            title="Update note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(note._id || note.id)}
            className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
            title="Delete note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard