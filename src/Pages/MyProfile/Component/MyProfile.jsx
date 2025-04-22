import React from "react";
import { Edit3,Save } from "lucide-react";
import Navication from "../../HomePage/Component/Navication.jsx";

const MyProfile = () => {
  return (
    <>
      <Navication />
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="w-full max-w-3xl h-auto overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row bg-white">
          {/* صورة البروفايل */}
          <div className="md:w-1/2 bg-gradient-to-br from-green-500 via-green-700 to-green-800 flex flex-col items-center justify-center p-10 text-white">
          <img
              src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6"
            />
            <h2 className="text-xl font-semibold">Welcome, User</h2>
            <p className="text-white/80 text-sm mt-2 text-center">Edit your profile information</p>
          </div>

          {/* النموذج */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">My Profile</h1>
            <form className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pr-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-teal-600"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>

              {/* Email */}
<div className="relative">
  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
  <div className="relative">
    <input
      type="email"
      placeholder="you@example.com"
      readOnly
      className="w-full pr-10 bg-gray-100 text-gray-500 border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
    />
    <button
      type="button"
      disabled
      className="absolute inset-y-0 right-2 flex items-center text-gray-400 cursor-not-allowed"
    >
      <Edit3 size={18} />
    </button>
  </div>
</div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="05x xxx xxxx"
                    className="w-full pr-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-teal-600"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City, Street..."
                    className="w-full pr-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-teal-600"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-right pt-6">
  <button
    type="submit"
    className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition shadow-md"
  >
    <Save size={18} />
    Save Changes
  </button>
</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
