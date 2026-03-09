import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as CONSTANS from '../../../configuration/constants';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import SidebarLayout from '../../layout/protected/sidebarLayout';
import HeaderLayout from '../../layout/protected/headerLayout';
import FooterLayout from '../../layout/protected/footerLayout';
// import DynamicBreadCrumb from '../../shared/organism/DynamicBreadCrub';

const ProtectedTemplate = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // use dummy user for now (will be replaced with real auth later)
  const user = { role: CONSTANS.BASE_ROLE_ADMIN, name: 'Demo User' };
  const handleLogout = () => {
    // dummy logout: navigate back to home. Replace with real logout when integrating auth.
    navigate('/home', { replace: true, state: { justLoggedOut: true } });
  };

  return (
    <Layout className="min-h-screen bg-[#f5f7fa] transition-all duration-300 ease-in-out">
      {/* Sidebar fixed / drawer on mobile */}
      <SidebarLayout
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        user={user}
        onLogout={handleLogout}
      />
      {/* Kontainer utama */}
      <div className="flex-1 overflow-y-auto md:px-10">
        <Layout
          className={clsx(
            'transition-all duration-300 ease-in-out h-screen ml-0 sm:ml-20',
            isExpanded && 'sm:ml-57.5'
          )}
        >
          <HeaderLayout isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          {/* Header bagian dari Layout, bukan fixed */}

          {/* Konten utama */}
          <div className="flex-1 md:mx-5 overflow-y-auto">
            {/* <div className="mx-6 my-3">
              <DynamicBreadCrumb basePath="/dashboard" />
            </div> */}
            <Outlet />
          </div>

          <FooterLayout />
        </Layout>
      </div>
    </Layout>
  );
};

export default ProtectedTemplate;
