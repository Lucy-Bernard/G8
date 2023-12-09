/**
* Author: Isaiah Stone
* 
* Used to pass user through child pages
**/

"use client";

import {createContext, useContext, useState, ReactNode} from "react";

type User = {
  userId: number;
  email: string;
  password: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Props interface for the provider
type UserProviderProps = {
  children: ReactNode;
};

// The provider component
export function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // The value that will be supplied to the context
  const value = {user, setUser};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Hook for easy access to the context
export function useUser() {
  return useContext(UserContext);
}
