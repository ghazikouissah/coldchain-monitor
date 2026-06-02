import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CamionDetail from "./pages/CamionDetail";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/camions/:id" element={<ProtectedRoute><CamionDetail /></ProtectedRoute>} />
                  </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;