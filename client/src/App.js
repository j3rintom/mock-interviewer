import ReactDOM from "react-dom/client";
import {  Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./firebase/Protected";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";


export default function App() {
  return (<div>
  <AuthContextProvider>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
      </Routes>
  </AuthContextProvider>
  </div>
  );
}

