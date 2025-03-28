import { useEffect } from "react";
function LoginRedirect() {
  useEffect(() => {
    const loginUrl =
      "https://iamonline.app/auth/realms/iamonline/protocol/openid-connect/auth" +
      "?client_id=iamDemo" +
      "&redirect_uri=https://localhost" +
      //"&redirect_uri=https://s6.appsolutly.com/emr/"+ 
      "&scope=openid" +
      "&response_type=code" +
      "&response_mode=query" +
      "&nonce=32123";
    window.location.href = loginUrl; 
  }, []);
  return <div>Redirecting to login...</div>;
}

export default LoginRedirect;
