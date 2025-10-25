import { Sparkles, BookOpen, Target, Users } from "lucide-react";

const features = [
{
    title: "Learn & Explore",
    icon: BookOpen,
    description:
    "Access curated resources and guides to understand internship opportunities and career paths.",
},
{
    title: "Set Your Goals",
    icon: Target,
    description:
    "Create personalized career goals and track your progress toward landing your dream internship.",
},
{
    title: "Connect & Grow",
    icon: Users,
    description:
    "Join a community of students and access mentorship to advance your professional journey.",
},
];

export default function Overview() {
return (
    <div className="min-h-screen flex flex-col">
    <section className="container mx-auto px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-6 shadow-sm">
        <Sparkles className="w-4 h-4 text-pink-500" />
        <span className="text-sm font-semibold text-pink-600">Alpha 1.0</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-4">
        Welcome to Intern Guide
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
        Your comprehensive platform for navigating internships and launching your career journey with confidence.
        </p>

        <div className="flex justify-center mt-8">
        <button className="px-6 py-3 text-base bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold shadow-sm transition">
            Create Your Mindmap
        </button>
        </div>
    </section>

    <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
        {features.map(({ title, icon: Icon, description }) => (
            <div
            key={title}
            className="bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow p-6"
            >
            <Icon className="w-12 h-12 text-pink-500 mb-4" />
            <h3 className="text-2xl font-extrabold text-neutral-900 mb-2">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>
        ))}
        </div>
    </section>
    </div>
);
}
