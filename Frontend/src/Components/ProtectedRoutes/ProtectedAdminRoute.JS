// ProtectedAdminRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('tokencle');
  const role = localStorage.getItem('rolecle');

  // Vérifiez ici si le token existe et le rôle est admin
  const isAuthenticated = token && role && role === 'admin';

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/connexion" />
      }
    />
  );
};

export default ProtectedAdminRoute;
