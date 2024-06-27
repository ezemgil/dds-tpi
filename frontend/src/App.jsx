import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import AcercaDe from "./pages/AcercaDe";
import Peliculas from "./pages/Peliculas";
import Cineastas from "./pages/Cineastas";
import DetallePelicula from "./pages/DetallePelicula";
import DetalleCineasta from "./pages/DetalleCineasta";
import Admin from "./pages/Admin";
import RequireAuth from "./components/RequireAuth";

function App() {
  const location = useLocation();
  const excludedRoutes = ["/login", "/admin"];

  return (
    <div className="d-flex flex-column vh-100">
      {!excludedRoutes.includes(location.pathname) ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} />
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
