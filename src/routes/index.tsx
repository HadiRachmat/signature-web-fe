import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home/*" element={<PublicRoutes />} />
        {/* <Route path="/cms/*" element={<CmsRoutes />} />
        <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
