import { Routes, Route } from 'react-router-dom';

import PublicPageExample from '../components/public/index';

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicPageExample />}>
          <Route path="/" element={<PublicPageExample />} />
        </Route>
      </Routes>
    </>
  );
};

export default PublicRoutes;
