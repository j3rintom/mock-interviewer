import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

export default function App() {
  return (<>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);