import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import AcercaDe from "./pages/AcercaDe";
import Peliculas from "./pages/Peliculas";
import Cineastas from "./pages/Cineastas";

import DetallePelicula from "./pages/DetallePelicula";
import DetalleCineasta from "./pages/DetalleCineasta";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/cineastas" element={<Cineastas />} />
          <Route path="/pelicula/:id" element={<DetallePelicula />} />
          <Route path="/cineasta/:id" element={<DetalleCineasta />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
