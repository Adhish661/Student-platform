// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Layout/Header";

import MainContent from "./components/Layout/MainContent";

// Lazy load page components to improve performance
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./components/Pages/Home"));
const GroupStudy = lazy(() => import("./components/Pages/GroupStudy"));
const Resources = lazy(() => import("./components/Pages/Resources"));
const PreviousYear = lazy(() => import("./components/Pages/PreviousYear"));
const VideoNotes = lazy(() => import("./components/Pages/VideoNotes"));
const Chatbot = lazy(() => import("./components/Pages/Chatbot"));

// Loading animation component
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-3 text-xl font-medium">Loading...</p>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <MainContent>
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/group-study" element={<GroupStudy />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/previous-year" element={<PreviousYear />} />
                <Route path="/video-notes" element={<VideoNotes />} />
                <Route path="/chatbot" element={<Chatbot />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </MainContent>
      </div>
    </Router>
  );
}
