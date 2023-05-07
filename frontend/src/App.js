import "./app.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
