import { useNavigate } from "react-router-dom";

export default function Login() {
const navigate = useNavigate();

const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Logged in (demo)");
};

return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-pink-50 via-pink-100 to-white">
    <div className="container mx-auto px-4 py-16 max-w-md">
        <button
        onClick={() => navigate("/")}
        className="mb-8 inline-flex items-center gap-2 rounded-xl border border-pink-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-pink-50"
        >
        ← Back to Home
        </button>

        <div className="rounded-2xl border border-pink-100 bg-white/80 backdrop-blur-sm shadow-sm p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-center text-neutral-900">
            Welcome Back
        </h1>
        <p className="mt-1 mb-6 text-center text-sm text-slate-600">
            Please sign in to continue
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
            <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
            <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            />
            </div>

            <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Password</label>
            <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            />
            </div>

            <button
            type="submit"
            className="w-full rounded-xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600"
            >
            Login
            </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
            Don’t have an account?{" "}
            <a href="#" className="font-semibold text-pink-600 hover:underline">Sign up</a>
        </p>
        </div>
    </div>
    </div>
);
}
