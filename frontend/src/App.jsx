import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import TutorialPage from "./pages/TutorialPage";
import IDE from "./pages/IDE";
import Home from "./pages/Home";
import ForgeCopilot from "./pages/ForgeCopilot";
import About from "./components/About";
import Contact from "./components/Contact";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouterHandler />
      </BrowserRouter>
    </>
  );
};

const RouterHandler = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/ide"
          element={isLoggedIn ? <IDE /> : <Navigate to={"/login"} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/editor/:id"
          element={isLoggedIn ? <Editor /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<NoPage />} />
        <Route path="/:language/:title" element={<TutorialPage />} />
        <Route path="/ai" element={<ForgeCopilot />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};
export default App;
