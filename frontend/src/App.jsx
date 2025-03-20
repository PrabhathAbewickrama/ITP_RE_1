
/*

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


*/


import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import DeleteRecord from "./assets/pages/deleteRecords";
import CreateRecord from "./assets/pages/createRecord";
import EditRecord from "./assets/pages/editRecords";
import ShowRecord from "./assets/pages/showRecord";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateRecord />} />
      <Route path="/edit/:id" element={<EditRecord />} />
      
      <Route path="/delete/:id" element={<DeleteRecord />} />
      <Route path="/show" element={<ShowRecord />} />

    </Routes>
  );
}

export default App;

