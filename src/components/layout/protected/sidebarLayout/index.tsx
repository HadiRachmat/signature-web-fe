import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Drawer } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
  ProductOutlined,
  GroupOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarcodeOutlined,
  RocketOutlined,
  TruckOutlined,
  CommentOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

// Import role constants
import * as CONSTANS from '../../../../configuration/constants';

const SidebarLayout = ({
  isExpanded,
  setIsExpanded,
  // optional externalized props so this component doesn't have to read redux directly
  user,
  onLogout,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  user?: { role?: number } | null;
  onLogout?: () => void;
}) => {
  const navigate = useNavigate();

  // If a user prop is provided, use it; otherwise treat as no-user (role-less)
  const userRole = Number(user?.role);

  // 🔹 Menu list dengan role access
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      path: '/protected/dashboard',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Users',
      path: '/protected/users',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '3',
      icon: <ContactsOutlined />,
      label: 'Contact',
      path: '/protected/contact',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '4',
      icon: <GroupOutlined />,
      label: 'Riwayat hafalan',
      path: '/protected/memorize-record',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '5',
      icon: <ProductOutlined />,
      label: 'Riwayat Murajaah',
      path: '/protected/memorize-murajaah',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '6',
      icon: <BarcodeOutlined />,
      label: 'hafalan sehari hari',
      path: '/protected/daily-records',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '7',
      icon: <RocketOutlined />,
      label: 'Qur`an Digital',
      path: '/protected/quran-digital',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '8',
      icon: <TruckOutlined />,
      label: 'Kumpulan Dzikir',
      path: '/protected/dzikir-collection',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '9',
      icon: <ShoppingCartOutlined />,
      label: 'Kalender Islam',
      path: '/protected/islam-calendar',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: '10',
      icon: <CommentOutlined />,
      label: 'Leaderboard',
      path: '/protected/leader-board',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
  ];

  const bottomItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/protected/settings-page',
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      path: null,
      roles: [CONSTANS.BASE_ROLE_ADMIN, CONSTANS.BASE_ROLE_STUDENT, CONSTANS.BASE_ROLE_TEACHER],
    },
  ];

  const handleClickMenu = (path: string | null, key: string) => {
    if (key === 'logout') {
      if (typeof onLogout === 'function') {
        onLogout();
      } else {
        // default behaviour: navigate to home and include state that user just logged out
        navigate('/home', { replace: true, state: { justLoggedOut: true } });
      }
      return;
    }
    if (path) navigate(path);
  };

  // 🔹 Filter menu sesuai role
  const filteredMenu = userRole ? menuItems.filter((item) => item.roles.includes(userRole)) : [];
  const filteredBottom = userRole
    ? bottomItems.filter((item) => item.roles.includes(userRole))
    : bottomItems;

  // simple mobile detection: render Drawer instead of fixed sidebar
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMenuAndClose = (path: string | null, key: string) => {
    handleClickMenu(path, key);
    // if on mobile and a setter is provided, close the drawer after navigation
    if (isMobile && typeof setIsExpanded === 'function') setIsExpanded(false);
  };

  // keep visual markup in a reusable fragment so Drawer and fixed sidebar share same markup
  const menuContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-4">
          <div className="w-10 h-10 bg-[#3b3b3b] rounded-[10px] flex items-center justify-center text-lg font-bold">
            JS
          </div>
          {isExpanded && <span className="text-lg font-semibold tracking-wide">Signature</span>}
        </div>

        {/* Menu Section */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-3"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          <ul className="flex flex-col gap-1">
            {filteredMenu.map((item) => (
              <li
                key={item.key}
                onClick={() => handleMenuAndClose(item.path, item.key)}
                className={`
                  flex items-center gap-3 cursor-pointer rounded-xl px-3 py-5 
                  hover:bg-white hover:text-black transition-all duration-200
                  ${isExpanded ? 'justify-start' : 'justify-center'}
                `}
              >
                <Tooltip placement="right" title={!isExpanded ? item.label : null}>
                  {React.cloneElement(item.icon, { className: 'text-lg' })}
                </Tooltip>
                {isExpanded && <span className="text-sm">{item.label}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="px-3 mb-4 py-5">
        <ul className="flex flex-col gap-1">
          {filteredBottom.map((item) => (
            <li
              key={item.key}
              onClick={() => handleMenuAndClose(item.path, item.key)}
              className={`
                flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 
                hover:bg-white transition-all duration-200
                ${isExpanded ? 'justify-start' : 'justify-center'}
              `}
            >
              <Tooltip placement="right" title={!isExpanded ? item.label : null}>
                {React.cloneElement(item.icon, { className: 'text-lg' })}
              </Tooltip>
              {isExpanded && <span className="text-sm">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Fixed sidebar for desktop/tablet (hidden on small screens) */}
      <div
        className={`
          hidden sm:flex fixed top-0 left-0  h-screen flex-col justify-between
          transition-all duration-300 ease-in-out shadow-xl
            ${isExpanded ? 'w-64' : 'w-20'}
            bg-[#002243] text-white my-auto rounded-r-2xl
        `}
      >
        {menuContent}
      </div>

      {/* Drawer for mobile */}
      <Drawer
        placement="left"
        onClose={() => typeof setIsExpanded === 'function' && setIsExpanded(false)}
        open={isMobile && isExpanded}
        closable={true}
        width={260}
        bodyStyle={{ padding: 0, background: '#002243', color: '#fff', minHeight: '100vh' }}
        headerStyle={{ background: '#002243', borderBottom: 'none' }}
      >
        <div style={{ color: '#fff', height: '100%' }}>{menuContent}</div>
      </Drawer>
    </>
  );
};

export default SidebarLayout;
