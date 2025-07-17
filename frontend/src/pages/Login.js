import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const payload = isSignup ? { name, email, password } : { email, password };
      const res = await API.post(endpoint, payload);
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) localStorage.setItem("token", user.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isSignup && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p className="login-toggle" onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </p>
    </div>
  );
}

export default Login;
