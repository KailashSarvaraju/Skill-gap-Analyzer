import {
  useState
} from "react";

import API from "../api/api";

import "./ResumeUpload.css";

import BackButton from "../components/BackButton";

export default function ResumeUpload() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  // HANDLE FILE
  const handleFileChange = (
    e: any
  ) => {

    if (e.target.files[0]) {

      setFile(
        e.target.files[0]
      );
    }
  };

  // UPLOAD RESUME
  const handleUpload = async () => {

    if (!file) {

      alert(
        "Please select a PDF file"
      );

      return;
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await API.post(
          "/upload-resume",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
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
        "Resume upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="resume-container">

      <div className="resume-card">

        <BackButton />

        <h1>
          Resume Analyzer 📄
        </h1>

        <p>
          Upload your resume
          and get AI-powered
          career insights
        </p>

        {/* FILE INPUT */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
        >

          {
            loading
              ? "Uploading..."
              : "Upload Resume"
          }

        </button>

        {/* RESULTS */}
        {result && (

          <div className="result-box">

            <h2>
              Resume Analysis 🚀
            </h2>

            <p>
              <strong>
                Best Domain:
              </strong>

              {" "}

              {
                result.best_domain
              }
            </p>

            <p>
              <strong>
                Skill Level:
              </strong>

              {" "}

              {
                result.skill_level
              }
            </p>

            <p>
              <strong>
                Resume Score:
              </strong>

              {" "}

              {
                result.resume_score
              }/100
            </p>

            <br />

            {/* EXTRACTED SKILLS */}
            <h3>
              Extracted Skills
            </h3>

            <div className="skills">

              {
                result.detected_skills
                  ?.length > 0 ? (

                  result.detected_skills.map(
                    (
                      skill: string,
                      index: number
                    ) => (

                      <span
                        key={index}
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    )
                  )

                ) : (

                  <p className="no-skills">
                    No skills detected
                  </p>
                )
              }

            </div>

            <br />

            {/* MISSING SKILLS */}
            <h3>
              Missing Skills
            </h3>

            <div className="skills">

              {
                result.missing_skills
                  ?.length > 0 ? (

                  result.missing_skills.map(
                    (
                      skill: string,
                      index: number
                    ) => (

                      <span
                        key={index}
                        className="missing-tag"
                      >
                        {skill}
                      </span>
                    )
                  )

                ) : (

                  <p className="no-skills">
                    No missing skills 🎉
                  </p>
                )
              }

            </div>

            <br />

            {/* CAREER TIPS */}
            <h3>
              Career Tips
            </h3>

            <ul className="tips">

              {
                result.career_tips
                  ?.map(
                    (
                      tip: string,
                      index: number
                    ) => (

                      <li key={index}>
                        {tip}
                      </li>
                    )
                  )
              }

            </ul>

          </div>
        )}

      </div>

    </div>
  );
}