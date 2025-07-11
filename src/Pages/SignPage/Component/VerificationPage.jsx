import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {userSignUp} from "../Code/SignUpData"
import { toast } from "react-toastify";
function VerificationPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, password } = location.state || {};

  useEffect(() => {
    if (email) {
      sendCode();
    }
  }, [email]);

  useEffect(() => {
    if (timeLeft > 0 && isCodeValid) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCodeValid(false);
    }
  }, [timeLeft, isCodeValid]);

  const sendCode = async () => {
    if (!email) {
      setError("No email provided.");
      return;
    }
    console.log("Verification code sent to email:", email);
    try {
      const response = await fetch("http://127.0.0.1:8000/users/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email }),
      });
      if (!response.ok) throw new Error("Failed to send code");
      console.log("Verification code sent to email:", email);
    } catch (error) {
      console.error("Error sending verification code:", error);
      setError("Failed to send verification code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isCodeValid) {
      setError("Code expired. Please resend.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/checkCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, code: code }),
      });

      const result = await response.json();
      if (response.ok && result.message === "Email verified successfully") {
        setSubmitted(true);
        const signUpResponse = await userSignUp(email, name, password);
        if (signUpResponse) {
          console.log("Sign-up successful:", signUpResponse);
          localStorage.setItem("userId", signUpResponse.user_id);
          localStorage.setItem("userRole", signUpResponse.role);
          localStorage.setItem("userName", signUpResponse.user_name);
          localStorage.setItem("userAvatar", signUpResponse.avatar);
          window.dispatchEvent(new Event("storage"));
          toast.success("sign-up successful!", { containerId: "sign-container" });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        } else {
          toast.error("Sign-up failed. Please try again.", { containerId: "sign-container" });
        }
         
      } else {
        toast.error("Invalid or expired code.", { containerId: "sign-container" });
        setError("Invalid or expired code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError("Verification failed.");
    }
  };

  const handleResend = () => {
    sendCode();
    setTimeLeft(60);
    setIsCodeValid(true);
    setCode("");
  };

  const handleBack = () => {
    navigate("/signup");
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow-md rounded-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Enter Verification Code</h2>
      <p className="text-gray-600 mb-2">Verification code sent to: {email}</p>
      <p className="text-gray-600 mb-4">
        {isCodeValid ? `Code expires in: ${timeLeft}s` : "Code expired. Resend below."}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
          disabled={!isCodeValid}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className={`w-1/2 py-2 rounded-md transition ${
              isCodeValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isCodeValid}
          >
            Verify
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-1/2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={handleResend}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Resend Email
      </button>
      {submitted && <div className="mt-4 text-green-600 font-medium">✅ Code submitted!</div>}
    </div>
  );
}

export default VerificationPage;
