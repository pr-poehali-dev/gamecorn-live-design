import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface OwnerInfo {
  name: string;
  realName: string;
  avatar: string;
  description: string;
  email: string;
  location: string;
  joinDate: string;
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

interface PageSettings {
  enableComments: boolean;
  enableDonations: boolean;
  enableAuction: boolean;
  showStatistics: boolean;
  maintenanceMode: boolean;
}

interface AboutPageEditorProps {
  ownerInfo: OwnerInfo;
  socialLinks: SocialLink[];
  pageSettings: PageSettings;
  onUpdateOwner: (info: OwnerInfo) => void;
  onUpdateSocialLinks: (links: SocialLink[]) => void;
  onUpdatePageSettings: (settings: PageSettings) => void;
}

const AboutPageEditor = ({
  ownerInfo,
  socialLinks,
  pageSettings,
  onUpdateOwner,
  onUpdateSocialLinks,
  onUpdatePageSettings
}: AboutPageEditorProps) => {
  const [localOwnerInfo, setLocalOwnerInfo] = useState(ownerInfo);
  const [localSocialLinks, setLocalSocialLinks] = useState(socialLinks);
  const [localPageSettings, setLocalPageSettings] = useState(pageSettings);
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [newSocialIcon, setNewSocialIcon] = useState('');
  const [newSocialColor, setNewSocialColor] = useState('#000000');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const availableIcons = [
    'Youtube', 'Twitch', 'Twitter', 'Instagram', 'Facebook', 'Linkedin',
    'MessageSquare', 'Send', 'Share2', 'Music', 'Video', 'Monitor',
    'Tv', 'Radio', 'Mic', 'Phone', 'Mail', 'Globe'
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalOwnerInfo(prev => ({ ...prev, avatar: reader.result as string }));
        toast.success('Аватар загружен! 🎨');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveOwner = () => {
    onUpdateOwner(localOwnerInfo);
    toast.success('Информация владельца сохранена! ✅');
  };

  const handleAddSocialLink = () => {
    if (!newSocialPlatform || !newSocialUrl) {
      toast.error('Заполните все поля!');
      return;
    }

    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: newSocialPlatform,
      url: newSocialUrl,
      icon: newSocialIcon || 'Link',
      color: newSocialColor,
      enabled: true
    };

    const updatedLinks = [...localSocialLinks, newLink];
    setLocalSocialLinks(updatedLinks);
    onUpdateSocialLinks(updatedLinks);

    setNewSocialPlatform('');
    setNewSocialUrl('');
    setNewSocialIcon('');
    setNewSocialColor('#000000');
    toast.success('Соцсеть добавлена! 🔗');
  };

  const handleUpdateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    const updatedLinks = localSocialLinks.map(link =>
      link.id === id ? { ...link, ...updates } : link
    );
    setLocalSocialLinks(updatedLinks);
    onUpdateSocialLinks(updatedLinks);
    toast.success('Соцсеть обновлена!');
  };

  const handleDeleteSocialLink = (id: string) => {
    const updatedLinks = localSocialLinks.filter(link => link.id !== id);
    setLocalSocialLinks(updatedLinks);
    onUpdateSocialLinks(updatedLinks);
    toast.success('Соцсеть удалена!');
  };

  const handleSavePageSettings = () => {
    onUpdatePageSettings(localPageSettings);
    toast.success('Настройки страницы сохранены! ⚙️');
  };

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-yellow/30">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-3">
          <Icon name="Settings" size={28} className="text-gaming-yellow" />
          Управление страницей "О нас"
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="owner" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 bg-black/50 p-2">
            <TabsTrigger value="owner">
              <Icon name="User" size={16} className="mr-2" />
              Владелец
            </TabsTrigger>
            <TabsTrigger value="social">
              <Icon name="Share2" size={16} className="mr-2" />
              Соцсети
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Sliders" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="owner" className="space-y-4 mt-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <img
                  src={localOwnerInfo.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-gaming-yellow"
                />
                <Button
                  onClick={() => avatarInputRef.current?.click()}
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gaming-yellow hover:bg-gaming-yellow/80"
                >
                  <Icon name="Camera" size={16} className="text-black" />
                </Button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Аватар владельца</h3>
                <p className="text-gray-400 text-sm">Нажмите на камеру для загрузки</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Никнейм</Label>
                <Input
                  value={localOwnerInfo.name}
                  onChange={(e) => setLocalOwnerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-black/50 border-gaming-yellow/30 text-white"
                  placeholder="StreamerPro"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Настоящее имя</Label>
                <Input
                  value={localOwnerInfo.realName}
                  onChange={(e) => setLocalOwnerInfo(prev => ({ ...prev, realName: e.target.value }))}
                  className="bg-black/50 border-gaming-yellow/30 text-white"
                  placeholder="Иван Иванов"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Описание</Label>
              <Textarea
                value={localOwnerInfo.description}
                onChange={(e) => setLocalOwnerInfo(prev => ({ ...prev, description: e.target.value }))}
                className="bg-black/50 border-gaming-yellow/30 text-white"
                rows={5}
                placeholder="Расскажите о себе..."
              />
              <p className="text-xs text-gray-400 mt-1">{localOwnerInfo.description.length} символов</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Email для связи</Label>
                <Input
                  type="email"
                  value={localOwnerInfo.email}
                  onChange={(e) => setLocalOwnerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-black/50 border-gaming-yellow/30 text-white"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Местоположение</Label>
                <Input
                  value={localOwnerInfo.location}
                  onChange={(e) => setLocalOwnerInfo(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-black/50 border-gaming-yellow/30 text-white"
                  placeholder="Москва, Россия"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Дата регистрации</Label>
              <Input
                value={localOwnerInfo.joinDate}
                onChange={(e) => setLocalOwnerInfo(prev => ({ ...prev, joinDate: e.target.value }))}
                className="bg-black/50 border-gaming-yellow/30 text-white"
                placeholder="Январь 2024"
              />
            </div>

            <Button
              onClick={handleSaveOwner}
              className="w-full bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold"
            >
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить информацию владельца
            </Button>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-6">
            <Card className="bg-gaming-yellow/10 border-gaming-yellow/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Icon name="Plus" size={20} className="text-gaming-yellow" />
                  Добавить соцсеть
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white mb-2 block">Название платформы</Label>
                    <Input
                      value={newSocialPlatform}
                      onChange={(e) => setNewSocialPlatform(e.target.value)}
                      className="bg-black/50 border-gaming-yellow/30 text-white"
                      placeholder="YouTube, Twitch, Discord..."
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">URL ссылка</Label>
                    <Input
                      value={newSocialUrl}
                      onChange={(e) => setNewSocialUrl(e.target.value)}
                      className="bg-black/50 border-gaming-yellow/30 text-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white mb-2 block">Иконка</Label>
                    <select
                      value={newSocialIcon}
                      onChange={(e) => setNewSocialIcon(e.target.value)}
                      className="w-full bg-black/50 border border-gaming-yellow/30 text-white rounded-lg p-2"
                    >
                      <option value="">Выберите иконку</option>
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Цвет</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newSocialColor}
                        onChange={(e) => setNewSocialColor(e.target.value)}
                        className="w-20 h-10 bg-black/50 border-gaming-yellow/30"
                      />
                      <Input
                        value={newSocialColor}
                        onChange={(e) => setNewSocialColor(e.target.value)}
                        className="flex-1 bg-black/50 border-gaming-yellow/30 text-white"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAddSocialLink}
                  className="w-full bg-gaming-yellow hover:bg-gaming-yellow/80 text-black font-bold"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить соцсеть
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h4 className="text-white font-bold">Все соцсети ({localSocialLinks.length})</h4>
              {localSocialLinks.map(link => (
                <Card key={link.id} className="bg-black/30 border-gaming-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: link.color }}
                        >
                          <Icon name={link.icon} size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{link.platform}</p>
                          <p className="text-xs text-gray-400">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={link.enabled}
                          onCheckedChange={(checked) =>
                            handleUpdateSocialLink(link.id, { enabled: checked })
                          }
                          className="data-[state=checked]:bg-gaming-yellow"
                        />
                        <Button
                          onClick={() => handleDeleteSocialLink(link.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/20"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-white text-xs mb-1 block">URL</Label>
                        <Input
                          value={link.url}
                          onChange={(e) =>
                            handleUpdateSocialLink(link.id, { url: e.target.value })
                          }
                          className="bg-black/50 border-gaming-yellow/30 text-white text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs mb-1 block">Подписчиков</Label>
                        <Input
                          value={link.followers || ''}
                          onChange={(e) =>
                            handleUpdateSocialLink(link.id, { followers: e.target.value })
                          }
                          className="bg-black/50 border-gaming-yellow/30 text-white text-sm"
                          placeholder="125K"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold mb-3">Функции страниц</h4>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <Label className="text-white font-medium">Комментарии</Label>
                  <p className="text-sm text-gray-400">Разрешить комментарии на сайте</p>
                </div>
                <Switch
                  checked={localPageSettings.enableComments}
                  onCheckedChange={(checked) =>
                    setLocalPageSettings(prev => ({ ...prev, enableComments: checked }))
                  }
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <Label className="text-white font-medium">Система донатов</Label>
                  <p className="text-sm text-gray-400">Донаты и алерты на стриме</p>
                </div>
                <Switch
                  checked={localPageSettings.enableDonations}
                  onCheckedChange={(checked) =>
                    setLocalPageSettings(prev => ({ ...prev, enableDonations: checked }))
                  }
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <Label className="text-white font-medium">Аукционная рулетка</Label>
                  <p className="text-sm text-gray-400">Страница с аукционом</p>
                </div>
                <Switch
                  checked={localPageSettings.enableAuction}
                  onCheckedChange={(checked) =>
                    setLocalPageSettings(prev => ({ ...prev, enableAuction: checked }))
                  }
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <Label className="text-white font-medium">Показать статистику</Label>
                  <p className="text-sm text-gray-400">Статистика на странице "О нас"</p>
                </div>
                <Switch
                  checked={localPageSettings.showStatistics}
                  onCheckedChange={(checked) =>
                    setLocalPageSettings(prev => ({ ...prev, showStatistics: checked }))
                  }
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-red-500/20 rounded-lg border border-red-500/50">
                <div>
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-red-500" />
                    Режим обслуживания
                  </Label>
                  <p className="text-sm text-gray-400">Закрыть сайт для посетителей</p>
                </div>
                <Switch
                  checked={localPageSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setLocalPageSettings(prev => ({ ...prev, maintenanceMode: checked }))
                  }
                  className="data-[state=checked]:bg-red-500"
                />
              </div>
            </div>

            <Button
              onClick={handleSavePageSettings}
              className="w-full bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold"
            >
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить настройки
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AboutPageEditor;
