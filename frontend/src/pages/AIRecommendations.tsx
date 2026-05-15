import {
  useState
} from "react";

import API from "../api/api";

import "./AIRecommendations.css";

import BackButton from "../components/BackButton";

export default function AIRecommendations() {

  const [domain, setDomain] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  // FETCH AI RECOMMENDATIONS
  const handleGetRecommendations =
    async () => {

      if (!domain || !skills) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await API.post(
            "/ai-recommendations",
            {
              domain,

              skills:
                skills
                  .split(",")
                  .map(
                    (s) =>
                      s.trim()
                  )
            }
          );

        console.log(
          response.data
        );

        setResult(
          response.data
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to fetch recommendations"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="ai-container">

      <div className="ai-card">

        <BackButton />

        <h1>
          AI Career Recommendations 🤖
        </h1>

        <p>
          Get personalized
          learning paths,
          projects and career
          guidance
        </p>

        {/* DOMAIN */}
        <select
          value={domain}
          onChange={(e) =>
            setDomain(
              e.target.value
            )
          }
        >

          <option value="">
            Select Domain
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Data Science">
            Data Science
          </option>

          <option value="AI/ML">
            AI/ML
          </option>

        </select>

        {/* SKILLS */}
        <textarea
          placeholder="Enter skills separated by commas"
          value={skills}
          onChange={(e) =>
            setSkills(
              e.target.value
            )
          }
        />

        {/* BUTTON */}
        <button
          onClick={
            handleGetRecommendations
          }
          disabled={loading}
        >

          {
            loading
              ? "Generating..."
              : "Get AI Recommendations"
          }

        </button>

        {/* RESULTS */}
        {result && (

          <div className="result-box">

            {/* SKILLS */}
            <h2>
              Recommended Skills
            </h2>

            <div className="tags">

              {
                result.recommended_skills.map(
                  (
                    skill: string,
                    index: number
                  ) => (

                    <span
                      key={index}
                      className="tag"
                    >
                      {skill}
                    </span>
                  )
                )
              }

            </div>

            {/* PROJECTS */}
            <h2>
              Project Ideas
            </h2>

            <ul>

              {
                result.project_ideas.map(
                  (
                    project: string,
                    index: number
                  ) => (

                    <li key={index}>
                      {project}
                    </li>
                  )
                )
              }

            </ul>

            {/* ROADMAP */}
            <h2>
              Career Roadmap
            </h2>

            <ol>

              {
                result.career_roadmap.map(
                  (
                    step: string,
                    index: number
                  ) => (

                    <li key={index}>
                      {step}
                    </li>
                  )
                )
              }

            </ol>

          </div>
        )}

      </div>

    </div>
  );
}