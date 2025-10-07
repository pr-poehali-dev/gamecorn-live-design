import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MaintenanceModeProps {
  message?: string;
}

const MaintenanceMode = ({ message }: MaintenanceModeProps) => {
  return (
    <div className="min-h-screen bg-gaming-dark flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-gaming-red/20 to-gaming-orange/20 border-gaming-yellow/30">
        <CardContent className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Icon name="Construction" size={80} className="text-gaming-yellow animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Icon name="AlertTriangle" size={32} className="text-gaming-orange animate-bounce" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-white">
              Режим обслуживания
            </h1>
            <p className="text-xl text-gray-300">
              {message || 'Сайт на техническом обслуживании. Скоро вернемся!'}
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-6 space-y-3">
            <p className="text-white font-bold flex items-center justify-center gap-2">
              <Icon name="Clock" size={20} className="text-gaming-yellow" />
              Ведутся технические работы
            </p>
            <p className="text-gray-400 text-sm">
              Мы работаем над улучшением сервиса. Пожалуйста, зайдите позже.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-gaming-yellow">
            <Icon name="Loader" size={20} className="animate-spin" />
            <span className="text-sm font-medium">Загрузка...</span>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            Если вы владелец сайта, войдите в систему для доступа к панели управления
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceMode;
