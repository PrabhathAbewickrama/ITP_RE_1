/*
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import THome from "./assets/pages/THome";
import DeleteRecord from "./assets/pages/deleteRecords";
import Home from "./assets/pages/home";
import CreateRecord from "./assets/pages/createRecord";
import EditRecord from "./assets/pages/editRecords";
import ShowRecord from "./assets/pages/showRecord";


export default function App() {
  return (
   
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/thome" element={<THome />} />
        <Route path="/create" element={<CreateRecord />} />
        <Route path="/edit/:id" element={<EditRecord />} />

        <Route path="/delete/:id" element={<DeleteRecord />} />
        <Route path="/show/" element={<ShowRecord />} />

      </Routes>
      </BrowserRouter>
  )
}


*/
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/THome";
import DeleteRecord from "./assets/pages/deleteRecords";
import CreateRecord from "./assets/pages/createRecord";
import EditRecord from "./assets/pages/editRecords";
import ShowRecord from "./assets/pages/showRecord";
//import Header from "./assets/components/Header";




const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateRecord />} />
      <Route path="/edit/:id" element={<EditRecord />} />
      
      <Route path="/delete/:id" element={<DeleteRecord />} />
      <Route path="/show/:id" element={<ShowRecord />} />

    </Routes>
  );
}

export default App;



