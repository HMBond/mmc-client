import React from 'react';
import { UserContext } from '../../../context';

const UserContextProvider = ({ children, arrangement, setArrangement }) => {
  const userContextProviderValue = { arrangement, setArrangement };
  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
