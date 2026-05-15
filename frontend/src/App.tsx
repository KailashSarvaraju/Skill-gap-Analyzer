import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/login";

import Signup from "./pages/signup";

import SkillAnalysis from "./pages/SkillAnalysis";  

import Dashboard from "./pages/Dashboard";

import ResumeUpload from "./pages/ResumeUpload";

import AIRecommendations from "./pages/AIRecommendations";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";

import AIAssistant from "./pages/AIAssistant";

import Settings from "./pages/Settings";

import ResumeBuilder from "./pages/ResumeBuilder";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* SKILL ANALYSIS */}
        <Route
          path="/analysis"
          element={<SkillAnalysis />}
        />

        {/* RESUME UPLOAD */}
        <Route
          path="/resume-upload"
          element={<ResumeUpload />}
        />

        {/* AI RECOMMENDATIONS */}
        <Route
          path="/ai-recommendations"
          element={<AIRecommendations />}
        />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />}
/>
        <Route path="/ai-assistant" element={<AIAssistant />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/resume-builder" element={<ResumeBuilder />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;