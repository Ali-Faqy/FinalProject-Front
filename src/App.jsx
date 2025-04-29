import './App.css';
import MainPage from "./Pages/MainPage/Component/MainPage.jsx";
import SignIn from "./Pages/SignPage/Component/SignIn.jsx";
import SignUp from "./Pages/SignPage/Component/SignUp.jsx";
import HomePage from "./Pages/HomePage/Component/HomePage.jsx";
import CategoriesPage from "./Pages/CategoriesPage/Component/CategoriesPage.jsx";
import ProductsPage from "./Pages/ProductsPage/Component/ProductsPage.jsx";
import CartPage from "./Pages/CartPage/Component/CartPage.jsx";
import CheckOutPage from './Pages/CheckOutPage/Component/CheckOutPage.jsx';
import SuccessPage from './Pages/CheckOutPage/Component/SuccessPage.jsx';
import FailedPage from './Pages/CheckOutPage/Component/FailedPage.jsx';

import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import UserDashboard from "./Pages/Profile/Component/UserDashboard.jsx";
import AccountSettings from './Pages/Profile/Component/AccountSettings';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import AI from './Pages/AI/Component/AI.jsx';
import Dashboard from './Pages/Admin/Component/page.jsx';
import ToolsPage from './Pages/Admin/Component/toolsPage.jsx';
import AddTool from './Pages/Admin/Component/AddTool.jsx';
import CustomerPage from './Pages/Admin/Component/CustomerPage.jsx';
import ViewCustomerInfo from './Pages/Admin/Component/ViewCustomerInfo.jsx';
import InventoryPage from './Pages/Admin/Component/InventoryPage.jsx';

function App() {
 const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
         <Route path="/" element={<MainPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

       {userId ? (
          <>
          
            <Route path="/home" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart/:userId" element={<CartPage />} />
            <Route path="/checkout/:userId" element={<CheckOutPage />} />
            <Route path="/profile" element={<UserDashboard />} />
            <Route path="/accountSettings" element={<AccountSettings />} />
            <Route path="/AI" element={<AI />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/add" element={<AddTool />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/customers/:customerId" element={<ViewCustomerInfo />} />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/checkout/failed" element={<FailedPage />} />
            <Route path="/inventory" element={<InventoryPage />} />

            </>
        ) : (
          <>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/categories" element={<Navigate to="/" />} />
            <Route path="/products" element={<Navigate to="/" />} />
            <Route path="/cart/:userId" element={<Navigate to="/" />} />
            <Route path="/checkout/:userId" element={<Navigate to="/" />} />
            <Route path="/profile" element={<UserDashboard />} />
            <Route path="/accountSettings" element={<AccountSettings />} />
            <Route path="/AI" element={<Navigate to="/" />} />
          </>
        )}
      <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;