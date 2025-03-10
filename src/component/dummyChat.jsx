import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import Header from "./header/index";

export default function DummyChatBox() {
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  let iconStyles = { fontSize: "1.5em" };
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://ec2-50-112-255-124.us-west-2.compute.amazonaws.com:5000/streaming_query?user_id=9b9907bfe0ac3cf852a889aa9a4e3a3a&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWI5OTA3YmZlMGFjM2NmODUyYTg4OWFhOWE0ZTNhM2EiLCJpYXQiOjE3NDE2MTQxNDAsImV4cCI6MTc0MTYxNTk0MH0._fFCuRz57RFuNP8AiuwojpjSs3H4-NgZB4Gt3mUX-SE"
    );
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, { text: event.data, sender: "bot" }]);
    };
    
    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onclose = () => console.log("WebSocket disconnected");
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    socket?.send(input);
    setInput("");
  };

  const startEC2Instance = async () => {
    setIsRunning((prev) => !prev);
    const startApiUrl = `https://53pspabkjc.execute-api.us-west-2.amazonaws.com/dev/control?action=ec2&value=${
      isRunning ? "stop" : "start"
    }&instance=ollama`;
    try {
      const response = await fetch(startApiUrl, { method: "POST" });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      console.log("EC2 Instance Started:", data);
    } catch (error) {
      console.error("Error starting EC2 instance:", error.message);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const questionData = {
    Personal: {
      default: {
        "What is your name?": "I'm ChatGPT, your AI assistant!",
        "How are you?": "I'm just a bunch of code, but thanks for asking!",
        "Tell me a joke":
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
      },
      more: {
        "What is your favorite color?":
          "I don't have eyes, but I hear blue is pretty popular!",
        "What do you like to do?":
          "I like helping people with their questions!",
      },
    },
    Medical: {
      default: {
        "What are common flu symptoms?":
          "Common flu symptoms include fever, cough, sore throat, and fatigue.",
        "How do I stay healthy?":
          "Eat a balanced diet, exercise regularly, and get enough sleep!",
      },
      more: {
        "What are the benefits of exercise?":
          "Exercise helps with weight management, improves mood, and boosts overall health.",
        "How much water should I drink daily?":
          "It is generally recommended to drink around 8 cups (2 liters) of water per day.",
      },
    },
    Business: {
      default: {
        "What are key business strategies?":
          "Key strategies include market research, branding, and customer engagement.",
        "How do I improve sales?":
          "Focus on customer needs, offer great service, and use effective marketing techniques.",
      },
      more: {
        "How do I start a business?":
          "Start by researching your market, creating a business plan, and securing funding!",
        "What is marketing?":
          "Marketing is the process of promoting and selling products or services.",
      },
    },
  };

  const handleSend = (message = input) => {
    if (message.trim()) {
      const userMessage = { id: Date.now(), text: message, sender: "You" };

      // Get the bot response from questionData
      const botResponse =
        questionData[selectedCategory].default[message] ||
        questionData[selectedCategory].more?.[message] ||
        "I'm not sure about that.";

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "Bot",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header />
      </div>
      <div className="h-screen w-full bg-white text-gray-900 flex flex-col pt-16">
        <h1 className="text-4xl font-bold text-center my-4 text-blue-600">
          What do you want to do today?
        </h1>
        <div className="flex-grow flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-3xl h-full my-2 bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col border border-gray-300">
            <div
              className={`flex-grow overflow-y-auto border border-gray-300 rounded-lg p-3 mb-4 h-80 flex ${
                messages.length !== 0 ? "flex-col-reverse" : ""
              }`}
            >
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Select a question below to get started.
                </p>
              ) : (
                <div>
                {messages.map((msg, index) => (
                  <div
                      key={index}
                      className={
                        msg.sender === "You"
                          ? "text-right my-2"
                          : "text-left my-2"
                      }
                    >
                      <p
                        className={`p-2 rounded-lg inline-block shadow-md  ${
                          msg.sender === "You"
                            ? "bg-blue-500 text-white "
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Suggested Questions Section */}
            <div className="mb-4">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-4 mb-4">
                {["Personal", "Medical", "Business"].map((category) => (
                  <button
                    key={category}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowMore(false); // Reset "More" state on category change
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="font-semibold text-gray-600">
                Suggested Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(questionData[selectedCategory].default).map(
                  (question, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                      onClick={() => handleSend(question)}
                    >
                      {question}
                    </button>
                  )
                )}

                {/* Show More Questions */}
                {showMore &&
                  Object.keys(questionData[selectedCategory].more).map(
                    (question, index) => (
                      <button
                        key={`more-${index}`}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                        onClick={() => handleSend(question)}
                      >
                        {question}
                      </button>
                    )
                  )}
                <button
                  className="px-4 py-2 bg-gray-400 text-white text-sm rounded-lg hover:bg-gray-500"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Hide" : "More"}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="I want to…"
                className="flex-grow border-2 border-gray-300 bg-white p-3 rounded-lg text-gray-900 outline-none"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 flex items-center"
                onClick={sendMessage}
              >
                <IoSend style={iconStyles} />
              </button>
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-3"
                onClick={startEC2Instance}
              >
                {isRunning ? "Stop" : "Start"} Server
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
