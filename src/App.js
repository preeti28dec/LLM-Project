import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import LoginRedirect from "./component/login/LoginRedirect";
import ChatBox from "./chatBox";
import { useEffect, useState } from "react";
import MyComponent from "./component/login/authCheck";
import DummyChatBox from "./component/dummyChat";
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionState = urlParams.get("session_state");
  const codeData = urlParams.get("code");
  //console.log(codeData,'code url');
  return (
    <Router>
      <Routes>
        <Route path="/" element={codeData ? <DummyChatBox codeData={codeData}/> : <LoginRedirect />} />
        {/* <Route path="/" element={<DummyChatBox codeData={codeData}/>} /> */}
        <Route path="/auth-check" element={<DummyChatBox codeData={codeData}/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
