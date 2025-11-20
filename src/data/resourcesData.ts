export interface Resource {
  id: number;
  title: string;
  description: string;
  designedFor: string[];
  category: string;
  link: string;
}

export const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Finding Your First Internship",
    description: "Step-by-step guide to discover and apply for internships that match your career goals.",
    designedFor: ["All", "Students"],
    category: "Internship search",
    link: "/resources/finding-internship"
  },
  {
    id: 2,
    title: "Internship Resume Guide",
    description: "Craft a compelling internship resume that highlights your skills and projects.",
    designedFor: ["All", "Students"],
    category: "Application prep",
    link: "/resources/resume-guide"
  },
  {
    id: 3,
    title: "Virtual Internship Success",
    description: "Best practices for excelling in remote internship positions.",
    designedFor: ["All", "Students"],
    category: "Internship tips",
    link: "/resources/virtual-internship"
  },
  {
    id: 4,
    title: "Internship Interview Prep",
    description: "Common internship interview questions and how to showcase your potential.",
    designedFor: ["All", "Students"],
    category: "Interview skills",
    link: "/resources/interview-prep"
  },
  {
    id: 5,
    title: "Building Your Portfolio",
    description: "Create an impressive portfolio showcasing your projects and work.",
    designedFor: ["All", "Students"],
    category: "Application prep",
    link: "/resources/portfolio-building"
  },
  {
    id: 6,
    title: "Networking for Internships",
    description: "Leverage LinkedIn, career fairs, and connections to find opportunities.",
    designedFor: ["All", "Students"],
    category: "Networking",
    link: "/resources/networking"
  },
  {
    id: 7,
    title: "Company Research Strategies",
    description: "How to research companies and tailor your applications for impact.",
    designedFor: ["All", "Students"],
    category: "Internship search",
    link: "/resources/company-research"
  },
  {
    id: 8,
    title: "Making the Most of Your Internship",
    description: "Tips to maximize learning and build relationships during your internship.",
    designedFor: ["Students"],
    category: "Internship tips",
    link: "/resources/internship-success"
  },
  {
    id: 9,
    title: "Cover Letter Templates",
    description: "Professional cover letter templates for internship applications.",
    designedFor: ["All", "Students"],
    category: "Application prep",
    link: "/resources/cover-letters"
  },
  {
    id: 10,
    title: "Technical Interview Prep",
    description: "Practice coding challenges and technical questions for tech internships.",
    designedFor: ["Students"],
    category: "Interview skills",
    link: "/resources/technical-interview"
  },
  {
    id: 11,
    title: "Evaluating Internship Offers",
    description: "How to compare multiple internship offers and make the best decision.",
    designedFor: ["Students"],
    category: "Career planning",
    link: "/resources/offer-evaluation"
  },
  {
    id: 12,
    title: "Informational Interviews",
    description: "Master informational interviews to learn about companies and opportunities.",
    designedFor: ["All", "Students"],
    category: "Networking",
    link: "/resources/informational-interviews"
  }
];

export const designedForOptions = [
  "All",
  "Students"
];

export const categoryOptions = [
  "All",
  "Internship search",
  "Application prep",
  "Interview skills",
  "Networking",
  "Internship tips",
  "Career planning"
];
