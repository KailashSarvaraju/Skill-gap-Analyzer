import {
  useState
} from "react";

import "./AIAssistant.css";

import BackButton
from "../components/BackButton";

export default function AIAssistant() {

  // =====================================
  // STATES
  // =====================================
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

  // =====================================
  // AI RESPONSE FUNCTION
  // =====================================
  const getAIResponse = (
    input: string
  ) => {

    const text =
      input.toLowerCase().trim();

    // EMPTY
    if (!text) {

      return `
Please ask a question 🚀
      `;
    }

    // GREETINGS
    if (
      text === "hi" ||
      text === "hello" ||
      text === "hey"
    ) {

      return `
Hello 👋

I'm your AI Career Assistant.

Ask me about:

• Web Development
• AI/ML
• Data Science
• Resume Tips
• Career Guidance
      `;
    }

    // REACT
    if (
      text.includes("react")
    ) {

      return `
After React, learn:

• TypeScript
• Next.js
• APIs
• Backend Development
• PostgreSQL

Build full-stack projects 🚀
      `;
    }

    // PYTHON
    if (
      text.includes("python")
    ) {

      return `
Python is great for:

• AI/ML
• Data Science
• Backend Development
• Automation

Practice using projects 🚀
      `;
    }

    // AI / ML
    if (
      text.includes("ai") ||
      text.includes("machine learning") ||
      text.includes("ml")
    ) {

      return `
AI/ML roadmap 🤖

• Python
• Mathematics
• Machine Learning
• Deep Learning
• TensorFlow/PyTorch
      `;
    }

    // WEB DEVELOPMENT
    if (
      text.includes("web")
    ) {

      return `
Web Development roadmap 🌐

Frontend:
• HTML
• CSS
• JavaScript
• React

Backend:
• Node.js / FastAPI
• Databases
      `;
    }

    // RESUME
    if (
      text.includes("resume")
    ) {

      return `
Resume tips 📄

• Keep it clean
• Add projects
• Mention skills
• Add GitHub links
• Keep it short
      `;
    }

    // JOBS
    if (
      text.includes("job") ||
      text.includes("placement")
    ) {

      return `
To improve placements 🚀

• Build projects
• Practice DSA
• Improve communication
• Use LinkedIn
• Apply consistently
      `;
    }

    // DEFAULT
    return `
Sorry 😅

I don't understand that yet.

Try asking about:

• React
• Python
• AI/ML
• Resume
• Web Development
• Careers
      `;
  };

  // =====================================
  // HANDLE SEND
  // =====================================
  const handleSend = () => {

    if (!question.trim()) return;

    const userMessage = {

      sender: "user",

      text: question
    };

    const aiMessage = {

      sender: "ai",

      text:
        getAIResponse(question)
    };

    setMessages([
      ...messages,
      userMessage,
      aiMessage
    ]);

    setQuestion("");
  };

  return (

    <div className="ai-page">

      <div className="ai-container">

        <BackButton />

        <h1>
          AI Career Assistant 🤖
        </h1>

        <p>
          Ask career-related questions
        </p>

        {/* CHAT BOX */}
        <div className="chat-box">

          {
            messages.map(
              (
                msg,
                index
              ) => (

                <div
                  key={index}
                  className={
                    msg.sender === "user"
                      ? "user-message"
                      : "ai-message"
                  }
                >

                  {msg.text}

                </div>
              )
            )
          }

        </div>

        {/* INPUT */}
        <div className="input-area">

          <input
            type="text"
            placeholder="Ask something..."
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
          >

            Send

          </button>

        </div>

      </div>

    </div>
  );
}