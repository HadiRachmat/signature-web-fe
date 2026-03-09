import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from '../components/templates/public/index';
import LoginPage from '../components/pages/public/auth/login';
import RegisterPage from '../components/pages/public/auth/register';
import HomePage from '../components/pages/public/home';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Navigate to="hero" replace />} />
          <Route path="/hero" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default PublicRoutes;
