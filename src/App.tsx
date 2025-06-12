import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RestaurantsPage from "./pages/Admin/RestaurantsPage";
import BeneficiariesPage from "./pages/Admin/BeneficiariesPage";
import AssociationDashboard from "./pages/Admin/AssociationDashboard";
import DashboardPage from "./pages/Restaurant/DashboardPage";
import DonorRegistrationPage from "./pages/Individual/DonorRegistrationPage";
import TrackDonationsPage from "./pages/Individual/TrackDonationsPage";
import HelpRequestPage from "./pages/Individual/HelpRequestPage";
import TrackRequestPage from "./pages/Individual/TrackRequestPage";
import { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ✅ استيراد الصفحات الجديدة فقط
import About from "./pages/Nav/About";
import Services from "./pages/Nav/Services";
import Contact from "./pages/Nav/Contact";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>
);

// Restaurant route component
const RestaurantRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={["restaurant"]}>{children}</ProtectedRoute>
);
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* ✅ إضافة شريط التنقل ليظهر في جميع الصفحات */}
          <nav className="bg-gray-900 text-white py-4 flex justify-center gap-6">
            <Link to="/about" className="hover:text-gray-300">من نحن</Link>
            <Link to="/services" className="hover:text-gray-300">خدماتنا</Link>
            <Link to="/contact" className="hover:text-gray-300">اتصل بنا</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* ✅ الصفحات الجديدة ستظهر دائمًا لأن التنقل خارج `Routes` */}
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/individual/donate" element={<DonorRegistrationPage />} />
            <Route path="/individual/track-donations" element={<TrackDonationsPage />} />
            <Route path="/individual/help-request" element={<HelpRequestPage />} />
            <Route path="/individual/track" element={<TrackRequestPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AssociationDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/restaurants"
              element={
                <AdminRoute>
                  <RestaurantsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/beneficiaries"
              element={
                <AdminRoute>
                  <BeneficiariesPage />
                </AdminRoute>
              }
            />

            {/* Restaurant Routes */}
            <Route
              path="/restaurant"
              element={
                <RestaurantRoute>
                  <DashboardPage />
                </RestaurantRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
