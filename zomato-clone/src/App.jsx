import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dining from "./pages/Dining";
import Delivery from "./pages/Delivery";
import Nightlife from "./pages/Nightlife";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import RestaurentDetails from "./pages/RestaurentDetails";
import VerifyOtp from "./pages/VerifyOtp";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import AdminLayout from "./admin/components/AdminLayout";
import AdminAdd from "./admin/pages/AdminAdd";
import AdminView from "./admin/pages/AdminView";
import AdminLogin from "./admin/pages/adminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRestaurantDetails from "./admin/pages/AdminRestaurantDetails";
import AdminFoodDetails from "./admin/pages/AdminFoodDetails";
import AdminOrders from "./admin/pages/AdminOrders";

import AdminManageUser from "./admin/pages/AdminManageUser";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";

function App() {
  const location = useLocation();

  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />

      {/* Hide Navbar for Admin pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dining" />} />
        {/* User Routes */}
        <Route path="/dining" element={<Dining />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/delivery/:category" element={<Delivery />} />{" "}
        {/**food category based delivery */}
        <Route path="/nightlife" element={<Nightlife />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurent/:id" element={<RestaurentDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path = "/checkout" element = {<Checkout />} />
        <Route path ="/order/:id" element = {<OrderDetails /> }/>

        {/**My Orders Route */}
        <Route path="/my-orders" element={<MyOrders/>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add" element={<AdminAdd />} />

          {/**Edit Routes */}
          <Route path="restaurant/:id" element={<AdminAdd />} />
          <Route path="food/:id" element={<AdminAdd />} />

          <Route path="view" element={<AdminView />} />
          <Route path="restaurant/:id" element={<AdminRestaurantDetails />} />
          <Route path="food/:id" element={<AdminFoodDetails />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminManageUser />} />
        </Route>
      </Routes>

      {/* Hide Footer for Admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
