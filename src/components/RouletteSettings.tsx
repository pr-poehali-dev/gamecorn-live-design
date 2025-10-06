import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

const RouletteSettings = () => {
  const { config, updateConfig } = useSiteConfig();
  
  const [enabled, setEnabled] = useState(config.rouletteEnabled);
  const [prizes, setPrizes] = useState<string[]>(config.roulettePrizes);
  const [winChance, setWinChance] = useState(config.rouletteWinChance);
  const [newPrize, setNewPrize] = useState('');

  const handleAddPrize = () => {
    if (newPrize.trim()) {
      setPrizes([...prizes, newPrize.trim()]);
      setNewPrize('');
      toast.success('Приз добавлен!');
    }
  };

  const handleRemovePrize = (index: number) => {
    setPrizes(prizes.filter((_, i) => i !== index));
    toast.success('Приз удален!');
  };

  const handleSave = () => {
    updateConfig({
      rouletteEnabled: enabled,
      roulettePrizes: prizes,
      rouletteWinChance: winChance
    });
    toast.success('Настройки рулетки сохранены! 🎰');
  };

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Disc" size={20} className="text-gaming-yellow" />
          Настройки рулетки
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Power" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Включить рулетку</p>
              <p className="text-sm text-gray-400">Разрешить пользователям крутить рулетку</p>
            </div>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Шанс выигрыша (%)</Label>
          <Input
            type="number"
            value={winChance}
            onChange={(e) => setWinChance(Number(e.target.value))}
            className="bg-black/50 border-gaming-red/30 text-white"
            min="0"
            max="100"
          />
          <p className="text-xs text-gray-400 mt-1">
            Процент вероятности выигрыша (0-100)
          </p>
        </div>

        <div>
          <Label className="text-white mb-2 block">Призы в рулетке</Label>
          <div className="flex gap-2 mb-3">
            <Input
              value={newPrize}
              onChange={(e) => setNewPrize(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPrize()}
              className="bg-black/50 border-gaming-red/30 text-white flex-1"
              placeholder="Название приза"
            />
            <Button
              onClick={handleAddPrize}
              variant="outline"
              className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
            >
              <Icon name="Plus" size={18} />
            </Button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Icon name="Gift" size={16} className="text-gaming-yellow" />
                  <span className="text-white">{prize}</span>
                </div>
                <Button
                  onClick={() => handleRemovePrize(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>

          {prizes.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Icon name="Gift" size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Нет призов. Добавьте первый приз выше.</p>
            </div>
          )}
        </div>

        <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4">
          <p className="text-white font-bold mb-2">Предпросмотр настроек</p>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Статус:</span>
              <span className={enabled ? 'text-green-500' : 'text-red-500'}>
                {enabled ? 'Включена' : 'Выключена'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Шанс выигрыша:</span>
              <span className="text-gaming-yellow">{winChance}%</span>
            </div>
            <div className="flex justify-between">
              <span>Количество призов:</span>
              <span className="text-gaming-yellow">{prizes.length}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
        >
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить настройки рулетки
        </Button>
      </CardContent>
    </Card>
  );
};

export default RouletteSettings;
