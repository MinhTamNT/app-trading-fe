import AuthGuard from "@/components/ProtectRoute/ProtectRoute"; // Adjust the import path as necessary
import React from "react";
import TabNavigationState from "./tabs";

export const AuthenticatedTabs: React.FC = () => {
  return (
    <AuthGuard>
      <TabNavigationState />
    </AuthGuard>
  );
};
