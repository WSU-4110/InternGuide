import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Resources from "./pages/Resources";
import ResumeGuide from "./pages/resources/ResumeGuide";
import FindingInternship from "./pages/resources/FindingInternship";
import VirtualInternship from "./pages/resources/VirtualInternship";
import InterviewPrep from "./pages/resources/InterviewPrep";
import PortfolioBuilding from "./pages/resources/PortfolioBuilding";
import Networking from "./pages/resources/Networking";
import CompanyResearch from "./pages/resources/CompanyResearch";
import InternshipSuccess from "./pages/resources/InternshipSuccess";
import CoverLetters from "./pages/resources/CoverLetters";
import TechnicalInterview from "./pages/resources/TechnicalInterview";
import OfferEvaluation from "./pages/resources/OfferEvaluation";
import InformationalInterviews from "./pages/resources/InformationalInterviews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Resources />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/resume-guide" element={<ResumeGuide />} />
        <Route path="/resources/finding-internship" element={<FindingInternship />} />
        <Route path="/resources/virtual-internship" element={<VirtualInternship />} />
        <Route path="/resources/interview-prep" element={<InterviewPrep />} />
        <Route path="/resources/portfolio-building" element={<PortfolioBuilding />} />
        <Route path="/resources/networking" element={<Networking />} />
        <Route path="/resources/company-research" element={<CompanyResearch />} />
        <Route path="/resources/internship-success" element={<InternshipSuccess />} />
        <Route path="/resources/cover-letters" element={<CoverLetters />} />
        <Route path="/resources/technical-interview" element={<TechnicalInterview />} />
        <Route path="/resources/offer-evaluation" element={<OfferEvaluation />} />
        <Route path="/resources/informational-interviews" element={<InformationalInterviews />} />
        {/* catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
