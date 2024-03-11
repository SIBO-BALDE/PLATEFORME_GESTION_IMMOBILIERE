// ProtectedUserRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedUserRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('tokencle');
  const role = localStorage.getItem('rolecle');

  // Vérifiez ici si le token existe et le rôle est user
  const isAuthenticated = token && role && role === 'user';

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/connexion" />
      }
    />
  );
};

export default ProtectedUserRoute;
