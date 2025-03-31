import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔄 Sending login request...");

      const response = await fetch(`${API_URL}/buyer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json(); // ✅ Ensure JSON parsing is correct
      } catch (jsonError) {
        throw new Error("Login API did not return valid JSON.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      console.log("✅ Login Successful:", data);
      alert("✅ Login successful");
      localStorage.setItem("buyerId", data.buyerId);  
      localStorage.setItem("loginToken", data.token);

      setEmail("");
      setPassword("");

      // ✅ Fetch buyer details after login
      if (data.buyerId) {
        console.log("🔍 Fetching buyer details...");
        const buyerResponse = await fetch(`${API_URL}/buyer/single-buyer/${data.buyerId}`);

        let buyerData;
        try {
          buyerData = await buyerResponse.json(); // ✅ Ensure JSON parsing is correct
        } catch (buyerJsonError) {
          throw new Error("Buyer API response is not in JSON format.");
        }

        if (!buyerResponse.ok) {
          throw new Error(buyerData.error || "Failed to fetch buyer details.");
        }

        console.log("✅ Buyer Details Fetched:", buyerData);
        
      }

      // ✅ Redirect to home page ("/") after successful login
      navigate("/shop");

    } catch (error) {
      console.error("🚨 Login Failed:", error);
      alert(`❌ Login Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading && (
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p>Logging in... Please wait</p>
        </div>
      )}
      {!loading && (
        <form className="authForm" onSubmit={loginHandler} autoComplete="off">
          <h3>Buyer Login</h3>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          /><br />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          /><br />
          <span className="showPassword" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </span>
          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
