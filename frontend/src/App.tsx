import React from "react";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/signin" element={<SigninPage />} />
      <Route path="/main" element={<MainPage />} /> */}
    </Routes>
  );
}

export default App;
