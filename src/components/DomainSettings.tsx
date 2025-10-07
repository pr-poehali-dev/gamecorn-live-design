import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

const DomainSettings = () => {
  const [domain, setDomain] = useState('yoursite.com');
  const [siteName, setSiteName] = useState('GameCorn Live');
  const [siteDescription, setSiteDescription] = useState('Стриминговая платформа');
  const [siteKeywords, setSiteKeywords] = useState('стримы, игры, донаты, live');
  const [ogImage, setOgImage] = useState('/img/og-image.jpg');
  const [favicon, setFavicon] = useState('/favicon.ico');
  const [googleAnalytics, setGoogleAnalytics] = useState('');
  const [yandexMetrika, setYandexMetrika] = useState('');
  const [vkPixel, setVkPixel] = useState('');
  const [sslEnabled, setSslEnabled] = useState(true);
  const [redirectWww, setRedirectWww] = useState(true);

  const saveDomainSettings = () => {
    const settings = {
      domain,
      siteName,
      siteDescription,
      siteKeywords,
      ogImage,
      favicon,
      googleAnalytics,
      yandexMetrika,
      vkPixel,
      sslEnabled,
      redirectWww
    };
    localStorage.setItem('domain_settings', JSON.stringify(settings));
    alert('Настройки домена сохранены!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Настройки домена и SEO</h2>
        <Button onClick={saveDomainSettings} className="bg-gaming-red hover:bg-gaming-red/90">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить
        </Button>
      </div>

      <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="Globe" size={20} className="text-gaming-red" />
            Домен
          </h3>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Основной домен</Label>
              <Input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="yoursite.com"
              />
              <p className="text-sm text-gray-400 mt-1">
                Укажите ваш домен без http:// или https://
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div>
                <Label className="text-white">SSL сертификат (HTTPS)</Label>
                <p className="text-sm text-gray-400">Защищённое соединение</p>
              </div>
              <Switch checked={sslEnabled} onCheckedChange={setSslEnabled} />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div>
                <Label className="text-white">Редирект с www на основной домен</Label>
                <p className="text-sm text-gray-400">www.site.com → site.com</p>
              </div>
              <Switch checked={redirectWww} onCheckedChange={setRedirectWww} />
            </div>
          </div>
        </div>

        <div className="border-t border-gaming-red/20 pt-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="Search" size={20} className="text-gaming-red" />
            SEO настройки
          </h3>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Название сайта</Label>
              <Input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Описание сайта</Label>
              <Textarea
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-white">Ключевые слова</Label>
              <Input
                value={siteKeywords}
                onChange={(e) => setSiteKeywords(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="слово1, слово2, слово3"
              />
            </div>

            <div>
              <Label className="text-white">OG изображение (для соцсетей)</Label>
              <Input
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="/img/og-image.jpg"
              />
              <p className="text-sm text-gray-400 mt-1">
                Рекомендуемый размер: 1200x630 пикселей
              </p>
            </div>

            <div>
              <Label className="text-white">Favicon</Label>
              <Input
                value={favicon}
                onChange={(e) => setFavicon(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="/favicon.ico"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gaming-red/20 pt-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-gaming-red" />
            Аналитика и пиксели
          </h3>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Google Analytics ID</Label>
              <Input
                value={googleAnalytics}
                onChange={(e) => setGoogleAnalytics(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <div>
              <Label className="text-white">Яндекс Метрика ID</Label>
              <Input
                value={yandexMetrika}
                onChange={(e) => setYandexMetrika(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="12345678"
              />
            </div>

            <div>
              <Label className="text-white">VK Pixel ID</Label>
              <Input
                value={vkPixel}
                onChange={(e) => setVkPixel(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                placeholder="VK-RTRG-XXXXX"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DomainSettings;
