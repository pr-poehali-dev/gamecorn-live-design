import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

const SiteSettingsPanel = () => {
  const { config, updateConfig } = useSiteConfig();
  
  const [siteName, setSiteName] = useState(config.siteName);
  const [bannerImage, setBannerImage] = useState(config.bannerImage);
  const [backgroundImage, setBackgroundImage] = useState(config.backgroundImage);
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(config.secondaryColor);
  const [accentColor, setAccentColor] = useState(config.accentColor);

  const handleSaveAppearance = () => {
    updateConfig({
      siteName,
      bannerImage,
      backgroundImage,
      primaryColor,
      secondaryColor,
      accentColor
    });
    toast.success('Настройки внешнего вида сохранены! 🎨');
  };

  const presetThemes = [
    { name: 'Gaming Red', primary: '#1a0b2e', secondary: '#7c3aed', accent: '#ef4444' },
    { name: 'Gaming Purple', primary: '#0f0a1e', secondary: '#8b5cf6', accent: '#a855f7' },
    { name: 'Gaming Blue', primary: '#0a1628', secondary: '#3b82f6', accent: '#06b6d4' },
    { name: 'Gaming Green', primary: '#0a1612', secondary: '#10b981', accent: '#22c55e' },
    { name: 'Gaming Gold', primary: '#1c1410', secondary: '#f59e0b', accent: '#fbbf24' },
  ];

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
    toast.success(`Тема "${preset.name}" применена!`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gaming-red to-gaming-orange border-gaming-yellow">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Icon name="Palette" size={28} className="text-gaming-yellow" />
            Настройки внешнего вида сайта
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid grid-cols-3 gap-2 bg-black/50 p-2">
          <TabsTrigger value="branding" className="data-[state=active]:bg-gaming-red">
            <Icon name="Image" size={16} className="mr-2" />
            Брендинг
          </TabsTrigger>
          <TabsTrigger value="colors" className="data-[state=active]:bg-gaming-red">
            <Icon name="Palette" size={16} className="mr-2" />
            Цвета
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-gaming-red">
            <Icon name="Image" size={16} className="mr-2" />
            Медиа
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Type" size={20} className="text-gaming-yellow" />
                Название и логотип
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Название сайта</Label>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white text-xl font-bold"
                  placeholder="STREAM.TV"
                />
              </div>

              <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4">
                <p className="text-white font-bold mb-2">Предпросмотр названия</p>
                <div className="text-4xl font-black bg-gradient-to-r from-gaming-red via-gaming-orange to-gaming-yellow bg-clip-text text-transparent">
                  {siteName || 'STREAM.TV'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Palette" size={20} className="text-gaming-yellow" />
                Цветовая схема
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Основной цвет</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-20 h-12 cursor-pointer"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="bg-black/50 border-gaming-red/30 text-white flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Вторичный цвет</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-20 h-12 cursor-pointer"
                    />
                    <Input
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="bg-black/50 border-gaming-red/30 text-white flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Акцентный цвет</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-20 h-12 cursor-pointer"
                    />
                    <Input
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="bg-black/50 border-gaming-red/30 text-white flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">Готовые темы</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {presetThemes.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="p-3 rounded-lg border-2 border-white/20 hover:border-gaming-yellow transition-all"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-full h-8 rounded" style={{ backgroundColor: preset.primary }} />
                        <div className="w-full h-8 rounded" style={{ backgroundColor: preset.secondary }} />
                        <div className="w-full h-8 rounded" style={{ backgroundColor: preset.accent }} />
                      </div>
                      <p className="text-white text-xs font-bold">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4">
                <p className="text-white font-bold mb-3">Предпросмотр цветов</p>
                <div className="flex gap-3">
                  <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: primaryColor }}>
                    <p className="text-white font-bold">Основной</p>
                  </div>
                  <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: secondaryColor }}>
                    <p className="text-white font-bold">Вторичный</p>
                  </div>
                  <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: accentColor }}>
                    <p className="text-white font-bold">Акцент</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveAppearance}
                className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить цвета
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Image" size={20} className="text-gaming-yellow" />
                Баннеры и фоны
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">URL баннера</Label>
                <Input
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                  placeholder="https://example.com/banner.jpg"
                />
                {bannerImage && (
                  <div className="mt-2 rounded-lg overflow-hidden">
                    <img src={bannerImage} alt="Banner preview" className="w-full h-32 object-cover" />
                  </div>
                )}
              </div>

              <div>
                <Label className="text-white mb-2 block">URL фона</Label>
                <Input
                  value={backgroundImage}
                  onChange={(e) => setBackgroundImage(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                  placeholder="https://example.com/background.jpg"
                />
                {backgroundImage && (
                  <div className="mt-2 rounded-lg overflow-hidden">
                    <img src={backgroundImage} alt="Background preview" className="w-full h-32 object-cover" />
                  </div>
                )}
              </div>

              <Button
                onClick={handleSaveAppearance}
                className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить медиа
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsPanel;
