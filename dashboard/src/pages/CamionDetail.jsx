import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function CamionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [capteurs, setCapteurs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCapteurs = async () => {
            try {
                const { data } = await api.get(`/capteurs/camion/${id}`);
                setCapteurs(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCapteurs();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-xl font-bold text-blue-400">ColdChain Monitor</h1>
                <button onClick={() => navigate("/dashboard")} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">
                    Retour
                </button>
            </nav>

            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Camion {id}</h2>

                {loading ? (
                    <p className="text-gray-400">Chargement...</p>
                ) : capteurs.length === 0 ? (
                    <p className="text-gray-400">Aucun capteur pour ce camion.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {capteurs.map(capteur => (
                            <div key={capteur.id} className={`rounded-lg p-4 border ${capteur.temperature > 4 ? "bg-red-900 border-red-700" : "bg-gray-800 border-gray-700"}`}>
                                <h3 className="font-bold mb-2">{capteur.id}</h3>
                                <p className="text-sm">Température : <span className={capteur.temperature > 4 ? "text-red-400 font-bold" : "text-green-400"}>{capteur.temperature}°C</span></p>
                                <p className="text-sm">Humidité : {capteur.humidite}%</p>
                                <p className="text-sm">Clim : <span className={capteur.statut_clim ? "text-green-400" : "text-red-400"}>{capteur.statut_clim ? "Active" : "Coupée"}</span></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CamionDetail;