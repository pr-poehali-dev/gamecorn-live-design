import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TwoFactorAuth from '../TwoFactorAuth';

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  onEnable2FA: (secret: string) => void;
  onDisable2FA: () => void;
  onVerify2FA: (code: string) => boolean;
}

const SecurityTab = ({
  twoFactorEnabled,
  onEnable2FA,
  onDisable2FA,
  onVerify2FA
}: SecurityTabProps) => {
  return (
    <div className="space-y-4">
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
            Управление аккаунтом
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
          >
            <Icon name="Key" size={16} className="mr-2" />
            Сменить пароль
          </Button>
          <Button
            variant="outline"
            className="w-full border-gaming-yellow/50 text-white hover:bg-gaming-yellow/10"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт моих данных
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Icon name="Trash2" size={16} className="mr-2" />
            Удалить аккаунт
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
