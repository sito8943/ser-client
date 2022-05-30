import "./App.css";
import logo from "./logo.svg";

import Login from "./views/Login/Login";
import Admin from "./views/Admin/Admin";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="home">
                  <h1>SOD - HOME</h1>
                  <h3>What is what we do?</h3>
                  <p>Just log and you will see it!</p>
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/admin">Admin</Link>
                  </div>
                </div>
              </header>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
