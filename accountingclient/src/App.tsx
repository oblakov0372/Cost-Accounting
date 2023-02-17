import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
