import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaPen, FaTrash, FaLock } from 'react-icons/fa';
import Header from '../../components/Header';
import PetManagement from './PetManage';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }

    fetchUserDetails(userData.id);
    fetchUserPets(userData.id);
  }, [navigate]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/profile/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setFormData({
          name: data.name,
          phone: data.phone
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      showNotification('Error fetching user details', 'error');
    }
  };

  const fetchUserPets = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pets/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setPets(data);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/profile/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ ...user, ...formData });
        setIsEditing(false);
        showNotification('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Error updating profile', 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/change-password/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();
      if (response.ok) {
        setPasswordData({ currentPassword: '', newPassword: '' });
        setIsChangingPassword(false);
        showNotification('Password updated successfully!');
      } else {
        showNotification(data.message || 'Error updating password', 'error');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      showNotification('Error updating password', 'error');
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:3000/user/delete/${user._id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          showNotification('Profile deleted successfully!');
          localStorage.removeItem('user'); // Clear user data from localStorage
          navigate('/login'); // Redirect to login page
        } else {
          showNotification('Error deleting profile', 'error');
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        showNotification('Error deleting profile', 'error');
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

  if (!user) {
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
        <div className="max-w-3xl mx-auto space-y-8">
          {/* User Profile Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#4099cd]/10 overflow-hidden">
            <div className="bg-[#4099cd]/10 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-[#4099cd]/20 flex items-center justify-center">
                    <FaUser className="h-10 w-10 text-[#4099cd]" />
                  </div>
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold text-[#5e4044]">{user.name}</h1>
                    <p className="text-[#b77582]">{user.role}</p>
                    <p className="text-[#b77582]">{user._id}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#4099cd] text-white text-sm rounded-md hover:bg-[#5e4044] transition-colors duration-300"
                >
                  <FaPen className="h-3 w-3" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#4099cd] text-white text-sm rounded-md hover:bg-[#5e4044] transition-colors duration-300"
                >
                  <FaLock className="h-3 w-3" />
                  {isChangingPassword ? 'Cancel' : 'Change Password'}
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  <FaTrash className="h-3 w-3" />
                  Delete Profile
                </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-6">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#5e4044] mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5e4044] mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                        if (numericValue.length <= 10) {
                          setFormData({ ...formData, phone: numericValue });
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                      placeholder="Enter 10-digit phone number"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#4099cd] text-white py-3 rounded-xl font-semibold hover:bg-[#5e4044] transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </form>
              ) : isChangingPassword ? (
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#5e4044] mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5e4044] mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd]"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#4099cd] text-white py-3 rounded-xl font-semibold hover:bg-[#5e4044] transition-all duration-300"
                  >
                    Update Password
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="h-5 w-5 text-[#b77582]" />
                    <div>
                      <p className="text-sm text-[#b77582]">Email</p>
                      <p className="text-[#5e4044]">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaPhone className="h-5 w-5 text-[#b77582]" />
                    <div>
                      <p className="text-sm text-[#b77582]">Phone</p>
                      <p className="text-[#5e4044]">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaUserTag className="h-5 w-5 text-[#b77582]" />
                    <div>
                      <p className="text-sm text-[#b77582]">Role</p>
                      <p className="text-[#5e4044]">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pet Management Section */}
          <PetManagement 
            userId={user._id}
            pets={pets}
            onPetUpdate={() => fetchUserPets(user._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;