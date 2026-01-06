import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import AnalyticsDashboard from "../pages/dashboard/AnalyticsDashboard";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import UserManagement from "../pages/admin/UserManagement";
import DomumentManagement from "../pages/admin/DocumentManagement";
import PrivacyPolicy from "../pages/PrivacyPolicy";

const AppRouter = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/admin/user" /> : <Navigate to="/login" />
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/create-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Protected Routes under App Layout */}
      <Route path="/" element={<App />}>
        {/* Admin Routes */}
        <Route
          path="/admin/user"
          element={
            <ProtectedRoute
              element={<UserManagement />}
            />
          }
        />
        <Route
          path="/admin/document"
          element={
            <ProtectedRoute
              element={<DomumentManagement />}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
