import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/time";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const STATUS_STYLES = {
  Open: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Closed: "bg-gray-200 text-gray-600",
};

export default function TicketList() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);

    const handle = setTimeout(() => {
      fetch(`${API_URL}/api/tickets?${params.toString()}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch tickets");
          }
          return res.json();
        })
        .then(setTickets)
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => {
      clearTimeout(handle);
      controller.abort();
    };
  }, [search, status]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, email, or description..."
          className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none sm:w-48"
        >
          <option value="">All status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {error && <p className="p-6 text-center text-red-600">{error}</p>}

      {!error && !loading && tickets.length === 0 && (
        <p className="p-6 text-center text-gray-500">No tickets found.</p>
      )}

      {!error && tickets.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Ticket ID
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Customer
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Subject</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.ticket_id}
                  onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-mono text-gray-800">
                    {ticket.ticket_id}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {ticket.customer_name}
                  </td>
                  <td className="px-4 py-3 text-gray-800">{ticket.subject}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        STATUS_STYLES[ticket.status] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-gray-500"
                    title={new Date(ticket.created_at).toLocaleString()}
                  >
                    {timeAgo(ticket.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
