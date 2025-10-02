import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

  // Информация о владельце
  const [ownerInfo, setOwnerInfo] = useState({
    name: 'StreamerPro',
    realName: 'Александр Игнатов',
    avatar: '/img/b5ff3fd1-73c8-4659-b7fb-c8cb106822c5.jpg',
    description: 'Профессиональный стример и геймер с 5+ летним опытом. Играю в Dota 2, CS:GO, Valorant и другие популярные игры. Провожу турниры и розыгрыши для подписчиков!',
    email: 'contact@gamecorn.live',
    location: 'Москва, Россия',
    joinDate: 'Январь 2019',
  });

  // Социальные сети
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

  // Статистика сайта
  const [siteStats] = useState({
    totalStreams: 342,
    totalViewers: '1.2M',
    totalDonations: '₽456,789',
    averageViewers: '1,247',
    totalWatchTime: '12.3M часов',
    subscribersCount: '8,234',
  });

  // Настройки страниц
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    enableComments: true,
    enableDonations: true,
    enableAuction: true,
    showStatistics: true,
    maintenanceMode: false,
  });

  // Редактирование информации
  const [editName, setEditName] = useState(ownerInfo.name);
  const [editRealName, setEditRealName] = useState(ownerInfo.realName);
  const [editDescription, setEditDescription] = useState(ownerInfo.description);
  const [editEmail, setEditEmail] = useState(ownerInfo.email);

  // Редактирование соцсетей
  const [editingSocial, setEditingSocial] = useState<string | null>(null);
  const [editSocialUrl, setEditSocialUrl] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserRole('owner'); // Для демо сразу даем права владельца
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
      {/* Навигация */}
      <nav className="bg-black/50 backdrop-blur-md border-b border-gaming-red/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3">
                <Icon name="ArrowLeft" size={24} className="text-gaming-yellow" />
                <span className="text-white font-bold">Назад</span>
              </a>
              <div className="h-8 w-px bg-gaming-red/30" />
              <div>
                <h1 className="text-2xl font-black text-gradient-fire">О НАС</h1>
                <p className="text-gaming-yellow text-xs font-medium">
                  Информация о канале и владельце
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  {canManageSettings && (
                    <Button
                      onClick={() => setShowSettings(!showSettings)}
                      variant="outline"
                      className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/20"
                    >
                      <Icon
                        name={showSettings ? 'EyeOff' : 'Settings'}
                        className="mr-2"
                        size={18}
                      />
                      {showSettings ? 'Скрыть настройки' : 'Управление'}
                    </Button>
                  )}
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-gaming-red/50 text-white hover:bg-gaming-red/20"
                  >
                    <Icon name="LogOut" className="mr-2" size={18} />
                    Выйти
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold"
                >
                  <Icon name="User" className="mr-2" size={20} />
                  ВОЙТИ
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Левая колонка - Информация о владельце */}
          <div className="lg:col-span-2 space-y-6">
            {/* Карточка владельца */}
            <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-gradient-fire flex items-center gap-2">
                  <Icon name="Crown" size={24} />
                  Владелец канала
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-6">
                  <img
                    src={ownerInfo.avatar}
                    alt={ownerInfo.name}
                    className="w-32 h-32 rounded-full border-4 border-gaming-yellow shadow-lg shadow-gaming-yellow/50"
                  />
                  <div className="flex-1 space-y-3">
                    {showSettings && canManageSettings ? (
                      <>
                        <div className="space-y-2">
                          <Label className="text-white">Никнейм</Label>
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-black/50 border-gaming-red/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Настоящее имя</Label>
                          <Input
                            value={editRealName}
                            onChange={(e) => setEditRealName(e.target.value)}
                            className="bg-black/50 border-gaming-red/30 text-white"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-3xl font-black text-white">
                          {ownerInfo.name}
                        </h2>
                        <p className="text-gaming-yellow text-lg font-medium">
                          {ownerInfo.realName}
                        </p>
                      </>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gaming-yellow text-black font-bold">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        {ownerInfo.location}
                      </Badge>
                      <Badge className="bg-gaming-red text-white font-bold">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        С {ownerInfo.joinDate}
                      </Badge>
                      <Badge className="bg-gaming-orange text-white font-bold">
                        <Icon name="Mail" size={12} className="mr-1" />
                        {ownerInfo.email}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {showSettings && canManageSettings ? (
                    <>
                      <Label className="text-white">Описание</Label>
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="bg-black/50 border-gaming-red/30 text-white"
                        rows={4}
                      />
                      <div className="space-y-2">
                        <Label className="text-white">Email для связи</Label>
                        <Input
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="bg-black/50 border-gaming-red/30 text-white"
                        />
                      </div>
                      <Button
                        onClick={saveOwnerInfo}
                        className="w-full bg-gaming-yellow hover:bg-gaming-yellow/80 text-black font-bold"
                      >
                        <Icon name="Save" className="mr-2" size={18} />
                        Сохранить изменения
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {ownerInfo.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Статистика */}
            <Card className="bg-black/30 border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="BarChart3" size={24} className="text-gaming-yellow" />
                  Статистика канала
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gaming-red/20 rounded-lg p-4 text-center border border-gaming-red/30">
                    <Icon name="Tv" size={32} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">
                      {siteStats.totalStreams}
                    </div>
                    <div className="text-gray-400 text-sm">Всего стримов</div>
                  </div>
                  <div className="bg-gaming-orange/20 rounded-lg p-4 text-center border border-gaming-orange/30">
                    <Icon name="Eye" size={32} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">
                      {siteStats.totalViewers}
                    </div>
                    <div className="text-gray-400 text-sm">Всего зрителей</div>
                  </div>
                  <div className="bg-gaming-yellow/20 rounded-lg p-4 text-center border border-gaming-yellow/30">
                    <Icon name="DollarSign" size={32} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">
                      {siteStats.totalDonations}
                    </div>
                    <div className="text-gray-400 text-sm">Донатов получено</div>
                  </div>
                  <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
                    <Icon name="Users" size={32} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">
                      {siteStats.averageViewers}
                    </div>
                    <div className="text-gray-400 text-sm">Средний онлайн</div>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
                    <Icon name="Clock" size={32} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">
                      {siteStats.totalWatchTime}
                    </div>
                    <div className="text-gray-400 text-sm">Время просмотра</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
                    <Icon name="UserPlus" size={32} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">
                      {siteStats.subscribersCount}
                    </div>
                    <div className="text-gray-400 text-sm">Подписчиков</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Настройки страниц (только для владельца) */}
            {showSettings && canManageSettings && (
              <Card className="bg-gaming-yellow/10 border-gaming-yellow/30 animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Sliders" size={24} className="text-gaming-yellow" />
                    Настройки функций сайта
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div>
                      <Label className="text-white font-medium">Комментарии</Label>
                      <p className="text-gray-400 text-sm">
                        Разрешить пользователям оставлять комментарии
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.enableComments}
                      onCheckedChange={(checked) =>
                        updatePageSettings('enableComments', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div>
                      <Label className="text-white font-medium">Донаты</Label>
                      <p className="text-gray-400 text-sm">Система донатов и алертов</p>
                    </div>
                    <Switch
                      checked={pageSettings.enableDonations}
                      onCheckedChange={(checked) =>
                        updatePageSettings('enableDonations', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div>
                      <Label className="text-white font-medium">Аукционная рулетка</Label>
                      <p className="text-gray-400 text-sm">
                        Доступ к странице аукциона
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.enableAuction}
                      onCheckedChange={(checked) =>
                        updatePageSettings('enableAuction', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div>
                      <Label className="text-white font-medium">Статистика</Label>
                      <p className="text-gray-400 text-sm">Показывать статистику канала</p>
                    </div>
                    <Switch
                      checked={pageSettings.showStatistics}
                      onCheckedChange={(checked) =>
                        updatePageSettings('showStatistics', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-500/50">
                    <div>
                      <Label className="text-white font-medium flex items-center gap-2">
                        <Icon name="AlertTriangle" size={16} className="text-red-500" />
                        Режим обслуживания
                      </Label>
                      <p className="text-gray-400 text-sm">
                        Закрыть доступ к сайту для всех, кроме владельца
                      </p>
                    </div>
                    <Switch
                      checked={pageSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        updatePageSettings('maintenanceMode', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Правая колонка - Социальные сети */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gaming-yellow/10 to-gaming-orange/10 border-gaming-yellow/30">
              <CardHeader>
                <CardTitle className="text-gradient-fire flex items-center gap-2">
                  <Icon name="Share2" size={24} />
                  Социальные сети
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks
                  .filter((link) => showSettings || link.enabled)
                  .map((link) => (
                    <div key={link.id}>
                      {editingSocial === link.id && showSettings ? (
                        <div className="space-y-2 p-3 bg-black/30 rounded-lg border border-gaming-yellow/30">
                          <Label className="text-white text-sm">Редактировать ссылку</Label>
                          <Input
                            value={editSocialUrl}
                            onChange={(e) => setEditSocialUrl(e.target.value)}
                            className="bg-black/50 border-gaming-red/30 text-white text-sm"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => saveSocialUrl(link.id)}
                              size="sm"
                              className="flex-1 bg-gaming-yellow hover:bg-gaming-yellow/80 text-black"
                            >
                              <Icon name="Save" size={14} className="mr-1" />
                              Сохранить
                            </Button>
                            <Button
                              onClick={() => setEditingSocial(null)}
                              size="sm"
                              variant="outline"
                              className="border-gaming-red/30 text-white"
                            >
                              Отмена
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block p-4 rounded-lg border transition-all ${
                            link.enabled
                              ? 'bg-black/30 border-gaming-red/30 hover:border-gaming-yellow/50 hover:scale-105'
                              : 'bg-black/10 border-gray-600/30 opacity-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: link.color }}
                              >
                                <Icon name={link.icon} size={24} className="text-white" />
                              </div>
                              <div>
                                <div className="text-white font-bold">{link.platform}</div>
                                {link.followers && (
                                  <div className="text-gaming-yellow text-sm">
                                    {link.followers} подписчиков
                                  </div>
                                )}
                              </div>
                            </div>
                            {showSettings && canManageSettings && (
                              <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                                <Button
                                  onClick={() => {
                                    setEditingSocial(link.id);
                                    setEditSocialUrl(link.url);
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  className="text-white hover:text-gaming-yellow"
                                >
                                  <Icon name="Edit" size={16} />
                                </Button>
                                <Switch
                                  checked={link.enabled}
                                  onCheckedChange={() => toggleSocialLink(link.id)}
                                />
                              </div>
                            )}
                          </div>
                        </a>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Навигация по сайту */}
            <Card className="bg-black/30 border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Navigation" size={20} className="text-gaming-yellow" />
                  Навигация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/"
                  className="block p-3 bg-black/30 rounded-lg hover:bg-gaming-red/20 transition-all border border-gaming-red/30 hover:border-gaming-yellow/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Home" size={20} className="text-gaming-yellow" />
                    <span className="text-white font-medium">Главная</span>
                  </div>
                </a>
                <a
                  href="/auction"
                  className="block p-3 bg-black/30 rounded-lg hover:bg-gaming-orange/20 transition-all border border-gaming-red/30 hover:border-gaming-yellow/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Target" size={20} className="text-gaming-yellow" />
                    <span className="text-white font-medium">Аукционная рулетка</span>
                  </div>
                </a>
                <a
                  href="/about"
                  className="block p-3 bg-gaming-yellow/20 rounded-lg border border-gaming-yellow/50"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Info" size={20} className="text-gaming-yellow" />
                    <span className="text-white font-medium">О нас (текущая)</span>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Контакты */}
            <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Mail" size={20} className="text-gaming-yellow" />
                  Связаться с нами
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={`mailto:${ownerInfo.email}`}
                  className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-gaming-red/20 transition-all"
                >
                  <Icon name="Mail" size={20} className="text-gaming-yellow" />
                  <span className="text-white">{ownerInfo.email}</span>
                </a>
                <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                  <Icon name="MapPin" size={20} className="text-gaming-yellow" />
                  <span className="text-white">{ownerInfo.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
