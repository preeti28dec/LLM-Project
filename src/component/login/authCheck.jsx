import { useState, useEffect } from "react";

const MyComponent = ({ tokenData }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const AccessToken = async () => {
      try {
        const res = await fetch("https://mypbot.com:4444/v5/llm-auth/generate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify({ "accessToken": tokenData }),
        });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        console.log(data, 'generate');
        setResponse(data);
      } catch (err) {
        setError(err.message);
      }
    };
    AccessToken();
  }, []); 

  return (
    <div>
      {response ? <pre>{JSON.stringify(response, null, 2)}</pre> : "Loading..."}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MyComponent;
