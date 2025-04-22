import React from 'react';
import Navication from "../../HomePage/Component/Navication.jsx";
import { User, Lock, Bell, Trash2 } from 'lucide-react';
import { Link } from "react-router-dom";

function SettingsPage() {
  return (
    <>
      <Navication />

      <div className="mt-[100px] p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 text-green-700 font-semibold">
              <User className="mr-2" /> Profile
            </div>
            <p className="text-gray-600 mb-4">Update your personal information.</p>
            <Link to="/profile">
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
    Edit Profile
  </button>
</Link>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 text-amber-600 font-semibold">
              <Lock className="mr-2" /> Security
            </div>
            <p className="text-gray-600 mb-4">Change your password regularly to stay secure.</p>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Change Password
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4 text-blue-600 font-semibold">
              <Bell className="mr-2" /> Notifications
            </div>
            <p className="text-gray-600 mb-4">Manage your notification preferences.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Manage Notifications
            </button>
          </div>

          {/* Delete Account */}
          <div className="border-t pt-4">
  <h2 className="text-lg font-semibold text-gray-800 mb-2">Terms & Privacy</h2>
  <Link to="/terms">
    <button className="text-green-700 hover:underline">View Terms and Privacy</button>
  </Link>
</div>

        </div>
      </div>
    </>
  );
}

export default SettingsPage;
