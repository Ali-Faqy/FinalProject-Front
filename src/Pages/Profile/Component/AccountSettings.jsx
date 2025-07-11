import { useState, useEffect } from "react";
import { Edit3, Save } from "lucide-react";
import Navication from "../../HomePage/Component/Navication.jsx";
import backgroundImage from "../../../assets/accSettings.jpg";

const AccountSettings = () => {
  const userame = localStorage.getItem("userName");
  const [user, setUser] = useState({
    fullName: userame,
    email: "laban@example.com",
    phone: "+9705666666",
    address: "1234 quds St, albirah, ramallah",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("User data saved:", user);
  };

  return (
    <>
      <Navication />
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="w-full max-w-3xl h-auto overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row bg-white">
        <div
  className="md:w-1/2 flex flex-col items-center justify-center p-10 text-white bg-cover bg-center"
  style={{ backgroundImage: `url(${backgroundImage})` }}>
  <img
    src="https://static.vecteezy.com/system/resources/previews/024/766/959/non_2x/default-female-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg"

    alt="Profile"
    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6"
  />
<h2 className="text-xl font-semibold text-black">Welcome, {user.fullName}</h2>
<p className="text-black text-sm mt-2 text-center">Edit your profile information</p>

</div>


          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">My Profile</h1>
            <form className="space-y-5" onSubmit={handleSave}>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
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

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
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

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
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

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
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

export default AccountSettings;
