import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const formattedMessages = data.map((item) => ({
          id: item.id,
          text: item.body,
          sender: "Bot",
        }));
        setMessages(formattedMessages);
      });
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: input, sender: "You" },
      ]);
      setInput("");
    }
  };

  return (
    <div clasName="">
      <h1 className="text-3xl font-bold text-center my-4">How can I help you?</h1>
      <div>
      <div className="p-6 max-w-lg m-auto border rounded-lg shadow-md h-96">
        <div className="h-64 overflow-y-auto border p-3 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.sender === "You" ? "text-right my-2" : "text-left my-2"
              }
            >
              <p
                className={`p-2 rounded-lg inline-block ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-stretch">
          <div className="w-96">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="border-2 w-full p-2 rounded-lg"
            />
          </div>
          <div>
          <button type="button" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onClick={handleSend}>Send</button>
          </div>
        </div>
        {/* <button onClick={() => navigate("/")}>Back to Home</button> */}
      </div>
      </div>
    </div>
  );
}
