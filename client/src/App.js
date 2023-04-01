
import {  Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./firebase/Protected";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Evaluation from "./pages/Evaluation/Evaluation";


export default function App() {
  return (<div>
  <AuthContextProvider>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/evaluation" element={<Protected><Evaluation /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
      </Routes>
  </AuthContextProvider>
  </div>
  );
}

