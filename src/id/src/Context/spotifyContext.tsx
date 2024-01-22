import { createContext, useState } from "react";

type User = {
  display_name: string;
  img: string;
};

type ApiContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const ApiContext = createContext({} as ApiContextType);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ display_name: "", img: "" });
  const [loading, setLoading] = useState(false);

  return (
    <ApiContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </ApiContext.Provider>
  );
};
