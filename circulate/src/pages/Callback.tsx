// src/pages/Callback.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally extract the authorization code from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      // Simulate token retrieval by setting dummy tokens in local storage
      localStorage.setItem('id_token', 'dummy-id-token');
      localStorage.setItem('access_token', 'dummy-access-token');
    }

    // Redirect to the Products page (or any desired page)
    navigate('/Products');
  }, [navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Callback;