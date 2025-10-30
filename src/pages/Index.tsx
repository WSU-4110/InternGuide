import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Student Career Hub</h1>
        <p className="text-xl text-muted-foreground mb-8">Your gateway to career success</p>
        <Link 
          to="/resources" 
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Explore Resources
        </Link>
      </div>
    </div>
  );
};

export default Index;
