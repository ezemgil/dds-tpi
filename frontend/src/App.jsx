import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

import RequireAuth from "./components/RequireAuth";
import AcercaDe from "./pages/AcercaDe";
import Admin from "./pages/Admin";
import Cineastas from "./pages/Cineastas";
import DetalleCineasta from "./pages/DetalleCineasta";
import DetallePelicula from "./pages/DetallePelicula";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Peliculas from "./pages/Peliculas";


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
