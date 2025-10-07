import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface PageSettings {
  enableComments: boolean;
  enableDonations: boolean;
  enableAuction: boolean;
  showStatistics: boolean;
  maintenanceMode: boolean;
}

interface PageSettingsCardProps {
  pageSettings: PageSettings;
  onUpdate: (key: keyof PageSettings, value: boolean) => void;
}

const PageSettingsCard = ({ pageSettings, onUpdate }: PageSettingsCardProps) => {
  return (
    <Card className="bg-gaming-yellow/10 border-gaming-yellow/30 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Sliders" size={24} className="text-gaming-yellow" />
          Настройки функций сайта
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
          <div>
            <Label className="text-white font-medium">Комментарии</Label>
            <p className="text-gray-400 text-sm">
              Разрешить пользователям оставлять комментарии
            </p>
          </div>
          <Switch
            checked={pageSettings.enableComments}
            onCheckedChange={(checked) => onUpdate('enableComments', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
          <div>
            <Label className="text-white font-medium">Донаты</Label>
            <p className="text-gray-400 text-sm">Система донатов и алертов</p>
          </div>
          <Switch
            checked={pageSettings.enableDonations}
            onCheckedChange={(checked) => onUpdate('enableDonations', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
          <div>
            <Label className="text-white font-medium">Аукционная рулетка</Label>
            <p className="text-gray-400 text-sm">
              Доступ к странице аукциона
            </p>
          </div>
          <Switch
            checked={pageSettings.enableAuction}
            onCheckedChange={(checked) => onUpdate('enableAuction', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
          <div>
            <Label className="text-white font-medium">Статистика</Label>
            <p className="text-gray-400 text-sm">Показывать статистику канала</p>
          </div>
          <Switch
            checked={pageSettings.showStatistics}
            onCheckedChange={(checked) => onUpdate('showStatistics', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-500/50">
          <div>
            <Label className="text-white font-medium flex items-center gap-2">
              <Icon name="AlertTriangle" size={16} className="text-red-500" />
              Режим обслуживания
            </Label>
            <p className="text-gray-400 text-sm">
              Закрыть доступ к сайту для всех, кроме владельца
            </p>
          </div>
          <Switch
            checked={pageSettings.maintenanceMode}
            onCheckedChange={(checked) => onUpdate('maintenanceMode', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PageSettingsCard;
