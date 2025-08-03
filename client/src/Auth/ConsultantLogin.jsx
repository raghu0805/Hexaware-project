import React, { useState } from 'react';
import { Mail, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsultantLogin = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear previous error

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/consultant-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("Role", "consultant");
        navigate("/consultant");
      } else {
        setErrorMsg(result.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h2 className="text-xl font-bold">Consultant Login</h2>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          <div className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Login</span>
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultantLogin;
