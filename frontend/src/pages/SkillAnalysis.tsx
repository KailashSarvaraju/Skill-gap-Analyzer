import { useState } from "react";

import API from "../api/api";

import "./SkillAnalysis.css";


import BackButton from "../components/BackButton";

export default function SkillAnalysis() {

  const [domain, setDomain] = useState("");

  const [selectedSkills, setSelectedSkills] =
    useState<string[]>([]);

  const [result, setResult] =
    useState<any>(null);

  // DOMAIN SKILLS
  const domainSkills: any = {

    "Web Development": [
      "html",
      "css",
      "javascript",
      "react",
      "node",
      "git"
    ],

    "Data Science": [
      "python",
      "pandas",
      "numpy",
      "machine learning",
      "sql"
    ],

    "AI/ML": [
      "python",
      "deep learning",
      "nlp",
      "tensorflow"
    ],

    "Cyber Security": [
      "networking",
      "linux",
      "python",
      "ethical hacking"
    ]
  };

  // HANDLE CHECKBOX
  const handleSkillChange = (
    skill: string
  ) => {

    if (selectedSkills.includes(skill)) {

      setSelectedSkills(
        selectedSkills.filter(
          (s) => s !== skill
        )
      );

    } else {

      setSelectedSkills([
        ...selectedSkills,
        skill
      ]);
    }
  };

  // ANALYZE
  const handleAnalyze = async () => {

    if (!domain) {

      alert("Please select a domain");

      return;
    }

    if (selectedSkills.length === 0) {

      alert(
        "Please select at least one skill"
      );

      return;
    }

    try {

      const response = await API.post(
        "/analyze-skills",
        {
          domain,
          skills: selectedSkills
        }
      );

      console.log(response.data);

      setResult(response.data);

localStorage.setItem(
  "analysisResult",
  JSON.stringify(response.data)
);

    } catch (error) {

      console.log(error);

      alert("Analysis failed");
    }
  };

  return (

    <div className="skill-container">

      {/* BACK BUTTON */}
      <BackButton />

      {/* TITLE */}
      <h1 className="skill-title">

        Skill Analysis 🚀

      </h1>

      <div className="skill-card">

        {/* DOMAIN SELECT */}
        <select
          className="domain-select"
          value={domain}
          onChange={(e) => {

            setDomain(e.target.value);

            setSelectedSkills([]);

            setResult(null);
          }}
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

          <option value="Cyber Security">
            Cyber Security
          </option>

        </select>

        {/* SKILLS */}
        {domain && (

          <div>

            <h3 className="skills-heading">

              Select Your Skills

            </h3>

            <div className="skills-grid">

              {
                domainSkills[domain]?.map(
                  (skill: string) => (

                    <label
                      key={skill}
                      className="skill-checkbox"
                    >

                      <input
                        type="checkbox"
                        checked={
                          selectedSkills.includes(skill)
                        }
                        onChange={() =>
                          handleSkillChange(skill)
                        }
                      />

                      {skill}

                    </label>
                  )
                )
              }

            </div>

          </div>
        )}

        {/* BUTTON */}
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
        >

          Analyze Skills

        </button>

        {/* RESULTS */}
        {result && (

          <div className="result-card">

            <h2 className="result-title">

              Analysis Result

            </h2>

            <p>
              <strong>Domain:</strong>
              {" "}
              {result.domain}
            </p>

            <p>
              <strong>Level:</strong>
              {" "}
              {result.level}
            </p>

            <p>
              <strong>Progress:</strong>
            </p>

            {/* PROGRESS BAR */}
            <div className="progress-bar-container">

              <div
                className="progress-bar"
                style={{
                  width: `${result.progress}%`
                }}
              >

                {result.progress}%

              </div>

            </div>

            <p>
              <strong>
                Strong Skills:
              </strong>
              {" "}
              {
                result.strong_skills.length > 0
                  ? result.strong_skills.join(", ")
                  : "None"
              }
            </p>

            <p>
              <strong>
                Missing Skills:
              </strong>
              {" "}
              {
                result.missing_skills.length > 0
                  ? result.missing_skills.join(", ")
                  : "None"
              }
            </p>

          </div>
        )}

      </div>

    </div>
  );
}