import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const GlobalSiteSettings = () => {
  const { settings, updateSettings, resetSettings } = useSiteSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Глобальные настройки сохранены! ✅');
  };

  const handleReset = () => {
    if (confirm('Вы уверены? Все настройки будут сброшены к значениям по умолчанию.')) {
      resetSettings();
      setLocalSettings(settings);
      toast.success('Настройки сброшены!');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-3">
          <Icon name="Globe" size={28} className="text-gaming-yellow" />
          Глобальные настройки сайта
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 bg-black/50 p-2">
            <TabsTrigger value="general">
              <Icon name="Settings" size={16} className="mr-2" />
              Общие
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Icon name="Palette" size={16} className="mr-2" />
              Внешний вид
            </TabsTrigger>
            <TabsTrigger value="features">
              <Icon name="Sliders" size={16} className="mr-2" />
              Функции
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-6">
            <div>
              <Label className="text-white mb-2 block">Название сайта</Label>
              <Input
                value={localSettings.siteName}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="bg-black/50 border-gaming-yellow/30 text-white"
                placeholder="GameCorn Live"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Описание сайта</Label>
              <Textarea
                value={localSettings.siteDescription}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                className="bg-black/50 border-gaming-yellow/30 text-white"
                rows={3}
                placeholder="Платформа для стримов и донатов"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Сообщение режима обслуживания</Label>
              <Textarea
                value={localSettings.maintenanceMessage}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
                className="bg-black/50 border-gaming-yellow/30 text-white"
                rows={2}
                placeholder="Сайт на техническом обслуживании"
              />
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 mt-6">
            <div>
              <Label className="text-white mb-2 block">Основной цвет (желтый)</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={localSettings.primaryColor}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-20 h-10 bg-black/50 border-gaming-yellow/30"
                />
                <Input
                  value={localSettings.primaryColor}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 bg-black/50 border-gaming-yellow/30 text-white"
                  placeholder="#FFD700"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Основной акцентный цвет</p>
            </div>

            <div>
              <Label className="text-white mb-2 block">Вторичный цвет (оранжевый)</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={localSettings.secondaryColor}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-20 h-10 bg-black/50 border-gaming-yellow/30"
                />
                <Input
                  value={localSettings.secondaryColor}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 bg-black/50 border-gaming-yellow/30 text-white"
                  placeholder="#FF6B00"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Дополнительный акцентный цвет</p>
            </div>

            <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4">
              <p className="text-white font-bold mb-2">
                <Icon name="Info" size={16} className="inline mr-2 text-gaming-yellow" />
                Информация
              </p>
              <p className="text-sm text-gray-300">
                Изменение цветов требует обновления CSS переменных. 
                Для полного применения может потребоваться перезагрузка страницы.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 mt-6">
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div>
                <Label className="text-white font-medium">Система комментариев</Label>
                <p className="text-sm text-gray-400">Включить комментарии на всех страницах</p>
              </div>
              <Switch
                checked={localSettings.enableComments}
                onCheckedChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, enableComments: checked }))
                }
                className="data-[state=checked]:bg-gaming-yellow"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div>
                <Label className="text-white font-medium">Система донатов</Label>
                <p className="text-sm text-gray-400">Включить донаты и алерты</p>
              </div>
              <Switch
                checked={localSettings.enableDonations}
                onCheckedChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, enableDonations: checked }))
                }
                className="data-[state=checked]:bg-gaming-yellow"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div>
                <Label className="text-white font-medium">Аукционная рулетка</Label>
                <p className="text-sm text-gray-400">Доступ к странице аукциона</p>
              </div>
              <Switch
                checked={localSettings.enableAuction}
                onCheckedChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, enableAuction: checked }))
                }
                className="data-[state=checked]:bg-gaming-yellow"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div>
                <Label className="text-white font-medium">Статистика канала</Label>
                <p className="text-sm text-gray-400">Показывать статистику на странице "О нас"</p>
              </div>
              <Switch
                checked={localSettings.showStatistics}
                onCheckedChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, showStatistics: checked }))
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
                <p className="text-sm text-gray-400">Закрыть сайт для всех посетителей</p>
              </div>
              <Switch
                checked={localSettings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setLocalSettings(prev => ({ ...prev, maintenanceMode: checked }))
                }
                className="data-[state=checked]:bg-red-500"
              />
            </div>

            {localSettings.maintenanceMode && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 animate-slide-up">
                <p className="text-red-400 font-bold">
                  ⚠️ Режим обслуживания активен!
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Обычные посетители не смогут зайти на сайт. Только владелец имеет доступ.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold"
          >
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить настройки
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Сбросить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalSiteSettings;
