import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 1. Sahifa yuklanganda saqlangan foydalanuvchini qayta tiklash
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("User ma'lumotlarini o'qishda xato:", error);
      }
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    // 2. Yangilangan ma'lumotni localStorage ga saqlash
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    // 3. Logout bo'lganda tozalash
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
