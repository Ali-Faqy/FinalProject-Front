import "./App.css";
import MainPage from "./Pages/MainPage/Component/MainPage.jsx";
import SignIn from "./Pages/SignPage/Component/SignIn.jsx";
import SignUp from "./Pages/SignPage/Component/SignUp.jsx";
import VerificationPage from "./Pages/SignPage/Component/VerificationPage.jsx";
import HomePage from "./Pages/HomePage/Component/HomePage.jsx";
import CategoriesPage from "./Pages/CategoriesPage/Component/CategoriesPage.jsx";
import ProductsPage from "./Pages/ProductsPage/Component/ProductsPage.jsx";
import CartPage from "./Pages/CartPage/Component/CartPage.jsx";
import CheckOutPage from "./Pages/CheckOutPage/Component/CheckOutPage.jsx";
import SuccessPage from "./Pages/CheckOutPage/Component/SuccessPage.jsx";
import FailedPage from "./Pages/CheckOutPage/Component/FailedPage.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import UserDashboard from "./Pages/Profile/Component/UserDashboard.jsx";
import AccountSettings from "./Pages/Profile/Component/AccountSettings";
import AI from "./Pages/AI/Component/AI.jsx";
import Dashboard from "./Pages/Admin/Component/page.jsx";
import ToolsPage from "./Pages/Admin/Component/toolsPage.jsx";
import AddTool from "./Pages/Admin/Component/AddTool.jsx";
import CustomerPage from "./Pages/Admin/Component/CustomerPage.jsx";
import ViewCustomerInfo from "./Pages/Admin/Component/ViewCustomerInfo.jsx";
import InventoryPage from "./Pages/Admin/Component/InventoryPage.jsx";
import OrdersPage from "./Pages/Admin/Component/OrdersPage.jsx";
import CustomerOrdersPage from "./Pages/Admin/Component/CustomerOrdersPage.jsx";
import PurchaseOrdersPage from "./Pages/Admin/Component/PurchaseOrdersPage.jsx";
import ViewOrderCustomer from "./Pages/Admin/Component/ViewOrderCustomer.jsx";
import TrackCustomerOrder from "./Pages/Admin/Component/TrackCustomerOrder.jsx";
import PurchaseOrderViewPage from "./Pages/Admin/Component/PurchaseOrderViewPage.jsx";
import NewPurchaseOrderPage from "./Pages/Admin/Component/NewPurchaseOrderPage.jsx";
import ProductDetailPage from "./Pages/Admin/Component/ProductDetailPage.jsx";
import EditTool from "./Pages/Admin/Component/EditTool.jsx";
import DeliveryPage from "./Pages/Admin/Component/DeliveryPage.jsx";
import DeliveryDetailsPage from "./Pages/Admin/Component/DeliveryDetailsPage.jsx";
import TrackDeliveryOrder from "./Pages/Admin/Component/TrackDeliveryOrder.jsx";
import AnalyticsPage from "./Pages/Admin/Component/AnalyticsPage.jsx";
import SettingPage from "./pages/Admin/Component/SettingPage.jsx";
import SocialMediaPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaPage.jsx";
import SocialMediaPostsPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaPostsPage.jsx";
import SocialMediaReportsPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaReportsPage.jsx";
import SocialMediaUsersPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaUsersPage.jsx";
import ViewProduct from "./Pages/ProductsPage/Component/ViewProduct.jsx";
import UserSocialMedia from "./Pages/ScoialMedia/Component/UserSocialMedia.jsx";
import UploadFrom from "./Pages/UploadFrom.jsx"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        containerId="sign-container"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
        closeButton={false}
        theme="colored"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        style={{
          width: "400px",
          maxWidth: "90%",
        }}
      />
      <ToastContainer
        containerId="other"
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
        closeButton={false}
        theme="colored"
        style={{
          width: "400px",
          maxWidth: "90%",
        }}
      />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verification" element={<VerificationPage />} />
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
            <Route
              path="/customers/:customerId"
              element={<ViewCustomerInfo />}
            />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/checkout/failed" element={<FailedPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route
              path="/admin/orders/customers"
              element={<CustomerOrdersPage />}
            />
            <Route
              path="/admin/orders/purchase"
              element={<PurchaseOrdersPage />}
            />
            <Route
              path="/admin/orders/customers/:id/view"
              element={<ViewOrderCustomer />}
            />
            <Route
              path="/admin/orders/customers/:id/track"
              element={<TrackCustomerOrder />}
            />
            <Route
              path="/admin/orders/purchase/:id/view"
              element={<PurchaseOrderViewPage />}
            />
            <Route
              path="/admin/orders/purchase/new"
              element={<NewPurchaseOrderPage />}
            />
            <Route path="/tools/:id/view" element={<ProductDetailPage />} />
            <Route path="/tools/:id/edit" element={<EditTool />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/delivery/:id" element={<DeliveryDetailsPage />} />
            <Route
              path="/delivery/:id/track"
              element={<TrackDeliveryOrder />}
            />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/socialMedia" element={<SocialMediaPage />} />
            <Route
              path="/socialMedia/posts"
              element={<SocialMediaPostsPage />}
            />
            <Route
              path="/socialMedia/reports"
              element={<SocialMediaReportsPage />}
            />
            <Route
              path="/socialMedia/users"
              element={<SocialMediaUsersPage />}
            />
            <Route path="/product/view/:id" element={<ViewProduct />} />
            <Route path="/social-media" element={<UserSocialMedia />} />
            <Route path="/settings" element={<SettingPage />} />
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
