import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const STATUS_STYLES = {
  Open: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Closed: "bg-gray-200 text-gray-600",
};

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/tickets`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tickets");
        }
        return res.json();
      })
      .then(setTickets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading tickets...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  if (tickets.length === 0) {
    return <p className="p-6 text-center text-gray-500">No tickets found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-600">Ticket ID</th>
            <th className="px-4 py-3 font-medium text-gray-600">Customer</th>
            <th className="px-4 py-3 font-medium text-gray-600">Subject</th>
            <th className="px-4 py-3 font-medium text-gray-600">Status</th>
            <th className="px-4 py-3 font-medium text-gray-600">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {tickets.map((ticket) => (
            <tr key={ticket.ticket_id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-mono text-gray-800">{ticket.ticket_id}</td>
              <td className="px-4 py-3 text-gray-800">{ticket.customer_name}</td>
              <td className="px-4 py-3 text-gray-800">{ticket.subject}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    STATUS_STYLES[ticket.status] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(ticket.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
