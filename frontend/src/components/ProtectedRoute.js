import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component, ...propsOfMain }) => {
  return (
    <>
      {propsOfMain.loggedIn ? <Component {...propsOfMain} /> : <Navigate to="/sign-in" replace/>}
    </>
)}

export default ProtectedRoute;