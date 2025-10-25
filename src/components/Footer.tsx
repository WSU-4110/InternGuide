// src/components/Footer.tsx
export default function Footer() {
    const year = new Date().getFullYear();
    return (
    <footer className="border-t bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-600">
        <span className="font-semibold text-pink-600">Intern Guide</span> • © {year}
        </div>
    </footer>
    );
}
