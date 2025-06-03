import { createContext, useContext, ReactNode } from 'react';
import '../../styles/acrylic.css';

// Context cho Acrylic components (có thể mở rộng sau này)
interface AcrylicContextType {
  // Future: có thể thêm config cho blur intensity, border radius, etc.
  intensity?: 'light' | 'medium' | 'heavy';
}

const AcrylicContext = createContext<AcrylicContextType>({
  intensity: 'medium'
});

// Hook để sử dụng acrylic context
export const useAcrylic = () => {
  return useContext(AcrylicContext);
};

// Provider component để wrap app và inject acrylic styles
interface AcrylicProviderProps {
  children: ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
}

function AcrylicProvider({ children, intensity = 'medium' }: AcrylicProviderProps) {
  return (
    <AcrylicContext.Provider value={{ intensity }}>
      {children}
    </AcrylicContext.Provider>
  );
}

export default AcrylicProvider; 