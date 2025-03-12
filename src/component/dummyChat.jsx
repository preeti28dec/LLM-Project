import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import Header from "./header/index";
import MyComponent from "./login/authCheck";
import parse from "html-react-parser";


export default function DummyChatBox({ codeData }) {
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  let iconStyles = { fontSize: "1.5em" };
  const [socket, setSocket] = useState(null);
  const [tokenData, setTokenData] = useState(
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCWDZTQUQ4b3pmc3hVbndLNjY3cHdXeXJybVZGbEM4M0NmcnhDR0hfckpJIn0.eyJleHAiOjE3NDE3MDE0NzMsImlhdCI6MTc0MTcwMTE3MywiYXV0aF90aW1lIjoxNzQxNzAxMTI1LCJqdGkiOiI2Mzg4ZTkwZC0xNmEzLTRlZTItYjIwNS1kOWU1NWI0MTg3MWQiLCJpc3MiOiJodHRwczovL2lhbW9ubGluZS5hcHAvYXV0aC9yZWFsbXMvaWFtb25saW5lIiwic3ViIjoiZWYyMGMxZmUtYzJiZS00NWNjLTg0MTEtMTZkYjNmYTRkOTg0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWFtRGVtbyIsIm5vbmNlIjoiMzIxMjMiLCJzZXNzaW9uX3N0YXRlIjoiN2FlNzg4MDAtMDI3Yy00YWJjLTg4NjItMWYxNjEyNjgzZWJhIiwiYWNyIjoiMSIsInNjb3BlIjoib3BlbmlkIGJpcnRoZGF0ZSB6b25laW5mbyBhZGRyZXNzIGdlbmRlciBwcm9maWxlIGVtYWlsIiwiem9uZWluZm8iOiJBc2lhL0tvbGthdGEiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiUi0xOCAzcmQgZmxvb3IgcHJpdmF0ZSBjb2xvbnkgc3JpIG5pd2FzIHB1cmkgIiwibG9jYWxpdHkiOiJOZXcgRGVsaGkiLCJyZWdpb24iOiJJTiIsInBvc3RhbF9jb2RlIjoiMTEwMDY1IiwiY291bnRyeSI6IkluZGlhIn0sImJpcnRoZGF0ZSI6IjIwMDAtMTItMjgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZ2VuZGVyIjoiRmVtYWxlIiwibmFtZSI6InByZWV0aSB0aGFrdXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwcmVldGkyOGRlYyIsImdpdmVuX25hbWUiOiJwcmVldGkiLCJmYW1pbHlfbmFtZSI6InRoYWt1ciIsImVtYWlsIjoib2ZmaWNpYWxwcmVldGl0aGFrdXJAZ21haWwuY29tIn0.jt1lGsE1cdTZGGKGJmKw49Kud-axheP3tXt4pInh2508PiVFtuibzfF1Qp4eZt0SvjwctPd3_vrY8kE1LAMg8mhlX0dUg4rBohIio43xOHVXlLV7t88DJjDzfBvkAW7t3CPeViCWrD-XyKPDexjASfyOVQiy1lwgusCvIEOElUMOYJ6ja_hWjj1N7ki0LDz3ZvQP8ew4m7Px8dZNTB9HzZfMDSQ3YVDz2Mer4z0lxM6HNDdvgM9WjkYoywEslUQJ4L3iJSUACC3o_TZRUEuQlKLkvoY-z0lJQLfEHxEw0e25BZiZ6vJzpG9mGXXkKMLLpYZvxn3nwX875LR_9wPwIw"
  );
  const [accessToken, setaccessToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWI5OTA3YmZlMGFjM2NmODUyYTg4OWFhOWE0ZTNhM2EiLCJpYXQiOjE3NDE3OTY3MTEsImV4cCI6MTc0MTc5ODUxMX0.BVmKmTaDTb0nVJHf9hWRf6kT0caGlecV7j1tK1AP23U"
  );
  const [userId, setuserId] = useState("9b9907bfe0ac3cf852a889aa9a4e3a3a");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  console.log(codeData, "codeData", messages);

  // useEffect(() => {
  //   const AccessToken = async () => {
  //     try {
  //       const res = await fetch("https://mypbot.com:4444/v5/llm-auth/generate-token", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         mode: "no-cors",
  //         body: JSON.stringify({ "accessToken": tokenData }),
  //       });
  //       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  //       const responseData = await res.json();
  //       if (responseData.success) {
  //         setuserId(responseData.data.user_id);
  //         setaccessToken(responseData.data.access_token);
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };
  //   AccessToken();
  // }, []);

  // useEffect(() => {
  //   if (!codeData) return;
  //   const fetchToken = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://iamonline.app/auth/realms/iamonline/protocol/openid-connect/token",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //                       },
  //           body: new URLSearchParams({
  //             grant_type: "authorization_code",
  //             code: codeData,
  //             client_id: "iamDemo",
  //             client_secret: "5f39f619-a2c2-4699-8f29-6d22311ed654",
  //             redirect_uri: "https://localhost",
  //           }),
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setTokenData(data);
  //       console.log(data, "Token Data");
  //     } catch (error) {
  //       console.log("Error fetching token:", error);
  //     }
  //   };
  //   fetchToken();

  // }, []);

  // const webSocketValue = (value) => {
  //   const ws = new WebSocket(
  //     `ws://ec2-50-112-255-124.us-west-2.compute.amazonaws.com:5000/streaming_query?user_id=${userId}&access_token=${accessToken}`
  //   );
  //   let messageBuffer = "";
  //   ws.onmessage = (event) => {
  //     const parsedData = JSON.parse(event.data);
  //     if (parsedData.content === "Empty Response" || parsedData.content.length === 0) {
  //       setMessages((prev) => [
  //           ...prev,
  //           { text: messageBuffer, sender: "bot" }, // Send collected message
  //       ]);
  //       messageBuffer = ""; // Reset the buffer after sending
  //   } else {
  //       messageBuffer += parsedData.content; // Append only if valid content
  //   }
    
  //   };

  //   ws.onopen = () => {
  //     console.log("Connected to WebSocket");
  //     const queryData = JSON.stringify({ query: value});
  //     ws.send(queryData);
  //   };
  //   ws.onclose = () => console.log("WebSocket disconnected");
  //   setSocket(ws);
  //   return () => ws.close();
  // };

  const webSocketValue = (value) => {
    const ws = new WebSocket(
      `ws://ec2-50-112-255-124.us-west-2.compute.amazonaws.com:5000/streaming_query?user_id=${userId}&access_token=${accessToken}`
    );
    let messageBuffer = "";

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "error" && parsedData.content.includes("CUDA out of memory")) {
          setMessages((prev) => [
            ...prev,
            { text: "Sorry, there is a server issue. Please try again later.", sender: "bot" }
          ]);
          return;
        }
        if (parsedData.content === "Empty Response" || parsedData.content.length === 0) {
          setMessages((prev) => [
            ...prev,
            { text: messageBuffer, sender: "bot" },
          ]);
          messageBuffer = "";
        } else {
          messageBuffer += parsedData.content; 
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      const queryData = JSON.stringify({ query: value });
      ws.send(queryData);
    };

    ws.onclose = () => console.log("WebSocket disconnected");
    
    setSocket(ws);
    return () => ws.close();
};


  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "You" };
    setMessages([...messages, newMessage]);
    // const queryData = JSON.stringify({ query: input });
    // socket?.send(queryData);
    setInput("");
    webSocketValue(input);
  };

  const handleSend = (message = input) => {
    console.log(socket,'socket');
    if (message.trim()) {
      const userMessage = { id: Date.now(), text: message, sender: "You" };
      const botResponse =
        questionData[selectedCategory].default[message] ||
        questionData[selectedCategory].more?.[message] ||
        "I'm not sure about that.";
      // const botMessage = {
      //   id: Date.now() + 1,
      //   text: botResponse,
      //   sender: "Bot",
      // };
      // setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      sendMessage(input);
      // const queryData = JSON.stringify({ query: message });
      // socket?.send(queryData);
      webSocketValue(message);

      setInput("");
    }
  };

  const startEC2Instance = async () => {
    setIsRunning((prev) => !prev);
    const startApiUrl = `https://53pspabkjc.execute-api.us-west-2.amazonaws.com/dev/control?action=ec2&value=${
      isRunning ? "stop" : "start"
    }&instance=${isRunning ? "ollama" : "ingestion"}`;
    try {
      const response = await fetch(startApiUrl, { method: "POST" });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      //console.log("EC2 Instance Started:", data);
    } catch (error) {
      console.log("Error starting EC2 instance:", error.message);
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
 

const formatMessageContent = (text) => {
  if (!text) return "";
  text = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="text-blue-600 underline">$1</a>'
  );
  text = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  text = text.replace(/(\d+)\.\s(.*?)(?=\n|$)/g, "<li>$2</li>");
  text = text.replace(/(-|\*)\s(.*?)(?=\n|$)/g, "<li>$2</li>");
  if (text.includes("<li>")) {
    text = `<ul class="list-disc ml-4">${text}</ul>`;
  }
  text = text.replace(/\n/g, "<br>");
  return text;
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
                          ? "text-right my-3"
                          : "text-left my-3"
                      }
                    >
                      <p
                        className={`p-2 rounded-lg inline-block shadow-md  ${
                          msg.sender === "You"
                            ? "bg-blue-500 text-white "
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        {parse(formatMessageContent(msg.text))}
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
                className={`${
                  isRunning
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }  text-white rounded-lg px-4 py-3`}
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
