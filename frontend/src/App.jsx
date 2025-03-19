import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import About from "./assets/pages/about";
import Header from "./assets/components/Header";
import PetRecord from "./assets/pages/PetRecord";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/PetRecord" element={<PetRecord/>} />
      </Routes>
    </BrowserRouter>
  );
}