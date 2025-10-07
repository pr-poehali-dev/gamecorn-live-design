import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TwoFactorAuth from '../TwoFactorAuth';

interface SecuritySettingsProps {
  userEmail: string;
  twoFactorEnabled: boolean;
  onEnable2FA: (secret: string) => void;
  onDisable2FA: () => void;
  onVerify2FA: (code: string) => boolean;
}

const SecuritySettings = ({
  userEmail,
  twoFactorEnabled,
  onEnable2FA,
  onDisable2FA,
  onVerify2FA
}: SecuritySettingsProps) => {
  return (
    <>
      <TwoFactorAuth
        isEnabled={twoFactorEnabled}
        onEnable={onEnable2FA}
        onDisable={onDisable2FA}
        onVerify={onVerify2FA}
      />

      <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Key" size={20} className="text-gaming-yellow" />
            Дополнительная безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gaming-red/10 border border-gaming-red/30 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <Icon name="Info" size={20} className="text-gaming-yellow mt-0.5" />
              <div>
                <p className="font-bold text-white mb-1">Ваш аккаунт администратора</p>
                <p className="text-sm text-gray-300">Email: {userEmail}</p>
                <p className="text-sm text-gray-300">Роль: Владелец (Owner)</p>
                <p className="text-sm text-gray-300">Права: Полный доступ ко всем функциям</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
            >
              <Icon name="Key" size={16} className="mr-2" />
              Сменить пароль
            </Button>
            <Button
              variant="outline"
              className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
            >
              <Icon name="History" size={16} className="mr-2" />
              История входов
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SecuritySettings;
