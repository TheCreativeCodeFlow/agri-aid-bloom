import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LandingPage } from "@/pages/LandingPage";
import { Dashboard } from "@/pages/Dashboard";
import { Navbar } from "@/components/layout/Navbar";
import NotFound from "./pages/NotFound";
import "date-fns";

const queryClient = new QueryClient();

interface User {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email: email
      };
      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: any) => {
    setIsLoading(true);
    try {
      // Mock signup - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser: User = {
        id: "1",
        name: data.fullName,
        email: data.email
      };
      setUser(mockUser);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="cropcast-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              {user && <Navbar />}
              <Routes>
                <Route 
                  path="/" 
                  element={
                    user ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
                    )
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    user ? (
                      <Dashboard />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  } 
                />
                {/* Placeholder routes for other features */}
                <Route path="/yield-prediction" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">Yield Prediction - Coming Soon</h1></div>} />
                <Route path="/weather-alerts" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">Weather Alerts - Coming Soon</h1></div>} />
                <Route path="/soil-fertilizer" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">Soil & Fertilizer Guide - Coming Soon</h1></div>} />
                <Route path="/pest-detection" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">Pest Detection - Coming Soon</h1></div>} />
                <Route path="/market-prices" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">Market Prices - Coming Soon</h1></div>} />
                <Route path="/ai-assistant" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">AI Assistant - Coming Soon</h1></div>} />
                <Route path="/profile" element={<div className="pt-20 p-8"><h1 className="text-2xl font-bold">Profile - Coming Soon</h1></div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
