import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  BarChart3,
  Brain,
  Home,
  LogOut,
  Settings,
  User,
  FilePlus2,
  Upload,
  Bot
} from "lucide-react";

import "./Dashboard.css";

import {
  useEffect,
  useState
} from "react";

export default function Dashboard() {

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") ||
    "User";

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  // =====================================
  // FETCH DASHBOARD DATA
  // =====================================
  useEffect(() => {

    const storedData =
      localStorage.getItem(
        "analysisResult"
      );

    if (storedData) {

      setDashboardData(
        JSON.parse(storedData)
      );
    }

  }, []);

  // =====================================
  // LOGOUT
  // =====================================
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    localStorage.removeItem(
      "analysisResult"
    );

    navigate("/login");
  };

  return (

    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2 className="logo">
          SkillForge 🚀
        </h2>

        <ul className="menu">

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className="menu-link"
          >

            <li className="active">

              <Home size={20} />

              Dashboard

            </li>

          </Link>

          {/* SKILL ANALYSIS */}
          <Link
            to="/analysis"
            className="menu-link"
          >

            <li>

              <BarChart3 size={20} />

              Skill Analysis

            </li>

          </Link>

          {/* AI RECOMMENDATIONS */}
          <Link
            to="/ai-recommendations"
            className="menu-link"
          >

            <li>

              <Brain size={20} />

              AI Recommendations

            </li>

          </Link>

          {/* AI ASSISTANT */}
          <Link
            to="/ai-assistant"
            className="menu-link"
          >

            <li>

              <Bot size={20} />

              AI Assistant

            </li>

          </Link>

          {/* RESUME BUILDER */}
          <Link
            to="/resume-builder"
            className="menu-link"
          >

            <li>

              <FilePlus2 size={20} />

              Resume Builder

            </li>

          </Link>

          {/* RESUME UPLOAD */}
          <Link
            to="/resume-upload"
            className="menu-link"
          >

            <li>

              <Upload size={20} />

              Resume Upload

            </li>

          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className="menu-link"
          >

            <li>

              <User size={20} />

              Profile

            </li>

          </Link>

          {/* SETTINGS */}
          <Link
            to="/settings"
            className="menu-link"
          >

            <li>

              <Settings size={20} />

              Settings

            </li>

          </Link>

        </ul>

        {/* LOGOUT BUTTON */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">

          <h1>

            Welcome Back,
            {" "}
            {username} 👋

          </h1>

        </div>

        {/* NO DATA */}
        {!dashboardData && (

          <div className="overview-card">

            <h2>
              No analysis data found
            </h2>

            <p>
              Go to Skill Analysis
              and analyze your skills.
            </p>

          </div>

        )}

        {/* DASHBOARD CONTENT */}
        {dashboardData && (

          <>

            {/* CARDS */}
            <div className="cards">

              <div className="card">

                <h3>
                  Skill Progress
                </h3>

                <p>
                  {
                    dashboardData.progress
                  }%
                </p>

              </div>

              <div className="card">

                <h3>
                  Current Level
                </h3>

                <p>
                  {
                    dashboardData.level
                  }
                </p>

              </div>

              <div className="card">

                <h3>
                  Strong Skills
                </h3>

                <p>
                  {
                    dashboardData
                      .strong_skills?.length || 0
                  }
                </p>

              </div>

              <div className="card">

                <h3>
                  Missing Skills
                </h3>

                <p>
                  {
                    dashboardData
                      .missing_skills?.length || 0
                  }
                </p>

              </div>

            </div>

            {/* OVERVIEW */}
            <div className="overview">

              {/* STRONG SKILLS */}
              <div className="overview-card">

                <h2>
                  Strong Skills
                </h2>

                <ul>

                  {
                    dashboardData
                      .strong_skills?.map(
                        (
                          skill: string,
                          index: number
                        ) => (

                          <li key={index}>
                            ✅ {skill}
                          </li>
                        )
                      )
                  }

                </ul>

              </div>

              {/* MISSING SKILLS */}
              <div className="overview-card">

                <h2>
                  Missing Skills
                </h2>

                <ul>

                  {
                    dashboardData
                      .missing_skills?.map(
                        (
                          skill: string,
                          index: number
                        ) => (

                          <li key={index}>
                            ⚠ {skill}
                          </li>
                        )
                      )
                  }

                </ul>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}