import './App.css';
import MainPage from "./Pages/MainPage/Component/MainPage.jsx";
import SignIn from "./Pages/SignPage/Component/SignIn.jsx";
import SignUp from "./Pages/SignPage/Component/SignUp.jsx";
import HomePage from "./Pages/HomePage/Component/HomePage.jsx";
import CategoriesPage from "./Pages/CategoriesPage/Component/CategoriesPage.jsx";
import ProductsPage from "./Pages/ProductsPage/Component/ProductsPage.jsx";
import CartPage from "./Pages/CartPage/Component/CartPage.jsx";
import CheckOutPage from './Pages/CheckOutPage/Component/CheckOutPage.jsx';
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import MyProfile from "./Pages/MyProfile/Component/MyProfile.jsx";
import MyOrders from "./Pages/MyOrders/Component/MyOrders.jsx";
import SettingsPage from "./Pages/Settings/Component/SettingsPage.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import AI from './Pages/AI/Component/AI.jsx';
function App() {
 {/* const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
*/}
  return (
    <Router>
      <Routes>
         <Route path="/" element={<MainPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        {/*{userId ? (
          <>
          */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart/:userId" element={<CartPage />} />
            <Route path="/checkout/:userId" element={<CheckOutPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/AI" element={<AI />} />
            {/*</>
        ) : (
          <>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/categories" element={<Navigate to="/" />} />
            <Route path="/products" element={<Navigate to="/" />} />
            <Route path="/cart/:userId" element={<Navigate to="/" />} />
            <Route path="/checkout/:userId" element={<Navigate to="/" />} />
            <Route path="/my-profile" element={<Navigate to="/" />} />
            <Route path="/my-orders" element={<Navigate to="/" />} />
            <Route path="/settings" element={<Navigate to="/" />} />
            <Route path="/AI" element={<Navigate to="/" />} />
          </>
        )}
      <Route path="*" element={<ErrorPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;