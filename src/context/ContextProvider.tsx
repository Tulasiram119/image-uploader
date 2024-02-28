import { User } from "firebase/auth";
import React, { createContext, useMemo, useState, ReactNode } from "react";

interface IAppContext {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AppContext = createContext<IAppContext | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();

  const value = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      error,
      setError,
      user,
      setUser,
    }),
    [email, password, error, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
