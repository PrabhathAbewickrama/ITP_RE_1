import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPaw, FaArrowLeft } from 'react-icons/fa';
import Header from '../../components/Header';

const UpdatePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [petData, setPetData] = useState({
    petName: '',
    species: '',
    breed: '',
    gender: '',
    dateOfBirth: '',
    colorMarks: '',
    microchipNumber: ''
  });
  const [formErrors, setFormErrors] = useState({
    dateOfBirth: '',
    colorMarks: ''
  });

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

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/pets/pet/${id}`);
      const data = await response.json();

      if (response.ok) {
        setPetData({
          ...data,
          dateOfBirth: new Date(data.dateOfBirth).toISOString().split('T')[0]
        });
      } else {
        showNotification('Error fetching pet details', 'error');
      }
    } catch (error) {
      console.error('Error fetching pet details:', error);
      showNotification('Error fetching pet details', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPetData((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setFormErrors({
      dateOfBirth: '',
      colorMarks: ''
    });

    // Validate date
    if (!validateDate(petData.dateOfBirth)) {
      setFormErrors((prev) => ({
        ...prev,
        dateOfBirth: 'Date of birth cannot be in the future'
      }));
      return;
    }

    // Validate color/marks if provided
    if (petData.colorMarks && !validateColorMarks(petData.colorMarks)) {
      setFormErrors((prev) => ({
        ...prev,
        colorMarks: 'Color/Marks can only contain letters and basic punctuation'
      }));
      return;
    }

    // If validation passes, proceed with submission
    try {
      const response = await fetch(`http://localhost:3000/api/pets/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData)
      });

      if (response.ok) {
        showNotification('Pet updated successfully!');
        navigate('/profile');
      } else {
        showNotification('Error updating pet', 'error');
      }
    } catch (error) {
      console.error('Error updating pet:', error);
      showNotification('Error updating pet', 'error');
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-[#fef6f3] to-[#f5e6d3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4099cd]"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#f5e6d3] via-[#fef6f3] to-[#f5e6d3] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#4099cd]/10 overflow-hidden">
            <div className="bg-[#4099cd]/10 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaPaw className="h-6 w-6 text-[#4099cd]" />
                  <h2 className="ml-3 text-xl font-bold text-[#5e4044]">Update Pet Details</h2>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#4099cd] text-white rounded-lg hover:bg-[#5e4044] transition-colors duration-300"
                >
                  <FaArrowLeft className="h-4 w-4" />
                  Back to Profile
                </button>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#5e4044] mb-2">Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    value={petData.petName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5e4044] mb-2">Species</label>
                  <select
                    name="species"
                    value={petData.species}
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
                    value={petData.breed}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5e4044] mb-2">Gender</label>
                  <select
                    name="gender"
                    value={petData.gender}
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
                    value={petData.dateOfBirth}
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
                    value={petData.colorMarks}
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
                  <label className="block text-sm font-medium text-[#5e4044] mb-2">Vaccination Record</label>
                  <input
                    type="text"
                    name="microchipNumber"
                    value={petData.microchipNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="w-full py-3 rounded-xl font-semibold border-2 border-[#4099cd] text-[#4099cd] hover:bg-[#4099cd]/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-[#4099cd] text-white py-3 rounded-xl font-semibold hover:bg-[#5e4044] transition-all duration-300"
                  >
                    Update Pet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePet;