import React from "react";
import { Routes, Route } from "react-router-dom";

import THome from "./assets/pages/THome";
import DeleteRecord from "./assets/pages/deleteRecords";
import Home from "./assets/pages/THome";
import CreateRecord from "./assets/pages/createRecord";
import EditRecord from "./assets/pages/editRecords";
import ShowRecord from "./assets/pages/showRecord";

import Login from "./assets/pages/User/Login";
import Register from "./assets/pages/User/Register";
import AdminDashboard from "./assets/pages/Admin/adminDashboard";
import Profile from "./assets/pages/User/UserProfile";
import UpdatePet from "./assets/pages/User/PetUpdate";
import VeterinarianRegistration from "./assets/pages/Admin/vetRegister";
import VeterinarianDashboard from "./assets/pages/User/vetDashboard";
import VetProfile from "./assets/pages/User/vetProfile";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thome" element={<THome />} />
      <Route path="/create" element={<CreateRecord />} />
      <Route path="/edit/:id" element={<EditRecord />} />
      <Route path="/delete/:id" element={<DeleteRecord />} />
      <Route path="/show/:id" element={<ShowRecord />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/pet/:id/edit" element={<UpdatePet />} />
      <Route path="/vetnarian" element={<VeterinarianRegistration />} />
      <Route path="/veterinarian-dashboard" element={<VeterinarianDashboard />} />
      <Route path="/vet-profile" element={<VetProfile />} />

    </Routes>
  );
};

export default App;
