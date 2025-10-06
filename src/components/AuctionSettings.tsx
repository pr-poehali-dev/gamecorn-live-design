import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

const AuctionSettings = () => {
  const { config, updateConfig } = useSiteConfig();
  
  const [enabled, setEnabled] = useState(config.auctionEnabled);
  const [title, setTitle] = useState(config.auctionTitle);
  const [startPrice, setStartPrice] = useState(config.auctionStartPrice);
  const [minBid, setMinBid] = useState(config.auctionMinBid);

  const handleSave = () => {
    updateConfig({
      auctionEnabled: enabled,
      auctionTitle: title,
      auctionStartPrice: startPrice,
      auctionMinBid: minBid
    });
    toast.success('Настройки аукциона сохранены! 🎯');
  };

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Gavel" size={20} className="text-gaming-yellow" />
          Настройки аукциона
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Power" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Включить аукцион</p>
              <p className="text-sm text-gray-400">Разрешить пользователям участвовать в аукционе</p>
            </div>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Название аукциона</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/50 border-gaming-red/30 text-white"
            placeholder="Аукцион донатов"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block">Стартовая цена (₽)</Label>
            <Input
              type="number"
              value={startPrice}
              onChange={(e) => setStartPrice(Number(e.target.value))}
              className="bg-black/50 border-gaming-red/30 text-white"
              min="0"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Минимальная ставка (₽)</Label>
            <Input
              type="number"
              value={minBid}
              onChange={(e) => setMinBid(Number(e.target.value))}
              className="bg-black/50 border-gaming-red/30 text-white"
              min="0"
            />
          </div>
        </div>

        <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4">
          <p className="text-white font-bold mb-2">Предпросмотр настроек</p>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Статус:</span>
              <span className={enabled ? 'text-green-500' : 'text-red-500'}>
                {enabled ? 'Включен' : 'Выключен'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Название:</span>
              <span className="text-gaming-yellow">{title}</span>
            </div>
            <div className="flex justify-between">
              <span>Стартовая цена:</span>
              <span className="text-gaming-yellow">{startPrice} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Минимальная ставка:</span>
              <span className="text-gaming-yellow">{minBid} ₽</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
        >
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить настройки аукциона
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuctionSettings;
