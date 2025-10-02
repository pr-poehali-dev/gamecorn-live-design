import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import TwoFactorAuth from './TwoFactorAuth';
import RoleBadge from './RoleBadge';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface UserProfileProps {
  username: string;
  userRole: UserRole;
  email: string;
  onUpdate: (data: any) => void;
}

const UserProfile = ({ username: initialUsername, userRole, email, onUpdate }: UserProfileProps) => {
  const [username, setUsername] = useState(initialUsername);
  const [displayName, setDisplayName] = useState(initialUsername);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar, setAvatar] = useState(`https://api.dicebear.com/7.x/avataaars/svg?seed=${initialUsername}`);
  const [banner, setBanner] = useState('');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [streamNotifications, setStreamNotifications] = useState(true);
  const [donationNotifications, setDonationNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(false);
  
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast.success('Аватар обновлен! 🎨');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result as string);
        toast.success('Баннер обновлен! 🖼️');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdate({
      username,
      displayName,
      bio,
      location,
      website,
      avatar,
      banner,
    });
    toast.success('Профиль сохранен! ✅');
  };

  const handleSaveSettings = () => {
    toast.success('Настройки сохранены! ⚙️');
  };

  const handleEnable2FA = (secret: string) => {
    setTwoFactorEnabled(true);
    setTwoFactorSecret(secret);
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setTwoFactorSecret('');
  };

  const handleVerify2FA = (code: string) => {
    return code === '123456';
  };

  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    toast.success('Новый аватар сгенерирован! 🎲');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card className="bg-gradient-to-r from-gaming-red to-gaming-orange border-gaming-yellow">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Icon name="User" size={28} className="text-gaming-yellow" />
            Личный кабинет
          </CardTitle>
          <CardDescription className="text-white/80">
            Управление профилем и настройками • {email}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30 overflow-hidden">
        <div 
          className="h-32 bg-gradient-to-r from-gaming-red to-gaming-orange relative group cursor-pointer"
          onClick={() => bannerInputRef.current?.click()}
          style={banner ? { backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Icon name="Camera" size={32} className="text-white" />
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
          />
        </div>
        <CardContent className="pt-0 px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            <div className="relative">
              <div 
                className="w-32 h-32 rounded-full border-4 border-gaming-dark overflow-hidden bg-gaming-red cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={avatar} alt={username} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon name="Camera" size={24} className="text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div className="flex-1 mt-16 md:mt-20">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">{displayName}</h2>
                  <p className="text-gray-400">@{username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <RoleBadge role={userRole} size="lg" />
                  </div>
                </div>
                <Button
                  onClick={generateRandomAvatar}
                  variant="outline"
                  className="border-gaming-yellow/50 text-gaming-yellow hover:bg-gaming-yellow/10"
                >
                  <Icon name="Shuffle" size={16} className="mr-2" />
                  Случайный аватар
                </Button>
              </div>
              {bio && (
                <p className="text-gray-300 mt-4">{bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/50 p-2">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gaming-red">
            <Icon name="User" size={16} className="mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gaming-red">
            <Icon name="Lock" size={16} className="mr-2" />
            Приватность
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gaming-red">
            <Icon name="Bell" size={16} className="mr-2" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gaming-red">
            <Icon name="Shield" size={16} className="mr-2" />
            Безопасность
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Edit" size={20} className="text-gaming-yellow" />
                Редактирование профиля
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Никнейм</Label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ProGamer123"
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Уникальное имя для входа</p>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Отображаемое имя</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Крутой Геймер"
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Как вас видят другие</p>
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">О себе</Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Расскажите о себе..."
                  className="bg-black/50 border-gaming-red/30 text-white"
                  rows={4}
                />
                <p className="text-xs text-gray-400 mt-1">{bio.length}/500 символов</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Местоположение</Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Москва, Россия"
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Веб-сайт</Label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-gaming-yellow" />
                Моя статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-black text-gaming-yellow">156</p>
                  <p className="text-sm text-gray-400">Комментариев</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-black text-gaming-orange">23</p>
                  <p className="text-sm text-gray-400">Донатов</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-black text-green-500">₽2.4K</p>
                  <p className="text-sm text-gray-400">Отправлено</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-black text-purple-500">47ч</p>
                  <p className="text-sm text-gray-400">Просмотрено</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Eye" size={20} className="text-gaming-yellow" />
                Настройки приватности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4">
                <Label className="text-white mb-3 block font-bold">Видимость профиля</Label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setProfileVisibility('public')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      profileVisibility === 'public'
                        ? 'border-gaming-yellow bg-gaming-yellow/10'
                        : 'border-gaming-red/30 hover:border-gaming-red/50'
                    }`}
                  >
                    <Icon name="Globe" size={20} className="text-gaming-yellow mx-auto mb-2" />
                    <p className="text-white font-bold">Публичный</p>
                    <p className="text-xs text-gray-400 mt-1">Все могут видеть профиль</p>
                  </button>
                  <button
                    onClick={() => setProfileVisibility('private')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      profileVisibility === 'private'
                        ? 'border-gaming-yellow bg-gaming-yellow/10'
                        : 'border-gaming-red/30 hover:border-gaming-red/50'
                    }`}
                  >
                    <Icon name="Lock" size={20} className="text-gaming-yellow mx-auto mb-2" />
                    <p className="text-white font-bold">Приватный</p>
                    <p className="text-xs text-gray-400 mt-1">Только вы видите профиль</p>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Показывать email</p>
                    <p className="text-sm text-gray-400">Другие пользователи увидят ваш email</p>
                  </div>
                </div>
                <Switch
                  checked={showEmail}
                  onCheckedChange={setShowEmail}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Activity" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Показывать активность</p>
                    <p className="text-sm text-gray-400">Статусы "в сети", "был недавно"</p>
                  </div>
                </div>
                <Switch
                  checked={showActivity}
                  onCheckedChange={setShowActivity}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <Button
                onClick={handleSaveSettings}
                className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Bell" size={20} className="text-gaming-yellow" />
                Управление уведомлениями
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Email уведомления</p>
                    <p className="text-sm text-gray-400">Получать письма о событиях</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Smartphone" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Push-уведомления</p>
                    <p className="text-sm text-gray-400">Всплывающие уведомления в браузере</p>
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Tv" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Начало стримов</p>
                    <p className="text-sm text-gray-400">Когда стример выходит в эфир</p>
                  </div>
                </div>
                <Switch
                  checked={streamNotifications}
                  onCheckedChange={setStreamNotifications}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="DollarSign" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Донаты</p>
                    <p className="text-sm text-gray-400">Когда ваш донат был озвучен</p>
                  </div>
                </div>
                <Switch
                  checked={donationNotifications}
                  onCheckedChange={setDonationNotifications}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="MessageSquare" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Ответы на комментарии</p>
                    <p className="text-sm text-gray-400">Когда кто-то ответил на ваш комментарий</p>
                  </div>
                </div>
                <Switch
                  checked={commentNotifications}
                  onCheckedChange={setCommentNotifications}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <Button
                onClick={handleSaveSettings}
                className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <TwoFactorAuth
            isEnabled={twoFactorEnabled}
            onEnable={handleEnable2FA}
            onDisable={handleDisable2FA}
            onVerify={handleVerify2FA}
          />

          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Key" size={20} className="text-gaming-yellow" />
                Управление аккаунтом
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
              >
                <Icon name="Key" size={16} className="mr-2" />
                Сменить пароль
              </Button>
              <Button
                variant="outline"
                className="w-full border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт моих данных
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить аккаунт
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
