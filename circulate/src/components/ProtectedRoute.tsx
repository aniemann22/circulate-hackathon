// src/components/ProtectedRoute.tsx

import React from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('id_token');

  if (!isAuthenticated) {
    // Redirect to Cognito hosted UI login page
    const clientId = '7s7o7e3tm5e8220l8f3947n8rj'; // Replace with your actual Client ID
    const redirectUri = encodeURIComponent('http://localhost:3000/callback');
    const cognitoDomain = 'https://circulatesignup.auth.us-east-1.amazoncognito.com'; // Only the domain

    const loginUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=email+openid+phone&redirect_uri=${redirectUri}`;

    window.location.href = loginUrl;
    return null;
  }

  return children;
};

export default ProtectedRoute;