import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">🚀 SKILL-GAP ANALYZER</h1>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        {/* Left Side */}
        <div className="hero-left">
          <h1>
            Analyze Your Skills <br />
            Build Your Career
          </h1>

          <p>
            SkillGap Analyzer helps students and developers track skills,
            identify gaps, and grow faster with personalized guidance.
          </p>

          <div className="hero-buttons">
            <Link to="/login">
              <button className="primary-btn">Login</button>
            </Link>

            <Link to="/signup">
              <button className="secondary-btn">Signup</button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-right">

          <div className="card">
            <h2>📊 Skill Analysis</h2>
            <p>
              Discover your strengths and identify missing skills instantly.
            </p>
          </div>

          <div className="card">
            <h2>🎯 Career Guidance</h2>
            <p>
              Get smart recommendations based on your goals and interests.
            </p>
          </div>

          <div className="card">
            <h2>📝 Resume Builder</h2>
            <p>
              Create professional resumes and improve your profile quickly.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
<><Link to="/analysis">
  <button className="primary-btn">
    Analyze Skills
  </button>
</Link><Link to="/dashboard">
    <button className="primary-btn">
      Dashboard
    </button>
  </Link></>