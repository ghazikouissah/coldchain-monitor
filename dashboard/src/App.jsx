import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CamionDetail from "./pages/CamionDetail";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/camions/:id" element={<CamionDetail />} />
                  </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;