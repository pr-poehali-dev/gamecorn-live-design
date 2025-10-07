import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface ModerationSettingsProps {
  moderationMode: boolean;
  setModerationMode: (value: boolean) => void;
  autoModeration: boolean;
  setAutoModeration: (value: boolean) => void;
}

const ModerationSettings = ({
  moderationMode,
  setModerationMode,
  autoModeration,
  setAutoModeration
}: ModerationSettingsProps) => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="ShieldAlert" size={20} className="text-gaming-yellow" />
          Настройки модерации
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="ShieldCheck" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Премодерация</p>
              <p className="text-sm text-gray-400">Проверять комментарии перед публикацией</p>
            </div>
          </div>
          <Switch
            checked={moderationMode}
            onCheckedChange={setModerationMode}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Bot" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Автомодерация</p>
              <p className="text-sm text-gray-400">Автоматически фильтровать спам и оскорбления</p>
            </div>
          </div>
          <Switch
            checked={autoModeration}
            onCheckedChange={setAutoModeration}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-white font-bold mb-2">Статистика модерации</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-gaming-yellow">0</p>
              <p className="text-xs text-gray-400">На проверке</p>
            </div>
            <div>
              <p className="text-2xl font-black text-green-500">156</p>
              <p className="text-xs text-gray-400">Одобрено</p>
            </div>
            <div>
              <p className="text-2xl font-black text-red-500">12</p>
              <p className="text-xs text-gray-400">Заблокировано</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModerationSettings;
