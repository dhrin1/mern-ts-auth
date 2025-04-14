import { Route, Routes } from "react-router-dom";
import { VerifyEmail } from "./pages/verify-email";

import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";

export default function App() {
  return (
    <Routes>
      <Route path="/">Home</Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/email/verify/:code" element={<VerifyEmail />}></Route>
      <Route path="/password/forgot" element={<ForgotPassword />}></Route>
    </Routes>
  );
}
