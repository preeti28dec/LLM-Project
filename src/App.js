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
  const code = urlParams.get("code");
  const [tokenData, setTokenData] = useState('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCWDZTQUQ4b3pmc3hVbndLNjY3cHdXeXJybVZGbEM4M0NmcnhDR0hfckpJIn0.eyJleHAiOjE3NDE3MDE0NzMsImlhdCI6MTc0MTcwMTE3MywiYXV0aF90aW1lIjoxNzQxNzAxMTI1LCJqdGkiOiI2Mzg4ZTkwZC0xNmEzLTRlZTItYjIwNS1kOWU1NWI0MTg3MWQiLCJpc3MiOiJodHRwczovL2lhbW9ubGluZS5hcHAvYXV0aC9yZWFsbXMvaWFtb25saW5lIiwic3ViIjoiZWYyMGMxZmUtYzJiZS00NWNjLTg0MTEtMTZkYjNmYTRkOTg0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWFtRGVtbyIsIm5vbmNlIjoiMzIxMjMiLCJzZXNzaW9uX3N0YXRlIjoiN2FlNzg4MDAtMDI3Yy00YWJjLTg4NjItMWYxNjEyNjgzZWJhIiwiYWNyIjoiMSIsInNjb3BlIjoib3BlbmlkIGJpcnRoZGF0ZSB6b25laW5mbyBhZGRyZXNzIGdlbmRlciBwcm9maWxlIGVtYWlsIiwiem9uZWluZm8iOiJBc2lhL0tvbGthdGEiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiUi0xOCAzcmQgZmxvb3IgcHJpdmF0ZSBjb2xvbnkgc3JpIG5pd2FzIHB1cmkgIiwibG9jYWxpdHkiOiJOZXcgRGVsaGkiLCJyZWdpb24iOiJJTiIsInBvc3RhbF9jb2RlIjoiMTEwMDY1IiwiY291bnRyeSI6IkluZGlhIn0sImJpcnRoZGF0ZSI6IjIwMDAtMTItMjgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZ2VuZGVyIjoiRmVtYWxlIiwibmFtZSI6InByZWV0aSB0aGFrdXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwcmVldGkyOGRlYyIsImdpdmVuX25hbWUiOiJwcmVldGkiLCJmYW1pbHlfbmFtZSI6InRoYWt1ciIsImVtYWlsIjoib2ZmaWNpYWxwcmVldGl0aGFrdXJAZ21haWwuY29tIn0.jt1lGsE1cdTZGGKGJmKw49Kud-axheP3tXt4pInh2508PiVFtuibzfF1Qp4eZt0SvjwctPd3_vrY8kE1LAMg8mhlX0dUg4rBohIio43xOHVXlLV7t88DJjDzfBvkAW7t3CPeViCWrD-XyKPDexjASfyOVQiy1lwgusCvIEOElUMOYJ6ja_hWjj1N7ki0LDz3ZvQP8ew4m7Px8dZNTB9HzZfMDSQ3YVDz2Mer4z0lxM6HNDdvgM9WjkYoywEslUQJ4L3iJSUACC3o_TZRUEuQlKLkvoY-z0lJQLfEHxEw0e25BZiZ6vJzpG9mGXXkKMLLpYZvxn3nwX875LR_9wPwIw');  
  console.log(code,'code url');
  useEffect(() => {
    if (!code) return;
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://iamonline.app/auth/realms/iamonline/protocol/openid-connect/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code: code,
              client_id: "iamDemo",
              client_secret: "5f39f619-a2c2-4699-8f29-6d22311ed654", 
              redirect_uri: "https://localhost",
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTokenData(data);
        console.log(data, "Token Data");
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };
    fetchToken();
   
  }, [code]);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={code ? <DummyChatBox tokenData={tokenData}/> : <LoginRedirect />} />
        <Route path="/auth-check" element={<DummyChatBox tokenData={tokenData}/>} />
        <Route path="/auth-check" element={<DummyChatBox tokenData={tokenData}/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
