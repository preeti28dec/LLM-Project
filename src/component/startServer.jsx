import React, { useState } from "react";

const StartEC2 = () => {
  const [status, setStatus] = useState("start");
  const [response, setResponse] = useState("");

  const startEC2 = async () => {
    try {
      const startApiUrl = "https://53pspabkjc.execute-api.us-west-2.amazonaws.com/dev/control?action=ec2&value=start";
      const res = await fetch(startApiUrl, { method: "POST" });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.text();
      setResponse("EC2 Started: " + data);

      // Call WebSocket after EC2 starts
      sendWebSocketMessage();
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const sendWebSocketMessage = () => {
    const socket = new WebSocket(
      "ws://ec2-44-246-112-244.us-west-2.compute.amazonaws.com:5000/streaming_query/wXZjHqfgCvxDXit8zECiOaxB6m6RMSFPM7T1SRFB88366fbcf5ca9676e9de72ba01b98f100349c763717f3eb6aafeade9e4107a72"
    );
    socket.onopen = () => {
      console.log("WebSocket connected!");
      const message = { query: "hello im niam" };
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setResponse((prev) => prev + "\nMessage Response: " + event.data);

      // Close WebSocket and stop EC2 after message is sent
      socket.close();
      stopEC2();
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed.");
    };
  };

  const stopEC2 = async () => {
    try {
      const stopApiUrl = "https://53pspabkjc.execute-api.us-west-2.amazonaws.com/dev/control?action=ec2&value=stop";
      const res = await fetch(stopApiUrl, { method: "POST" });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.text();
      setResponse((prev) => prev + "\nEC2 Stopped: " + data);
    } catch (error) {
      setResponse((prev) => prev + `\nError: ${error.message}`);
    }
  };

  return (
    <div>
      <button 
        onClick={startEC2}
        className="bg-blue-600 hover:bg-blue-700 font-medium text-white rounded-lg px-5 py-3 w-full sm:w-auto"
      >
        Start EC2 & Send Message
      </button>
      <p>Response:</p>
      <pre>{response}</pre>
    </div>
  );
};

export default StartEC2;
