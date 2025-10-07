import { useState } from 'react';
import { toast } from 'sonner';
import AboutNavigation from './about/AboutNavigation';
import OwnerCard from './about/OwnerCard';
import StatisticsCard from './about/StatisticsCard';
import PageSettingsCard from './about/PageSettingsCard';
import SocialLinksCard from './about/SocialLinksCard';
import NavigationCard from './about/NavigationCard';
import ContactCard from './about/ContactCard';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  followers?: string;
  enabled: boolean;
}

interface PageSettings {
  enableComments: boolean;
  enableDonations: boolean;
  enableAuction: boolean;
  showStatistics: boolean;
  maintenanceMode: boolean;
}

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [showSettings, setShowSettings] = useState(false);

  const canManageSettings = userRole === 'owner';

  const [ownerInfo, setOwnerInfo] = useState({
    name: 'StreamerPro',
    realName: 'Александр Игнатов',
    avatar: '/img/b5ff3fd1-73c8-4659-b7fb-c8cb106822c5.jpg',
    description: 'Профессиональный стример и геймер с 5+ летним опытом. Играю в Dota 2, CS:GO, Valorant и другие популярные игры. Провожу турниры и розыгрыши для подписчиков!',
    email: 'contact@gamecorn.live',
    location: 'Москва, Россия',
    joinDate: 'Январь 2019',
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
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
    {
      id: 'discord',
      platform: 'Discord',
      url: 'https://discord.gg/gamecorn',
      icon: 'MessageSquare',
      color: '#5865F2',
      followers: '8.5K',
      enabled: true,
    },
    {
      id: 'telegram',
      platform: 'Telegram',
      url: 'https://t.me/gamecornlive',
      icon: 'Send',
      color: '#0088CC',
      followers: '12K',
      enabled: true,
    },
    {
      id: 'vk',
      platform: 'ВКонтакте',
      url: 'https://vk.com/gamecornlive',
      icon: 'Share2',
      color: '#0077FF',
      followers: '23K',
      enabled: true,
    },
    {
      id: 'twitter',
      platform: 'Twitter/X',
      url: 'https://twitter.com/gamecornlive',
      icon: 'Twitter',
      color: '#000000',
      followers: '18K',
      enabled: true,
    },
    {
      id: 'instagram',
      platform: 'Instagram',
      url: 'https://instagram.com/gamecornlive',
      icon: 'Instagram',
      color: '#E4405F',
      followers: '32K',
      enabled: true,
    },
    {
      id: 'tiktok',
      platform: 'TikTok',
      url: 'https://tiktok.com/@gamecornlive',
      icon: 'Music',
      color: '#000000',
      followers: '56K',
      enabled: false,
    },
  ]);

  const [siteStats] = useState({
    totalStreams: 342,
    totalViewers: '1.2M',
    totalDonations: '₽456,789',
    averageViewers: '1,247',
    totalWatchTime: '12.3M часов',
    subscribersCount: '8,234',
  });

  const [pageSettings, setPageSettings] = useState<PageSettings>({
    enableComments: true,
    enableDonations: true,
    enableAuction: true,
    showStatistics: true,
    maintenanceMode: false,
  });

  const [editName, setEditName] = useState(ownerInfo.name);
  const [editRealName, setEditRealName] = useState(ownerInfo.realName);
  const [editDescription, setEditDescription] = useState(ownerInfo.description);
  const [editEmail, setEditEmail] = useState(ownerInfo.email);

  const [editingSocial, setEditingSocial] = useState<string | null>(null);
  const [editSocialUrl, setEditSocialUrl] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserRole('owner');
    toast.success('Вы вошли как владелец! 👑');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('viewer');
    setShowSettings(false);
    toast.info('Вы вышли из аккаунта');
  };

  const saveOwnerInfo = () => {
    setOwnerInfo(prev => ({
      ...prev,
      name: editName,
      realName: editRealName,
      description: editDescription,
      email: editEmail,
    }));
    toast.success('Информация обновлена! ✅');
  };

  const toggleSocialLink = (id: string) => {
    setSocialLinks(prev =>
      prev.map(link =>
        link.id === id ? { ...link, enabled: !link.enabled } : link
      )
    );
    toast.success('Настройки соцсети обновлены!');
  };

  const saveSocialUrl = (id: string) => {
    setSocialLinks(prev =>
      prev.map(link =>
        link.id === id ? { ...link, url: editSocialUrl } : link
      )
    );
    setEditingSocial(null);
    toast.success('Ссылка обновлена! 🔗');
  };

  const updatePageSettings = (key: keyof PageSettings, value: boolean) => {
    setPageSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Настройки страницы обновлены!');
  };

  return (
    <div className="min-h-screen bg-gaming-dark">
      <AboutNavigation
        isLoggedIn={isLoggedIn}
        canManageSettings={canManageSettings}
        showSettings={showSettings}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <OwnerCard
              ownerInfo={ownerInfo}
              showSettings={showSettings}
              canManageSettings={canManageSettings}
              editName={editName}
              setEditName={setEditName}
              editRealName={editRealName}
              setEditRealName={setEditRealName}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              editEmail={editEmail}
              setEditEmail={setEditEmail}
              onSave={saveOwnerInfo}
            />

            <StatisticsCard siteStats={siteStats} />

            {showSettings && canManageSettings && (
              <PageSettingsCard
                pageSettings={pageSettings}
                onUpdate={updatePageSettings}
              />
            )}
          </div>

          <div className="space-y-6">
            <SocialLinksCard
              socialLinks={socialLinks}
              showSettings={showSettings}
              canManageSettings={canManageSettings}
              editingSocial={editingSocial}
              editSocialUrl={editSocialUrl}
              setEditingSocial={setEditingSocial}
              setEditSocialUrl={setEditSocialUrl}
              onToggleLink={toggleSocialLink}
              onSaveUrl={saveSocialUrl}
            />

            <NavigationCard />

            <ContactCard
              email={ownerInfo.email}
              location={ownerInfo.location}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
