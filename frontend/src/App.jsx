import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import About from "./assets/pages/about";
import Header from "./assets/components/Header";
export default function App() {
  return (
    <BrowserRouter>
    <header/>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}