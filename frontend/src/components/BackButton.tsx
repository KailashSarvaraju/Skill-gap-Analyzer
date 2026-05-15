import {
  useNavigate
} from "react-router-dom";

import {
  ArrowLeft
} from "lucide-react";

import "./BackButton.css";

export default function BackButton() {

  const navigate = useNavigate();

  return (

    <button
      className="back-btn"
      onClick={() =>
        navigate("/dashboard")
      }
    >

      <ArrowLeft size={18} />

      Back to Dashboard

    </button>
  );
}