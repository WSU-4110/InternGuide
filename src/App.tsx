import { Link, Routes, Route } from "react-router-dom";

// Only the pages we’re using right now
import Overview from "./pages/Overview.tsx";
import Mindmap from "./pages/Mindmap.tsx"; // ← note the capital M
import Login from "./pages/Login.tsx";

// Footer (remove if you don’t have it)
import Footer from "./components/Footer.tsx";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-pink-600 tracking-tight">
          Intern Guide
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {/* Clickable routes we actually have */}
          <Link to="/overview" className="text-sm text-slate-700 hover:text-pink-500">Overview</Link>
          <Link to="/mindmap" className="text-sm text-slate-700 hover:text-pink-500">Mindmap</Link>
          <Link to="/login" className="text-sm text-slate-700 hover:text-pink-500">Login</Link>

          {/* Visual placeholders only (not clickable) */}
          <span className="text-sm text-slate-400">Resources</span>
          <span className="text-sm text-slate-400">Progress</span>
          <span className="text-sm text-slate-400">Applications</span>
        </nav>
      </div>
    </header>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Home = Overview */}
      <Route path="/" element={<AppShell><Overview /></AppShell>} />

      {/* Real pages */}
      <Route path="/overview" element={<AppShell><Overview /></AppShell>} />
      <Route path="/mindmap" element={<AppShell><Mindmap /></AppShell>} />
      <Route path="/login" element={<AppShell><Login /></AppShell>} />

      {/* Fallback → send unknown paths home */}
      <Route path="*" element={<AppShell><Overview /></AppShell>} />
    </Routes>
  );
}
