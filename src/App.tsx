import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/Resources'
import NotFound from './pages/NotFound'
import FindingInternship from './pages/resources/FindingInternship'
import ResumeGuide from './pages/resources/ResumeGuide'
import VirtualInternship from './pages/resources/VirtualInternship'
import InterviewPrep from './pages/resources/InterviewPrep'
import PortfolioBuilding from './pages/resources/PortfolioBuilding'
import Networking from './pages/resources/Networking'
import CompanyResearch from './pages/resources/CompanyResearch'
import InternshipSuccess from './pages/resources/InternshipSuccess'
import CoverLetters from './pages/resources/CoverLetters'
import TechnicalInterview from './pages/resources/TechnicalInterview'
import OfferEvaluation from './pages/resources/OfferEvaluation'
import InformationalInterviews from './pages/resources/InformationalInterviews'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/finding-internship" element={<FindingInternship />} />
        <Route path="/resources/resume-guide" element={<ResumeGuide />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
