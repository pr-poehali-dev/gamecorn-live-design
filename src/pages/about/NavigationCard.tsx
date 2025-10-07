import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const NavigationCard = () => {
  return (
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
  );
};

export default NavigationCard;
