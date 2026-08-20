import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { timeAgo } from "../utils/time";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export default function TicketDetail() {
  const { ticket_id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const loadTicket = () => {
    setLoading(true);
    fetch(`${API_URL}/api/tickets/${ticket_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch ticket");
        }
        return res.json();
      })
      .then((data) => {
        setTicket(data);
        setStatus(data.status);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadTicket, [ticket_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/tickets/${ticket_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes: note || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update ticket");
      }

      setNote("");
      loadTicket();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading ticket...</p>;
  }

  if (error && !ticket) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="font-mono text-sm text-gray-500">{ticket.ticket_id}</p>
        <h2 className="text-lg font-semibold text-gray-900">{ticket.subject}</h2>
        <p className="mt-1 text-xs text-gray-400">
          <span title={new Date(ticket.created_at).toLocaleString()}>
            Opened {timeAgo(ticket.created_at)}
          </span>
          {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
            <>
              {" · "}
              <span title={new Date(ticket.updated_at).toLocaleString()}>
                Updated {timeAgo(ticket.updated_at)}
              </span>
            </>
          )}
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
        <p>
          <span className="font-medium text-gray-700">Customer:</span>{" "}
          {ticket.customer_name} ({ticket.customer_email})
        </p>
        <p className="mt-2 whitespace-pre-wrap text-gray-700">{ticket.description}</p>
        {ticket.image_url && (
          <img
            src={ticket.image_url}
            alt="Attachment"
            onClick={() => setPreviewOpen(true)}
            className="mt-3 max-h-64 cursor-zoom-in rounded-md object-contain"
          />
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-700">Notes</h3>
          {ticket.notes?.length > 0 && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              {ticket.notes.length}
            </span>
          )}
        </div>

        {ticket.notes?.length ? (
          <ul className="space-y-3">
            {[...ticket.notes]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((n, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-400" />
                  <div className="min-w-0 flex-1 rounded-lg bg-gray-50 px-3 py-2">
                    <p className="whitespace-pre-wrap text-sm text-gray-700">
                      {n.note_text}
                    </p>
                    <p
                      className="mt-1 text-xs text-gray-400"
                      title={new Date(n.created_at).toLocaleString()}
                    >
                      {timeAgo(n.created_at)}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No notes yet.</p>
        )}
      </div>

      <form onSubmit={handleUpdate} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Add Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>

      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <img
            src={ticket.image_url}
            alt="Attachment full size"
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={() => setPreviewOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-white"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
