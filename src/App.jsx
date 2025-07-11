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
import SettingPage from "./Pages/Admin/Component/SettingPage.jsx";
import SocialMediaPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaPage.jsx";
import SocialMediaPostsPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaPostsPage.jsx";
import SocialMediaReportsPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaReportsPage.jsx";
import SocialMediaUsersPage from "./Pages/Admin/Component/SocialMediaPart/SocialMediaUsersPage.jsx";
import ViewProduct from "./Pages/ProductsPage/Component/ViewProduct.jsx";
import UserSocialMedia from "./Pages/ScoialMedia/Component/UserSocialMedia.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ProtectedRoute component to restrict access based on role
function ProtectedRoute({ element, allowedRoles }) {
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  if (!userId) {
    return <Navigate to="/signIn" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <ErrorPage />;
  }

  return element;
}

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
      setUserRole(localStorage.getItem("userRole"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Define allowed routes for each role
  const userRoutes = [
    "/home",
    "/categories",
    "/products",
    "/cart/:userId",
    "/checkout/:userId",
    "/profile",
    "/accountSettings",
    "/AI",
    "/admin",
    "/tools",
    "/tools/add",
    "/checkout/success",
    "/checkout/failed",
    "/socialMedia/users",
  ];
  const driverRoutes = ["/delivery", "/delivery/:id", "/delivery/:id/track"];
  const adminRoutes = [
    "/admin",
    "/tools",
    "/tools/add",
    "/customers",
    "/customers/:customerId",
    "/inventory",
    "/admin/orders",
    "/admin/orders/customers",
    "/admin/orders/purchase",
    "/admin/orders/customers/:id/view",
    "/admin/orders/customers/:id/track",
    "/admin/orders/purchase/:id/view",
    "/admin/orders/purchase/new",
    "/tools/:id/view",
    "/tools/:id/edit",
    "/analytics",
    "/socialMedia",
    "/socialMedia/posts",
    "/socialMedia/reports",
    "/socialMedia/users",
    "/settings",
  ];

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
        {/* Public Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verification" element={<VerificationPage />} />

        {/* User Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={<HomePage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute
              element={<CategoriesPage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute
              element={<ProductsPage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/cart/:userId"
          element={
            <ProtectedRoute
              element={<CartPage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/checkout/:userId"
          element={
            <ProtectedRoute
              element={<CheckOutPage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={<UserDashboard />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route 
        path="/product/view/:id" element={<ViewProduct />} 
        allowedRoles={["User", "Admin"]}
        />

        <Route
          path="/accountSettings"
          element={
            <ProtectedRoute
              element={<AccountSettings />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/AI"
          element={
            <ProtectedRoute element={<AI />} allowedRoles={["User", "Admin"]} />
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute
              element={<SuccessPage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/checkout/failed"
          element={
            <ProtectedRoute
              element={<FailedPage />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />
        <Route
          path="/social-media"
          element={
            <ProtectedRoute
              element={<UserSocialMedia />}
              allowedRoles={["User", "Admin"]}
            />
          }
        />


        {/* Driver Routes */}
        <Route
          path="/delivery"
          element={
            <ProtectedRoute
              element={<DeliveryPage />}
              allowedRoles={["Driver"]}
            />
          }
        />
        <Route
          path="/delivery/:id"
          element={
            <ProtectedRoute
              element={<DeliveryDetailsPage />}
              allowedRoles={["Driver"]}
            />
          }
        />
        <Route
          path="/delivery/:id/track"
          element={
            <ProtectedRoute
              element={<TrackDeliveryOrder />}
              allowedRoles={["Driver"]}
            />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/tools"
          element={
            <ProtectedRoute
              element={<ToolsPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/tools/add"
          element={
            <ProtectedRoute
              element={<AddTool />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute
              element={<CustomerPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/customers/:customerId"
          element={
            <ProtectedRoute
              element={<ViewCustomerInfo />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute
              element={<InventoryPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute element={<OrdersPage />} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="/admin/orders/customers"
          element={
            <ProtectedRoute
              element={<CustomerOrdersPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/orders/purchase"
          element={
            <ProtectedRoute
              element={<PurchaseOrdersPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/orders/customers/:id/view"
          element={
            <ProtectedRoute
              element={<ViewOrderCustomer />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/orders/customers/:id/track"
          element={
            <ProtectedRoute
              element={<TrackCustomerOrder />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/orders/purchase/:id/view"
          element={
            <ProtectedRoute
              element={<PurchaseOrderViewPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/admin/orders/purchase/new"
          element={
            <ProtectedRoute
              element={<NewPurchaseOrderPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/tools/:id/view"
          element={
            <ProtectedRoute
              element={<ProductDetailPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/tools/:id/edit"
          element={
            <ProtectedRoute element={<EditTool />} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              element={<AnalyticsPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/socialMedia"
          element={
            <ProtectedRoute
              element={<SocialMediaPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/socialMedia/posts"
          element={
            <ProtectedRoute
              element={<SocialMediaPostsPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/socialMedia/reports"
          element={
            <ProtectedRoute
              element={<SocialMediaReportsPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/socialMedia/users"
          element={
            <ProtectedRoute
              element={<SocialMediaUsersPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              element={<SettingPage />}
              allowedRoles={["Admin"]}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
