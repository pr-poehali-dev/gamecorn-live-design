import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import TwoFactorAuth from './TwoFactorAuth';

interface AdminPanelProps {
  userEmail: string;
}

const AdminPanel = ({ userEmail }: AdminPanelProps) => {
  const [siteName, setSiteName] = useState('GameCorn Live');
  const [siteDescription, setSiteDescription] = useState('Игровые стримы каждый день');
  const [maxViewers, setMaxViewers] = useState('10000');
  const [donationMin, setDonationMin] = useState('10');
  const [donationMax, setDonationMax] = useState('100000');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [donationsEnabled, setDonationsEnabled] = useState(true);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [moderationMode, setModerationMode] = useState(false);
  const [autoModeration, setAutoModeration] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState('');

  const handleSaveSettings = () => {
    toast.success('Настройки сохранены! ⚙️', {
      description: 'Все изменения применены к сайту'
    });
  };

  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Кэш очищен! 🗑️');
  };

  const handleExportData = () => {
    const data = {
      siteName,
      siteDescription,
      settings: {
        maintenanceMode,
        commentsEnabled,
        donationsEnabled,
        registrationEnabled,
        moderationMode,
        autoModeration
      },
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gamecorn-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Настройки экспортированы! 📦');
  };

  const handleEnable2FA = (secret: string) => {
    setTwoFactorEnabled(true);
    setTwoFactorSecret(secret);
    toast.success('2FA включена для вашего аккаунта! 🔐');
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setTwoFactorSecret('');
  };

  const handleVerify2FA = (code: string) => {
    return code === '123456';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card className="bg-gradient-to-r from-gaming-red to-gaming-orange border-gaming-yellow">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Icon name="Crown" size={28} className="text-gaming-yellow" />
            Панель администратора
          </CardTitle>
          <CardDescription className="text-white/80">
            Полный доступ к управлению сайтом • {userEmail}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-black/50 p-2">
          <TabsTrigger value="general" className="data-[state=active]:bg-gaming-red">
            <Icon name="Settings" size={16} className="mr-2" />
            Основные
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-gaming-red">
            <Icon name="Zap" size={16} className="mr-2" />
            Функции
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gaming-red">
            <Icon name="Shield" size={16} className="mr-2" />
            Безопасность
          </TabsTrigger>
          <TabsTrigger value="moderation" className="data-[state=active]:bg-gaming-red">
            <Icon name="ShieldAlert" size={16} className="mr-2" />
            Модерация
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-gaming-red">
            <Icon name="Server" size={16} className="mr-2" />
            Система
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Globe" size={20} className="text-gaming-yellow" />
                Основные настройки сайта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Название сайта</Label>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Описание</Label>
                <Textarea
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Макс. зрителей онлайн</Label>
                  <Input
                    type="number"
                    value={maxViewers}
                    onChange={(e) => setMaxViewers(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Мин. сумма доната (₽)</Label>
                  <Input
                    type="number"
                    value={donationMin}
                    onChange={(e) => setDonationMin(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveSettings}
                className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Zap" size={20} className="text-gaming-yellow" />
                Управление функциями
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="MessageSquare" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Комментарии</p>
                    <p className="text-sm text-gray-400">Разрешить пользователям оставлять комментарии</p>
                  </div>
                </div>
                <Switch
                  checked={commentsEnabled}
                  onCheckedChange={setCommentsEnabled}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="DollarSign" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Донаты</p>
                    <p className="text-sm text-gray-400">Разрешить отправку донатов</p>
                  </div>
                </div>
                <Switch
                  checked={donationsEnabled}
                  onCheckedChange={setDonationsEnabled}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="UserPlus" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Регистрация</p>
                    <p className="text-sm text-gray-400">Разрешить новым пользователям регистрироваться</p>
                  </div>
                </div>
                <Switch
                  checked={registrationEnabled}
                  onCheckedChange={setRegistrationEnabled}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="AlertTriangle" size={20} className="text-red-400" />
                  <div>
                    <p className="font-bold text-white">Режим обслуживания</p>
                    <p className="text-sm text-gray-400">Закрыть доступ к сайту (только для админов)</p>
                  </div>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                  className="data-[state=checked]:bg-red-500"
                />
              </div>
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
                Дополнительная безопасность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gaming-red/10 border border-gaming-red/30 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Icon name="Info" size={20} className="text-gaming-yellow mt-0.5" />
                  <div>
                    <p className="font-bold text-white mb-1">Ваш аккаунт администратора</p>
                    <p className="text-sm text-gray-300">Email: {userEmail}</p>
                    <p className="text-sm text-gray-300">Роль: Владелец (Owner)</p>
                    <p className="text-sm text-gray-300">Права: Полный доступ ко всем функциям</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
                >
                  <Icon name="Key" size={16} className="mr-2" />
                  Сменить пароль
                </Button>
                <Button
                  variant="outline"
                  className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
                >
                  <Icon name="History" size={16} className="mr-2" />
                  История входов
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="ShieldAlert" size={20} className="text-gaming-yellow" />
                Настройки модерации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="ShieldCheck" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Премодерация</p>
                    <p className="text-sm text-gray-400">Проверять комментарии перед публикацией</p>
                  </div>
                </div>
                <Switch
                  checked={moderationMode}
                  onCheckedChange={setModerationMode}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Bot" size={20} className="text-gaming-yellow" />
                  <div>
                    <p className="font-bold text-white">Автомодерация</p>
                    <p className="text-sm text-gray-400">Автоматически фильтровать спам и оскорбления</p>
                  </div>
                </div>
                <Switch
                  checked={autoModeration}
                  onCheckedChange={setAutoModeration}
                  className="data-[state=checked]:bg-gaming-yellow"
                />
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-white font-bold mb-2">Статистика модерации</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-gaming-yellow">0</p>
                    <p className="text-xs text-gray-400">На проверке</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-green-500">156</p>
                    <p className="text-xs text-gray-400">Одобрено</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-red-500">12</p>
                    <p className="text-xs text-gray-400">Заблокировано</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Server" size={20} className="text-gaming-yellow" />
                Системные инструменты
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <Button
                  onClick={handleClearCache}
                  variant="outline"
                  className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить кэш
                </Button>
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт настроек
                </Button>
                <Button
                  variant="outline"
                  className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
                >
                  <Icon name="Database" size={16} className="mr-2" />
                  Резервная копия
                </Button>
                <Button
                  variant="outline"
                  className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
                >
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Аналитика
                </Button>
              </div>

              <div className="bg-black/30 rounded-lg p-4 space-y-2">
                <p className="font-bold text-white mb-2">Информация о системе</p>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Версия сайта:</span>
                    <span className="text-gaming-yellow">2.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Всего пользователей:</span>
                    <span className="text-gaming-yellow">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Активных сессий:</span>
                    <span className="text-green-500">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Использование хранилища:</span>
                    <span className="text-gaming-yellow">2.3 GB / 10 GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
