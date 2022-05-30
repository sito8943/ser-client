import logo from "../../logo.svg";
import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { getAuth } from "../../auth/auth";

const Admin = () => {
  const navigate = useNavigate();

  const [dataTypes, setDataTypes] = useState([]);

  useEffect(() => {
    if (
      sessionStorage.getItem("user") === null ||
      sessionStorage.getItem("pwd") === null
    ) {
      navigate("/login");
    } else init();
  }, []);

  const init = async () => {
    const response = await axios.get("http://localhost:8000/admin/all", {
      getAuth,
    });
    const data = await response.data;
    setDataTypes(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    const user = sessionStorage.getItem("user");
    const pwd = sessionStorage.getItem("pwd");
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>SOD - Admin</h1>
          <form id="login" onSubmit={submit}>
            <div className="form-control">
              <label>Data types</label>
              <select>
                {dataTypes.map((item, i) => (
                  <option>{item}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label>Password</label>
            </div>
            <div>
              <button type="submit">Entrar</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Admin;
