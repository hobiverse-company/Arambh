import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import navLinks from "./data/navData";
import Home from "./pages/Home";
import Registration from "./pages/Registration/Registration";
import SportDetail from "./pages/SportDetail/SportDetail";
import AllSports from "./pages/AllSports/AllSports";
import FeesAwards from "./pages/FeesAwards/FeesAwards";
import Schedule from "./pages/Schedule/Schedule";
import Committee from "./pages/Committee/Committee";

function App() {
  return (
    <>
      <Navbar links={navLinks} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/sports" element={<AllSports />} />
        <Route path="/sport/:sportId" element={<SportDetail />} />
        <Route path="/fees-awards" element={<FeesAwards />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/committee" element={<Committee />} />
      </Routes>
    </>
  );
}

export default App;
