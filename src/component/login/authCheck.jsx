import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCheck() {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(urlParams, "urlParams");

    if (code) {
      navigate("/chat");
    } else if (code) {
      const formData = new URLSearchParams();
      formData.append("grant_type", "authorization_code");
      formData.append("code", code);
      formData.append("client_id", "iamDemo");
      formData.append("client_secret", "5f39f619-a2c2-4699-8f29-6d22311ed654");
      formData.append("redirect_uri", "https://localhost:3000/chat");  // Match OAuth settings
      fetch("https://iamonline.app/auth/realms/iamonline/protocol/openid-connect/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");
          if (data.access_token) {
            localStorage.setItem("authToken", data.access_token);
            navigate("/chat");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>Checking authentication...</div>;
}

export default AuthCheck;
