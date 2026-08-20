import { Link, Route, Routes } from "react-router-dom";
import TicketList from "./components/TicketList";
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Support Tickets
          </Link>
          <Link
            to="/tickets/new"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            + Create Ticket
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
