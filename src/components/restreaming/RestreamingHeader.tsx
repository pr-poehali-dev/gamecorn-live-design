import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const RestreamingHeader = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border-gaming-yellow/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Icon name="Radio" size={28} className="text-gaming-yellow" />
          <span className="bg-gradient-to-r from-gaming-yellow to-gaming-orange bg-clip-text text-transparent">
            Мультистрим
          </span>
          <Badge variant="outline" className="border-gaming-yellow/50 text-gaming-yellow ml-auto">
            Облачная технология
          </Badge>
        </CardTitle>
        <p className="text-gray-400 text-sm mt-2">
          Ретранслируйте свой стрим одновременно на несколько платформ без нагрузки на ваш ПК
        </p>
      </CardHeader>
    </Card>
  );
};

export default RestreamingHeader;
