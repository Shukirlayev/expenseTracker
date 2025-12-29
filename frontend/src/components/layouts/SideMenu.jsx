import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import CharAvatar from '../Cards/CharAvatar';
import { LuLogOut } from 'react-icons/lu';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearUser();
    navigate('/login');
  };

  return (
    <div className="w-68 h-[calc(100vh-64px)] bg-white border-r border-gray-200/50 p-5 sticky top-16 z-20 flex flex-col">
      {/* User info */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-8">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 object-cover bg-slate-100 rounded-full border border-gray-100"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ''}
        </h5>
      </div>

      {/* Menu items */}
      <div className="flex flex-col grow">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all ${
                isActive
                  ? 'text-white bg-primary shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon
                className={`text-xl ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Logout button */}

      <div className="flex flex-col mt-auto">
        <button
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all text-red-600 hover:bg-red-50`}
          onClick={() => setIsLogoutPopupOpen(true)}
        >
          <LuLogOut className="text-xl" />
          <span className="font-medium">Chiqish</span>
        </button>
      </div>

      {/* Logout confirmation popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-80 p-5 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setIsLogoutPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
