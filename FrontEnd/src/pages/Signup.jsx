import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Signup () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/signup', { username, password, email });
      setMessage(res.data.message);

      // ✅ Save tokens directly after signup
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      // ✅ Redirect straight to Todo page (no need to login again)
      navigate("/todo");
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

return (
    <div className="signup-page"> {/* ✅ Wrap everything in a page-specific class */}
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">
            Signup
          </button>
        </form>
        {message && (
          <p
            className={`signup-message ${
              message.includes("failed") || message.includes("error") ? "error" : "success"
            }`}
          >
            {message}
          </p>
        )}
        <p className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup