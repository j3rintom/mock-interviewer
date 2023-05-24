
import {  Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./firebase/Protected";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Evaluation from "./pages/Evaluation/Evaluation";
import PreInterview from "./pages/PreInterview/PreInterview"
import Interview from "./pages/Interview/Interview"
import Finish from "./pages/Finish/Finish";

export default function App() {
  return (<div>
  <AuthContextProvider>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/evaluation" element={<Protected><Evaluation /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path='/interview/:id' element={<Protected><PreInterview /></Protected>} />
        <Route path='/interview/:id/start' element={<Protected><Interview /></Protected>} />
        <Route path='/interview/:id/finish' element={<Protected><Finish /></Protected>} />
      </Routes>
  </AuthContextProvider>
  </div>
  );
}

