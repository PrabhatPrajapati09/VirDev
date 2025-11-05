import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const doLogout = async () => {
      await fetch("http://localhost:8800/api/logout", {
        method: "POST",
        credentials: "include"
      });
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    };
    doLogout();
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
