// PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner.jsx'; // Ensure you have a Spinner component
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('You are being redirected to the login page');
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Delay to show the spinner and message
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;



