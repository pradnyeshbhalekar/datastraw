import TicketList from "./components/TicketList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Support Tickets</h1>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <TicketList />
      </main>
    </div>
  );
}

export default App;
