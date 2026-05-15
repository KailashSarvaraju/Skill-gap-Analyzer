import {
  useRef,
  useState
} from "react";

import "./ResumeBuilder.css";

import BackButton
from "../components/BackButton";

import jsPDF
from "jspdf";

import html2canvas
from "html2canvas";

export default function ResumeBuilder() {

  const resumeRef =
    useRef<HTMLDivElement>(null);

  const [showPreview, setShowPreview] =
    useState(false);

  const [resume, setResume] =
    useState({

      fullName: "",

      email: "",

      phone: "",

      location: "",

      linkedin: "",

      github: "",

      summary: "",

      degree: "",

      college: "",

      graduationYear: "",

      skills: "",

      projectTitle: "",

      projectDescription: "",

      techStack: ""
    });

  // =====================================
  // HANDLE INPUT
  // =====================================
  const handleChange = (
    e: any
  ) => {

    setResume({

      ...resume,

      [e.target.name]:
        e.target.value
    });
  };

  // =====================================
  // CREATE RESUME
  // =====================================
  const handleCreateResume = () => {

    setShowPreview(true);
  };

  // =====================================
  // DOWNLOAD PDF
  // =====================================
  const downloadPDF = async () => {

    if (!resumeRef.current)
      return;

    const canvas =
      await html2canvas(
        resumeRef.current
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("resume.pdf");
  };

  return (

    <div className="resume-builder-container">

      <div className="resume-builder-card">

        <BackButton />

        <h1>
          Resume Builder 📄
        </h1>

        <p>
          Create a professional ATS-friendly resume
        </p>

        {/* PERSONAL INFO */}
        <div className="section">

          <h2>
            Personal Information
          </h2>

          <div className="form-grid">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={resume.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={resume.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={resume.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={resume.location}
              onChange={handleChange}
            />

            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={resume.linkedin}
              onChange={handleChange}
            />

            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={resume.github}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* SUMMARY */}
        <div className="section">

          <h2>
            Career Summary
          </h2>

          <textarea
            name="summary"
            placeholder="Write a short professional summary..."
            value={resume.summary}
            onChange={handleChange}
          />

        </div>

        {/* EDUCATION */}
        <div className="section">

          <h2>
            Education
          </h2>

          <div className="form-grid">

            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={resume.degree}
              onChange={handleChange}
            />

            <input
              type="text"
              name="college"
              placeholder="College / University"
              value={resume.college}
              onChange={handleChange}
            />

            <input
              type="text"
              name="graduationYear"
              placeholder="Graduation Year"
              value={resume.graduationYear}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* SKILLS */}
        <div className="section">

          <h2>
            Skills
          </h2>

          <input
            type="text"
            name="skills"
            placeholder="React, Python, FastAPI..."
            value={resume.skills}
            onChange={handleChange}
          />

        </div>

        {/* PROJECTS */}
        <div className="section">

          <h2>
            Projects
          </h2>

          <div className="form-grid">

            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={resume.projectTitle}
              onChange={handleChange}
            />

            <input
              type="text"
              name="techStack"
              placeholder="Tech Stack"
              value={resume.techStack}
              onChange={handleChange}
            />

          </div>

          <textarea
            name="projectDescription"
            placeholder="Project Description"
            value={resume.projectDescription}
            onChange={handleChange}
          />

        </div>

        {/* BUTTON */}
        <button
          className="create-resume-btn"
          onClick={handleCreateResume}
        >

          Create Resume

        </button>

        {/* PREVIEW */}
        {showPreview && (

          <>

            <div
              className="resume-preview"
              ref={resumeRef}
            >

              <h1>
                {resume.fullName}
              </h1>

              <p>
                {resume.email}
                {" | "}
                {resume.phone}
              </p>

              <p>
                {resume.location}
              </p>

              <hr />

              <h2>
                Career Summary
              </h2>

              <p>
                {resume.summary}
              </p>

              <h2>
                Education
              </h2>

              <p>

                {resume.degree}

                {" - "}

                {resume.college}

                {" ("}

                {resume.graduationYear}

                {")"}

              </p>

              <h2>
                Skills
              </h2>

              <p>
                {resume.skills}
              </p>

              <h2>
                Project
              </h2>

              <p>
                <strong>
                  {resume.projectTitle}
                </strong>
              </p>

              <p>
                {resume.projectDescription}
              </p>

              <p>
                Tech Stack:
                {" "}
                {resume.techStack}
              </p>

            </div>

            <button
              className="download-btn"
              onClick={downloadPDF}
            >

              Download PDF

            </button>

          </>
        )}

      </div>

    </div>
  );
}