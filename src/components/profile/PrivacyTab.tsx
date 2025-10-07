import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PrivacyTabProps {
  profileVisibility: 'public' | 'private';
  setProfileVisibility: (value: 'public' | 'private') => void;
  showEmail: boolean;
  setShowEmail: (value: boolean) => void;
  showActivity: boolean;
  setShowActivity: (value: boolean) => void;
  onSave: () => void;
}

const PrivacyTab = ({
  profileVisibility,
  setProfileVisibility,
  showEmail,
  setShowEmail,
  showActivity,
  setShowActivity,
  onSave
}: PrivacyTabProps) => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Eye" size={20} className="text-gaming-yellow" />
          Настройки приватности
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-black/30 rounded-lg p-4">
          <Label className="text-white mb-3 block font-bold">Видимость профиля</Label>
          <div className="flex gap-4">
            <button
              onClick={() => setProfileVisibility('public')}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                profileVisibility === 'public'
                  ? 'border-gaming-yellow bg-gaming-yellow/10'
                  : 'border-gaming-red/30 hover:border-gaming-red/50'
              }`}
            >
              <Icon name="Globe" size={20} className="text-gaming-yellow mx-auto mb-2" />
              <p className="text-white font-bold">Публичный</p>
              <p className="text-xs text-gray-400 mt-1">Все могут видеть профиль</p>
            </button>
            <button
              onClick={() => setProfileVisibility('private')}
              className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                profileVisibility === 'private'
                  ? 'border-gaming-yellow bg-gaming-yellow/10'
                  : 'border-gaming-red/30 hover:border-gaming-red/50'
              }`}
            >
              <Icon name="Lock" size={20} className="text-gaming-yellow mx-auto mb-2" />
              <p className="text-white font-bold">Приватный</p>
              <p className="text-xs text-gray-400 mt-1">Только вы видите профиль</p>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Показывать email</p>
              <p className="text-sm text-gray-400">Другие пользователи увидят ваш email</p>
            </div>
          </div>
          <Switch
            checked={showEmail}
            onCheckedChange={setShowEmail}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Activity" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Показывать активность</p>
              <p className="text-sm text-gray-400">Статусы "в сети", "был недавно"</p>
            </div>
          </div>
          <Switch
            checked={showActivity}
            onCheckedChange={setShowActivity}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <Button
          onClick={onSave}
          className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
        >
          Сохранить настройки
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
