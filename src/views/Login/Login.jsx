import logo from "../../logo.svg";
import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getAuth } from "../../auth/auth";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("user") !== null &&
      sessionStorage.getItem("pwd") !== null
    ) {
      navigate("/admin");
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          user,
          pwd,
        },
        {
          getAuth,
        }
      );
      const data = await response.data;
      if (data.indexOf(user) > -1) {
        const hashedUser = user;
        // saving cookies
        // user
        sessionStorage.setItem("user", hashedUser);
        // saving password
        sessionStorage.setItem("pwd", pwd);
      } else setError(data);
    } catch (e) {
      console.log(e);
      setError(String(e));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>SOD - Secure</h1>
          <form id="login" onSubmit={submit}>
            <div className="form-control">
              <label>User id</label>
              <input
                id="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                id="pwd"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            {error !== "" && (
              <div className="form-control">
                <label className="error">{error}</label>
              </div>
            )}

            <div>
              <button type="submit">Entrar</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Login;
