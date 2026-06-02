import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Dashboard() {
    const [camions, setCamions] = useState([]);
    const [capteurs, setCapteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [camionsRes, capteursRes] = await Promise.all([
                    api.get("/camions"),
                    api.get("/capteurs")
                ]);
                setCamions(camionsRes.data.data);
                setCapteurs(capteursRes.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const alertes = capteurs.filter(c => c.temperature > 4 || c.statut_clim === false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-xl font-bold text-blue-400">ColdChain Monitor</h1>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">
                    Déconnexion
                </button>
            </nav>

            <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                        <p className="text-3xl font-bold text-blue-400">{camions.length}</p>
                        <p className="text-gray-400 text-sm mt-1">Camions</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                        <p className="text-3xl font-bold text-green-400">{capteurs.length}</p>
                        <p className="text-gray-400 text-sm mt-1">Capteurs</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                        <p className="text-3xl font-bold text-red-400">{alertes.length}</p>
                        <p className="text-gray-400 text-sm mt-1">Alertes</p>
                    </div>
                </div>

                {alertes.length > 0 && (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
                        <h2 className="font-bold text-red-400 mb-2">Alertes actives</h2>
                        {alertes.map(c => (
                            <div key={c.id} className="text-sm text-red-300 py-1">
                                {c.id} — Temp: {c.temperature}°C
                                {c.statut_clim === false && " — Clim coupée"}
                            </div>
                        ))}
                    </div>
                )}
                

                <h2 className="text-xl font-semibold mb-4">Températures des capteurs</h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={capteurs.map(c => ({ name: c.id, temperature: c.temperature }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
                            <Bar dataKey="temperature" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <h2 className="text-xl font-semibold mb-4 mt-6">Position des camions</h2>
                <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6" style={{ height: "400px" }}>
                    <MapContainer center={[36.8065, 10.1815]} zoom={7} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {camions.map(camion => (
                            camion.latitude && camion.longitude && (
                            <Marker key={camion.id} position={[camion.latitude, camion.longitude]}>
                                <Popup>{camion.id} — {camion.chauffeur}</Popup>
                            </Marker>
                            )
                            ))}
    </MapContainer>
</div>

                <h2 className="text-xl font-semibold mb-4">Flotte de camions</h2>
                {loading ? (
                    <p className="text-gray-400">Chargement...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {camions.map(camion => (
                            <div
                                key={camion.id}
                                onClick={() => navigate(`/camions/${camion.id}`)}
                                className="bg-gray-800 rounded-lg p-4 border border-gray-700 cursor-pointer hover:border-blue-500 transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">{camion.id}</h3>
                                    <span className="bg-green-500 text-xs px-2 py-1 rounded-full">Actif</span>
                                </div>
                                <p className="text-gray-400 text-sm">Chauffeur : {camion.chauffeur}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;