import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import ModalDialog from "./components/ModalDialog";

import RequireAuth from "./components/RequireAuth";
import AcercaDe from "./pages/AcercaDe";
import Admin from "./pages/Admin";
import Cineastas from "./pages/Cineastas";
import DetalleCineasta from "./pages/DetalleCineasta";
import DetallePelicula from "./pages/DetallePelicula";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Peliculas from "./pages/Peliculas";
import Offline from "./pages/Offline";

import { useEffect, useState } from "react";
import getStatus from "./services/status.service";


function App() {
    const [Status, setStatus] = useState(null);

    const fetchStatus = async () => {
        const response = await getStatus();
        setStatus(response.status);
    };

    useEffect(() => {
        fetchStatus();
    });
    const location = useLocation();
    const excludedRoutes = ["/login", "/admin"];

    return (
        <div className="d-flex flex-column vh-100">
            <ModalDialog />
            {!excludedRoutes.includes(location.pathname) ? <Navbar /> : null}
            <Routes>
                <Route path="/" element={<Navigate to="/inicio" />} />
                <Route path="/inicio" element={Status === 200 ? <Inicio /> : <Offline />} />
                <Route path="/acerca-de" element={<AcercaDe />} />
                <Route path="/login" element={<Login />} />
                <Route path="/peliculas" element={<Peliculas />} />
                <Route path="/cineastas" element={<Cineastas />} />
                <Route path="/pelicula/:id" element={<DetallePelicula />} />
                <Route path="/cineasta/:id" element={<DetalleCineasta />} />
                <Route
                    path="/admin"
                    element={
                        <RequireAuth>
                            <Admin />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {!excludedRoutes.includes(location.pathname) ? <Footer /> : null}
        </div>
    );
}

export default App;
