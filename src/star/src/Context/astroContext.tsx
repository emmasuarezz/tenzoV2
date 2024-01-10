import { createContext, useContext, useState, ReactNode } from "react";

type AstroDataContextType = {
  astroData: any;
  setAstroData: React.Dispatch<React.SetStateAction<any>>;
};

// Create a context
const AstroDataContext = createContext<AstroDataContextType | null>(null);

// Define the props for the provider component
type AstroDataProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const AstroDataProvider: React.FC<AstroDataProviderProps> = ({
  children,
}) => {
  const [astroData, setAstroData] = useState<any>(null);

  return (
    <AstroDataContext.Provider value={{ astroData, setAstroData }}>
      {children}
    </AstroDataContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAstroData = () => {
  const context = useContext(AstroDataContext);
  if (context === undefined) {
    throw new Error("useAstroData must be used within a AstroDataProvider");
  }
  return context;
};
