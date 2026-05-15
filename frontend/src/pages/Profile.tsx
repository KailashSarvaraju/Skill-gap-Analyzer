import {
  useEffect,
  useState
} from "react";

import "./Profile.css";

import BackButton from "../components/BackButton";

import API from "../api/api";

export default function Profile() {

  // =====================================
  // STATES
  // =====================================
  const [editing, setEditing] =
    useState(false);

  const [profileCreated, setProfileCreated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // PROFILE STATE
  // =====================================
  const [profile, setProfile] =
    useState({

      user_id: 1,

      username:
        localStorage.getItem(
          "username"
        ) || "",

      email: "",

      role: "",

      experience: "",

      bio: "",

      github: "",

      linkedin: "",

      skills: ""
    });

  // =====================================
  // LOAD PROFILE
  // =====================================
  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await API.get(
          "/profile/1"
        );

      console.log(response.data);

      if (
        response.data.message !==
        "Profile not found"
      ) {

        setProfile({

          ...response.data,

          username:
            localStorage.getItem(
              "username"
            ) || ""
        });

        setProfileCreated(true);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================
  const handleChange = (
    e: any
  ) => {

    setProfile({

      ...profile,

      [e.target.name]:
        e.target.value
    });
  };

  // =====================================
  // SAVE PROFILE
  // =====================================
  const handleSave = async () => {

    try {

      const response =
        await API.post(
          "/create-profile",
          profile
        );

      alert(response.data.message);

      setProfileCreated(true);

      setEditing(false);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to save profile"
      );
    }
  };

  // =====================================
  // LOADING
  // =====================================
  if (loading) {

    return (

      <div className="profile-container">

        <h1
          style={{
            color: "white"
          }}
        >
          Loading...
        </h1>

      </div>
    );
  }

  return (

    <div className="profile-container">

      <div className="profile-card">

        <BackButton />

        {/* HEADER */}
        <div className="profile-header">

          <div className="avatar">

            {
              profile.username
                ? profile.username
                    .charAt(0)
                    .toUpperCase()
                : "U"
            }

          </div>

          <div>

            <h1>

              {
                profile.username ||
                "Create Your Profile"
              }

            </h1>

            <p>

              {
                profile.role ||
                "No role added"
              }

            </p>

          </div>

        </div>

        {/* FORM */}
        <div className="profile-form">

          {/* EMAIL */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={
                !editing &&
                profileCreated
              }
            />

          </div>

          {/* ROLE */}
          <div className="form-group">

            <label>
              Target Role
            </label>

            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
              disabled={
                !editing &&
                profileCreated
              }
            />

          </div>

          {/* EXPERIENCE */}
          <div className="form-group">

            <label>
              Experience
            </label>

            <select
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              disabled={
                !editing &&
                profileCreated
              }
            >

              <option value="">
                Select
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>

            </select>

          </div>

          {/* BIO */}
          <div className="form-group">

            <label>Bio</label>

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={
                !editing &&
                profileCreated
              }
            />

          </div>

          {/* SKILLS */}
          <div className="form-group">

            <label>Skills</label>

            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="React, Python, FastAPI"
              disabled={
                !editing &&
                profileCreated
              }
            />

          </div>

          {/* GITHUB */}
          <div className="form-group">

            <label>GitHub</label>

            <input
              type="text"
              name="github"
              value={profile.github}
              onChange={handleChange}
              disabled={
                !editing &&
                profileCreated
              }
            />

          </div>

          {/* LINKEDIN */}
          <div className="form-group">

            <label>LinkedIn</label>

            <input
              type="text"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              disabled={
                !editing &&
                profileCreated
              }
            />

          </div>

        </div>

        {/* BUTTONS */}
        <div className="profile-buttons">

          {
            !profileCreated &&
            !editing && (

              <button
                className="create-btn"
                onClick={() =>
                  setEditing(true)
                }
              >

                Create Profile

              </button>
            )
          }

          {
            editing && (

              <button
                className="save-btn"
                onClick={handleSave}
              >

                Save Profile

              </button>
            )
          }

          {
            profileCreated &&
            !editing && (

              <button
                className="edit-btn"
                onClick={() =>
                  setEditing(true)
                }
              >

                Edit Profile

              </button>
            )
          }

        </div>

      </div>

    </div>
  );
}