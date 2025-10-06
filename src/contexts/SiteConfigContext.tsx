import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SiteConfig {
  siteName: string;
  siteLogo: string;
  bannerImage: string;
  backgroundImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  auctionEnabled: boolean;
  auctionTitle: string;
  auctionStartPrice: number;
  auctionMinBid: number;
  rouletteEnabled: boolean;
  roulettePrizes: string[];
  rouletteWinChance: number;
}

const defaultConfig: SiteConfig = {
  siteName: 'STREAM.TV',
  siteLogo: '/img/logo.png',
  bannerImage: '/img/banner-bg.jpg',
  backgroundImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
  primaryColor: '#1a0b2e',
  secondaryColor: '#7c3aed',
  accentColor: '#fbbf24',
  auctionEnabled: true,
  auctionTitle: 'Аукцион донатов',
  auctionStartPrice: 100,
  auctionMinBid: 50,
  rouletteEnabled: true,
  roulettePrizes: ['Значок VIP', 'Стикерпак', 'Упоминание в стриме', 'Выбор игры', 'Персональный привет'],
  rouletteWinChance: 30
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within SiteConfigProvider');
  }
  return context;
};

interface SiteConfigProviderProps {
  children: ReactNode;
}

export const SiteConfigProvider = ({ children }: SiteConfigProviderProps) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem('siteConfig', JSON.stringify(updatedConfig));
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};
