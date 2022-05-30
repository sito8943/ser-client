import logo from "../../logo.svg";
import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { getAuth } from "../../auth/auth";

const Admin = () => {
  const navigate = useNavigate();

  const [dataTypes, setDataTypes] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState(0);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(0);

  const onDataTypeChange = async (e) => {
    console.log(dataTypes[e.target.value]);
    setSelectedDataType(e.target.value);
    const response = await axios.get(
      `http://localhost:8000/admin/fetch?what=${dataTypes[e.target.value]}`,
      {
        getAuth,
      }
    );
    const data = await response.data;
    console.log(data);
    const justNames = [];
    data.forEach((item) => {
      console.log(item);
      justNames.push(item.id ? item.id : item.name);
    });
    setModels(justNames);
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("user") === null ||
      sessionStorage.getItem("pwd") === null
    ) {
      navigate("/login");
    } else init();
  }, []);

  const init = async () => {
    let response = await axios.get("http://localhost:8000/admin/all", {
      getAuth,
    });
    let data = await response.data;
    setDataTypes(data);
    response = await axios.get("http://localhost:8000/admin/fetch?what=users", {
      getAuth,
    });
    data = await response.data;
    const justNames = [];
    data.forEach((item) => {
      console.log(item);
      justNames.push(item.id ? item.id : item.name);
    });
    setModels(justNames);
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
        <div className="form">
          <h1>SOD - Admin</h1>
          <form id="login" onSubmit={submit}>
            <div className="form-control">
              <label>Data types</label>
              <select value={selectedDataType} onChange={onDataTypeChange}>
                {dataTypes.map((item, i) => (
                  <option key={i} value={i}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label>{dataTypes[selectedDataType]}</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {models.map((item, i) => (
                  <option key={i} value={i}>
                    {item}
                  </option>
                ))}
              </select>
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
