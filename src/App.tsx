import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SOSButton } from "@/components/SOSButton";
import Home from "./pages/Home";
import Planner from "./pages/Planner"
import Discover from "./pages/Discover";
import Food from "./pages/Food";
import Hotels from "./pages/Hotels";
import Transport from "./pages/Transport";
import Events from "./pages/Events";
import Maps from "./pages/Maps";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signup" replace />;
  }
  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/planner" element={
            <ProtectedRoute>
              <Planner />
            </ProtectedRoute>
          } />
          <Route path="/discover" element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          } />
          <Route path="/food" element={
            <ProtectedRoute>
              <Food />
            </ProtectedRoute>
          } />
          <Route path="/hotels" element={
            <ProtectedRoute>
              <Hotels />
            </ProtectedRoute>
          } />
          <Route path="/transport" element={
            <ProtectedRoute>
              <Transport />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/maps" element={
            <ProtectedRoute>
              <Maps />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SOSButton />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
