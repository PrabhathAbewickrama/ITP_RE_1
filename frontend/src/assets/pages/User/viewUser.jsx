import React from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaUserTag, FaCalendarAlt, FaBriefcaseMedical } from 'react-icons/fa';

const ViewUserModal = ({ user, onClose }) => {
  const isVeterinarian = user.role === "Veterinarian";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3 rounded-t-lg">
          <h3 className="text-lg font-medium">
            User Details
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaUser className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full mt-1
                  ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : 
                    user.role === 'Veterinarian' ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {user.role}
                </span>
                
                {/* Verification badge for veterinarians
                {isVeterinarian && (
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full mt-1
                    ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                )} */}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-start">
              <FaEnvelope className="mt-1 h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaPhone className="mt-1 h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaUserTag className="mt-1 h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-800">{user.gender || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaCalendarAlt className="mt-1 h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {/* Veterinarian-specific details */}
          {isVeterinarian && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Veterinarian Details</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <FaBriefcaseMedical className="mt-1 h-5 w-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="text-gray-800">{user.specialization}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaCalendarAlt className="mt-1 h-5 w-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Years of Experience</p>
                    <p className="text-gray-800">{user.yearsOfExperience} years</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;