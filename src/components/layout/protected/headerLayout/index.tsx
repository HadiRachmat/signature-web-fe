// ...existing code...
import { useState } from 'react';
import { Button, Input, Dropdown, Avatar, Drawer, type MenuProps } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  UserOutlined,
  EditOutlined,
  LockOutlined,
  MailOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const HeaderLayout = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  // use dummy user for now
  const [user] = useState({ name: 'Demo Admin', avatar: null });
  const navigate = useNavigate();
  const onSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'profile') navigate('/protected/profile-page');
    if (key === 'contact') navigate('/protected/contact');
    if (key === 'password') navigate('/protected/change-password');
    if (key === 'logout') navigate('/protected/profile');
  };

  const menu: MenuProps = {
    items: [
      {
        key: 'profile',
        label: 'Edit Profile',
        icon: <EditOutlined />,
      },
      {
        key: 'contact',
        label: 'Contact',
        icon: <MailOutlined />,
      },
      {
        key: 'password',
        label: 'Change Password',
        icon: <LockOutlined />,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
        danger: true,
      },
    ],
    onClick: handleMenuClick,
  };

  // helper untuk inisial ketika tidak ada avatar
  const initials = (name: string | undefined) =>
    (name || '')
      .split(' ')
      .map((n: string) => n[0] || '')
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl px-3 sm:px-6 bg-white shadow-lg mx-3 sm:mx-4 my-3 p-2 sm:p-3 transition-all duration-300 ease-in-out sm:sticky sm:top-0 z-20">
        {/* Left: menu toggle */}
        <div className="flex items-center gap-2">
          <Button
            type="text"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center text-[20px] h-10"
          >
            {isExpanded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>

          {/* removed fixed h-10 here so text aligns vertically centered with button */}
          <div className="items-center pl-2 pt-2 border-l border-gray-300">
            <h2 className="font-semibold text-[#001529] text-sm sm:text-base leading-none">
              Dashboard
            </h2>
          </div>
        </div>

        {/* Center: title */}

        {/* Right: search icon (mobile) + avatar */}
        <div className="flex items-center gap-2">
          {/* mobile search icon */}
          <div className="sm:hidden">
            <Button type="text" onClick={() => setMobileSearchOpen(true)} className="p-1">
              <SearchOutlined style={{ fontSize: 18 }} />
            </Button>
          </div>

          {/* desktop search (kept) */}
          <div className="hidden sm:block mr-2">
            <Search
              placeholder="Search..."
              onSearch={onSearch}
              enterButton={<SearchOutlined />}
              size="middle"
              allowClear
              className="rounded-lg w-56"
            />
          </div>

          <Dropdown menu={menu} placement="bottomRight" arrow>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition">
              <Avatar
                size={32}
                src={user.avatar || undefined}
                icon={!user.avatar ? <UserOutlined /> : undefined}
              >
                {!user.avatar && initials(user.name)}
              </Avatar>
              <span className="hidden sm:inline font-medium text-[#555]">{user.name}</span>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Search Drawer (top small) */}
      <Drawer
        title={false}
        placement="top"
        onClose={() => setMobileSearchOpen(false)}
        open={mobileSearchOpen}
        height={120}
        bodyStyle={{ padding: 12 }}
      >
        <Search
          autoFocus
          placeholder="Cari..."
          onSearch={(v) => {
            onSearch(v);
            setMobileSearchOpen(false);
          }}
          enterButton={<SearchOutlined />}
          size="middle"
          allowClear
          className="w-full"
        />
      </Drawer>
    </>
  );
};

export default HeaderLayout;
// ...existing code...
