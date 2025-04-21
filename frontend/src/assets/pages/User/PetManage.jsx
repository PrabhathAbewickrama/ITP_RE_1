import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const PetManagement = ({ userId, pets, onPetUpdate }) => {
  const [showPetForm, setShowPetForm] = useState(false);
  const [petFormData, setPetFormData] = useState({
    petName: '',
    species: 'Dog',
    breed: '',
    gender: 'Male',
    dateOfBirth: '',
    colorMarks: '',
    microchipNumber: ''
  });
  const [formErrors, setFormErrors] = useState({
    dateOfBirth: '',
    colorMarks: ''
  });

  const navigate = useNavigate();

  // Validation functions
  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
  };

  const validateColorMarks = (text) => {
    const regex = /^[a-zA-Z\s,.-]+$/; // Only allow letters, spaces, and basic punctuation
    return regex.test(text);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPetFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: ''
    }));

    // Validate as user types
    if (name === 'dateOfBirth' && value) {
      if (!validateDate(value)) {
        setFormErrors((prev) => ({
          ...prev,
          dateOfBirth: 'Date of birth cannot be in the future'
        }));
      }
    }

    if (name === 'colorMarks' && value) {
      if (!validateColorMarks(value)) {
        setFormErrors((prev) => ({
          ...prev,
          colorMarks: 'Color/Marks can only contain letters and basic punctuation'
        }));
      }
    }
  };

  const handlePetSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setFormErrors({
      dateOfBirth: '',
      colorMarks: ''
    });

    // Validate date
    if (!validateDate(petFormData.dateOfBirth)) {
      setFormErrors((prev) => ({
        ...prev,
        dateOfBirth: 'Date of birth cannot be in the future'
      }));
      return;
    }

    // Validate color/marks if provided
    if (petFormData.colorMarks && !validateColorMarks(petFormData.colorMarks)) {
      setFormErrors((prev) => ({
        ...prev,
        colorMarks: 'Color/Marks can only contain letters and basic punctuation'
      }));
      return;
    }

    // If validation passes, proceed with submission
    try {
      const response = await fetch('http://localhost:3000/api/pets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...petFormData
        })
      });

      if (response.ok) {
        setShowPetForm(false);
        onPetUpdate();
        showNotification('Pet added successfully!');
        setPetFormData({
          petName: '',
          species: 'Dog',
          breed: '',
          gender: 'Male',
          dateOfBirth: '',
          colorMarks: '',
          microchipNumber: ''
        });
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      showNotification('Error adding pet', 'error');
    }
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/pets/delete/${petId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          onPetUpdate();
          showNotification('Pet deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting pet:', error);
        showNotification('Error deleting pet', 'error');
      }
    }
  };

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#4099cd]/10 overflow-hidden">
      <div className="bg-[#4099cd]/10 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaPaw className="h-6 w-6 text-[#4099cd]" />
            <h2 className="ml-3 text-xl font-bold text-[#5e4044]">My Pets</h2>
          </div>
          <button
            onClick={() => setShowPetForm(!showPetForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#4099cd] text-white rounded-lg hover:bg-[#5e4044] transition-colors duration-300"
          >
            {showPetForm ? <FaTimes className="h-4 w-4" /> : <FaPaw className="h-4 w-4" />}
            {showPetForm ? 'Cancel' : 'Add Pet'}
          </button>
        </div>
      </div>

      <div className="p-8">
        {showPetForm && (
          <form onSubmit={handlePetSubmit} className="mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Pet Name</label>
              <input
                type="text"
                name="petName"
                placeholder="Pet Name"
                value={petFormData.petName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Species</label>
              <select
                name="species"
                value={petFormData.species}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                required
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Breed</label>
              <input
                type="text"
                name="breed"
                placeholder="Breed"
                value={petFormData.breed}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Gender</label>
              <select
                name="gender"
                value={petFormData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={petFormData.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]} // Prevents selecting future dates
                className={`w-full px-4 py-2 border-2 ${
                  formErrors.dateOfBirth
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#4099cd]/20 focus:ring-[#4099cd]/40'
                } rounded-xl focus:ring-2 focus:border-[#4099cd]`}
                required
              />
              {formErrors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-500">{formErrors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Color/Marks</label>
              <input
                type="text"
                name="colorMarks"
                placeholder="Color and Distinctive Marks"
                value={petFormData.colorMarks}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border-2 ${
                  formErrors.colorMarks
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#4099cd]/20 focus:ring-[#4099cd]/40'
                } rounded-xl focus:ring-2 focus:border-[#4099cd]`}
              />
              {formErrors.colorMarks && (
                <p className="mt-1 text-sm text-red-500">{formErrors.colorMarks}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Only letters, spaces, and basic punctuation (,.-) are allowed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5e4044] mb-2">Vaccination Record (Optional)</label>
              <input
                type="text"
                name="microchipNumber"
                placeholder="Enter microchip number if available"
                value={petFormData.microchipNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4099cd] text-white py-3 rounded-xl font-semibold hover:bg-[#5e4044] transition-all duration-300"
            >
              Add Pet
            </button>
          </form>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="p-4 border border-[#4099cd]/20 rounded-xl hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-[#5e4044]">{pet.petName}</h3>
                  <p className="text-[#b77582]">{pet.species} - {pet.breed}</p>
                  <p className="text-[#b77582]">pet id-{pet._id}</p>
                  <p className="text-sm text-gray-500">
                    Born: {new Date(pet.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Gender: {pet.gender}</p>
                  {pet.colorMarks && (
                    <p className="text-sm text-gray-500">Marks: {pet.colorMarks}</p>
                  )}
                  {pet.microchipNumber && (
                    <p className="text-sm text-gray-500">Microchip: {pet.microchipNumber}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/pet/${pet._id}/edit`)}
                    className="p-2 text-[#4099cd] hover:text-[#5e4044] transition-colors duration-300"
                    title="Edit Pet"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePet(pet._id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                    title="Delete Pet"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pets.length === 0 && !showPetForm && (
          <div className="text-center py-8 text-[#b77582]">
            <FaPaw className="h-12 w-12 mx-auto mb-4 text-[#4099cd]/30" />
            <p>No pets added yet. Click "Add Pet" to register your first pet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetManagement;