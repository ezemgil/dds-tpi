import React from "react";
import { Navigate } from "react-router-dom";

import authService from "../services/auth.service";

function RequireAuth({ children }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
