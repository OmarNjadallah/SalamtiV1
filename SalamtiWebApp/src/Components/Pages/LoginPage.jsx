import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Config/Firebase";
import InputField from "../Common/Inputfeid";
import Button from "../Common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed: " + err.message);

      // Set a timeout to clear the error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Background Layers */}
      <div class="absolute top-[35%] -left-[97%] w-[350vh] h-[350vh] bg-black rotate-45 z-50"></div>
      <div class="absolute top-[115%]  -right-[87%] w-[350vh] h-[350vh] bg-black  rotate-45 opacity-90 z-10 "></div>
      <div class="absolute top-[95%]  -right-[87%] w-[350vh] h-[350vh] bg-black  rotate-45 opacity-55 z-20"></div>

      <div class="absolute top-[75%]  -right-[87%] w-[350vh] h-[350vh] bg-black rotate-45 opacity-35 z-30"></div>
      <div class="absolute top-[55%]  -right-[87%] w-[350vh] h-[350vh] bg-[#1CB793] opacity-90 rotate-45 "></div>
      {/* Error Message */}
      {error && (
        <div className="absolute top-10 w-full max-w-md px-4 text-center">
          <p className="text-red-600 bg-white p-2 rounded-md shadow-md">
            {error}
          </p>
        </div>
      )}
      {/* Form Content */}
      <div className="relative z-[100000] flex flex-col items-center justify-center w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Salamti
        </h2>
        <form onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 placeholder-gray-400 mb-4"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 placeholder-gray-400 mb-6"
          />
          <Button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-full hover:bg-custom-dark-gray transition duration-300"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Login;
