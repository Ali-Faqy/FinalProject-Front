import './App.css'
import MainPage from "./Pages/MainPage/Component/MainPage.jsx";
import SignIn from "./Pages/SignPage/Component/SignIn.jsx";
import SignUp from "./Pages/SignPage/Component/SignUp.jsx";
import HomePage from "./Pages/HomePage/Component/HomePage.jsx";
import CategoriesPage from "./Pages/CategoriesPage/Component/CategoriesPage.jsx";
import ProductsPage from "./Pages/ProductsPage/Component/ProductsPage.jsx";
import CartPage from "./Pages/CartPage/Component/CartPage.jsx";
import CheckOutPage from './Pages/CheckOutPage/Component/CheckOutPage.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart/:userId" element={<CartPage />} />
        <Route path="/checkout/:userId" element={<CheckOutPage />} />
      </Routes>
    </Router>
  );
}

export default App;

