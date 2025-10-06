import React from "react";
import { AnimationRoutes, ZMPRouter, Route } from "zmp-ui";

// Import pages
import LoadingPage from "./loading";
import HomePage from "./home";
import LoginPage from "./login";
import TeachingManagementPage from "./TeachingManagementPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function AppRouter() {
  console.log("🛣️ AppRouter rendering...");
  
  return (
    <ZMPRouter>
      <AnimationRoutes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={
        //   <ProtectedRoute>
            <HomePage />
        //   </ProtectedRoute>
        } />
        <Route path="/teaching-management" element={
        //   <ProtectedRoute>
            <TeachingManagementPage />
        //   </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
      </AnimationRoutes>
    </ZMPRouter>
  );
}

export default AppRouter;
