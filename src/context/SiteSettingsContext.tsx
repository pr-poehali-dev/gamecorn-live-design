import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  primaryColor: string;
  secondaryColor: string;
  enableComments: boolean;
  enableDonations: boolean;
  enableAuction: boolean;
  showStatistics: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  socialLinks: SocialLink[];
  ownerInfo: OwnerInfo;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  followers?: string;
  enabled: boolean;
}

interface OwnerInfo {
  name: string;
  realName: string;
  avatar: string;
  description: string;
  email: string;
  location: string;
  joinDate: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'GameCorn Live',
  siteDescription: 'Платформа для стримов и донатов',
  siteLogo: '/img/b5ff3fd1-73c8-4659-b7fb-c8cb106822c5.jpg',
  primaryColor: '#FFD700',
  secondaryColor: '#FF6B00',
  enableComments: true,
  enableDonations: true,
  enableAuction: true,
  showStatistics: true,
  maintenanceMode: false,
  maintenanceMessage: 'Сайт на техническом обслуживании. Скоро вернемся!',
  socialLinks: [
    {
      id: 'youtube',
      platform: 'YouTube',
      url: 'https://youtube.com/@gamecornlive',
      icon: 'Youtube',
      color: '#FF0000',
      followers: '125K',
      enabled: true,
    },
    {
      id: 'twitch',
      platform: 'Twitch',
      url: 'https://twitch.tv/gamecornlive',
      icon: 'Twitch',
      color: '#9146FF',
      followers: '45K',
      enabled: true,
    },
  ],
  ownerInfo: {
    name: 'StreamerPro',
    realName: 'Александр Игнатов',
    avatar: '/img/b5ff3fd1-73c8-4659-b7fb-c8cb106822c5.jpg',
    description: 'Профессиональный стример и геймер с 5+ летним опытом.',
    email: 'contact@gamecorn.live',
    location: 'Москва, Россия',
    joinDate: 'Январь 2019',
  }
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('siteSettings');
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return context;
};
