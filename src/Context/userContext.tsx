import { createContext, useState, Dispatch, SetStateAction } from "react";

type UserContextType = {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<string>("stranger");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
