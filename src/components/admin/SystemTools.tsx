import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SystemToolsProps {
  onClearCache: () => void;
  onExportData: () => void;
}

const SystemTools = ({ onClearCache, onExportData }: SystemToolsProps) => {
  return (
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
            onClick={onClearCache}
            variant="outline"
            className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
          >
            <Icon name="Trash2" size={16} className="mr-2" />
            Очистить кэш
          </Button>
          <Button
            onClick={onExportData}
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
  );
};

export default SystemTools;
