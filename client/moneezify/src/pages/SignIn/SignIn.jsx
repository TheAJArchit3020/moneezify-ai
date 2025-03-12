import React, { useState } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../config/firebase";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmation(confirmationResult);
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      alert("Phone Number Verified!");
    } catch (error) {
      setError("Invalid OTP. Try Again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        {!confirmation ? (
          <>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <button
              onClick={sendOTP}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <button
              onClick={verifyOTP}
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignIn;
