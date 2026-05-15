import { useState } from "react";
import BackButton from "../components/BackButton";
import "./Settings.css";

export default function Settings() {

  const [username, setUsername] =
    useState(localStorage.getItem("username") || "");

  const [email, setEmail] =
    useState("");

  const [theme, setTheme] =
    useState("dark");

  const [notifications, setNotifications] =
    useState(true);

  const handleSave = () => {

    localStorage.setItem("username", username);

    alert("Settings saved successfully 🚀");
  };

  return (

    <div className="settings-container">

      <div className="settings-card">

        <BackButton />

        <h1>Settings ⚙️</h1>

        {/* PROFILE SETTINGS */}
        <div className="section">

          <h2>Profile</h2>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Username"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
          />

        </div>

        {/* PREFERENCES */}
        <div className="section">

          <h2>Preferences</h2>

          <label>
            Theme:
            <select
              value={theme}
              onChange={(e) =>
                setTheme(e.target.value)
              }
            >
              <option value="dark">
                Dark
              </option>

              <option value="light">
                Light
              </option>
            </select>
          </label>

          <label className="toggle">

            Notifications

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

          </label>

        </div>

        {/* SAVE BUTTON */}
        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}