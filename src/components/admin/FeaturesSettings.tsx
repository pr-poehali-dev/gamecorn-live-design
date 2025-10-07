import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface FeaturesSettingsProps {
  commentsEnabled: boolean;
  setCommentsEnabled: (value: boolean) => void;
  donationsEnabled: boolean;
  setDonationsEnabled: (value: boolean) => void;
  registrationEnabled: boolean;
  setRegistrationEnabled: (value: boolean) => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (value: boolean) => void;
}

const FeaturesSettings = ({
  commentsEnabled,
  setCommentsEnabled,
  donationsEnabled,
  setDonationsEnabled,
  registrationEnabled,
  setRegistrationEnabled,
  maintenanceMode,
  setMaintenanceMode
}: FeaturesSettingsProps) => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Zap" size={20} className="text-gaming-yellow" />
          Управление функциями
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="MessageSquare" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Комментарии</p>
              <p className="text-sm text-gray-400">Разрешить пользователям оставлять комментарии</p>
            </div>
          </div>
          <Switch
            checked={commentsEnabled}
            onCheckedChange={setCommentsEnabled}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="DollarSign" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Донаты</p>
              <p className="text-sm text-gray-400">Разрешить отправку донатов</p>
            </div>
          </div>
          <Switch
            checked={donationsEnabled}
            onCheckedChange={setDonationsEnabled}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="UserPlus" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Регистрация</p>
              <p className="text-sm text-gray-400">Разрешить новым пользователям регистрироваться</p>
            </div>
          </div>
          <Switch
            checked={registrationEnabled}
            onCheckedChange={setRegistrationEnabled}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="AlertTriangle" size={20} className="text-red-400" />
            <div>
              <p className="font-bold text-white">Режим обслуживания</p>
              <p className="text-sm text-gray-400">Закрыть доступ к сайту (только для админов)</p>
            </div>
          </div>
          <Switch
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
            className="data-[state=checked]:bg-red-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesSettings;
