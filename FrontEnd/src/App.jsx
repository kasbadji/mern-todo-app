import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // new import
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Dashboard /> 
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
