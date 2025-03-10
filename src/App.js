import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import LoginRedirect from "./component/login/LoginRedirect";
import ChatBox from "./chatBox";
import { useEffect } from "react";
import AuthCheck from './component/login/authCheck';
import DummyChatBox from './component/dummyChat';
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionState = urlParams.get("session_state");
  const code = urlParams.get("code");

  useEffect(() => {
    console.log("Session State:", sessionState);
    console.log("Code:", code);
  }, [sessionState, code]);

  return (
    <Router>
      <Routes>
        {/* {code ? (
          <Route path="/" element={<ChatBox />} />
        ) : (
          <Route path="/" element={<LoginRedirect />} />
        )}
        <Route path="/auth-check" element={<AuthCheck />} /> */}
        {/* <Route path="/" element={<ChatBox />} /> */}
        <Route path="/" element={<ChatBox />} />

        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;


