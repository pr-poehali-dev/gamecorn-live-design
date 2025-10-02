import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface TwoFactorAuthProps {
  isEnabled: boolean;
  onEnable: (secret: string) => void;
  onDisable: () => void;
  onVerify: (code: string) => boolean;
}

const TwoFactorAuth = ({ isEnabled, onEnable, onDisable, onVerify }: TwoFactorAuthProps) => {
  const [showSetup, setShowSetup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [setupCode, setSetupCode] = useState('');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const generateSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars[Math.floor(Math.random() * chars.length)];
    }
    return secret;
  };

  const generateBackupCodes = () => {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    return codes;
  };

  const handleSetup = () => {
    const newSecret = generateSecret();
    const newBackupCodes = generateBackupCodes();
    setSecret(newSecret);
    setBackupCodes(newBackupCodes);
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/GameCorn:user@gamecorn.live?secret=${newSecret}&issuer=GameCorn`;
    setQrCode(qrCodeUrl);
    
    setShowSetup(true);
  };

  const handleEnableTwoFactor = () => {
    if (setupCode.length !== 6) {
      toast.error('Введите 6-значный код из приложения');
      return;
    }

    onEnable(secret);
    setShowSetup(false);
    toast.success('Двухфакторная аутентификация включена! 🔐', {
      description: 'Сохраните резервные коды в безопасном месте'
    });
  };

  const handleDisableTwoFactor = () => {
    setShowVerify(true);
  };

  const handleVerifyAndDisable = () => {
    if (verificationCode.length !== 6) {
      toast.error('Введите 6-значный код');
      return;
    }

    const isValid = onVerify(verificationCode);
    if (isValid) {
      onDisable();
      setShowVerify(false);
      setVerificationCode('');
      toast.success('Двухфакторная аутентификация отключена');
    } else {
      toast.error('Неверный код! Попробуйте снова');
    }
  };

  const copyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    toast.success('Резервные коды скопированы!');
  };

  const downloadBackupCodes = () => {
    const codesText = `РЕЗЕРВНЫЕ КОДЫ GAMECORN LIVE\nДата создания: ${new Date().toLocaleDateString()}\n\n${backupCodes.join('\n')}\n\nСохраните эти коды в безопасном месте!\nКаждый код можно использовать только один раз.`;
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gamecorn-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Резервные коды сохранены!');
  };

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon name="Shield" size={24} className="text-gaming-yellow" />
          Двухфакторная аутентификация (2FA)
        </CardTitle>
        <CardDescription className="text-gray-400">
          Дополнительный уровень защиты вашего аккаунта
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gaming-red/10 border border-gaming-red/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon 
              name={isEnabled ? 'CheckCircle' : 'AlertCircle'} 
              size={20} 
              className={isEnabled ? 'text-green-500' : 'text-gaming-yellow'} 
            />
            <div>
              <p className="font-bold text-white mb-1">
                Статус: {isEnabled ? 'Включена ✅' : 'Отключена ❌'}
              </p>
              <p className="text-sm text-gray-300">
                {isEnabled 
                  ? 'Ваш аккаунт защищен дополнительным кодом при входе' 
                  : 'Включите 2FA для максимальной защиты аккаунта'}
              </p>
            </div>
          </div>
        </div>

        {!isEnabled ? (
          <div className="space-y-3">
            <div className="bg-black/30 rounded-lg p-4 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Icon name="Info" size={16} className="text-gaming-yellow" />
                Что такое 2FA?
              </h4>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Дополнительная защита при входе</li>
                <li>Код генерируется в приложении на телефоне</li>
                <li>Даже если украдут пароль - не смогут войти</li>
                <li>Рекомендуется всем пользователям</li>
              </ul>
            </div>

            <Button
              onClick={handleSetup}
              className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
            >
              <Icon name="Shield" size={18} className="mr-2" />
              Включить 2FA
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-bold text-white mb-1">Аккаунт защищен</p>
                  <p className="text-sm text-gray-300">
                    При входе потребуется код из приложения-аутентификатора
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDisableTwoFactor}
              variant="outline"
              className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <Icon name="ShieldOff" size={18} className="mr-2" />
              Отключить 2FA
            </Button>
          </div>
        )}

        <div className="border-t border-gaming-red/30 pt-4">
          <div className="bg-black/30 rounded-lg p-4 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <Icon name="Smartphone" size={16} className="text-gaming-yellow" />
              Рекомендуемые приложения
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={12} className="text-green-500" />
                <span>Google Authenticator</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={12} className="text-green-500" />
                <span>Microsoft Authenticator</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={12} className="text-green-500" />
                <span>Authy</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={12} className="text-green-500" />
                <span>1Password</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Dialog open={showSetup} onOpenChange={setShowSetup}>
        <DialogContent className="bg-gray-900 border-gaming-red/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Shield" size={24} className="text-gaming-yellow" />
              Настройка 2FA
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gaming-red/10 border border-gaming-red/30 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-3">
                <strong className="text-white">Шаг 1:</strong> Отсканируйте QR-код в приложении-аутентификаторе
              </p>
              <div className="bg-white p-4 rounded-lg inline-block">
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Или введите код вручную: <span className="text-gaming-yellow font-mono">{secret}</span>
              </p>
            </div>

            <div className="bg-gaming-red/10 border border-gaming-red/30 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-3">
                <strong className="text-white">Шаг 2:</strong> Сохраните резервные коды
              </p>
              <div className="bg-black/50 rounded p-3 font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
                {backupCodes.map((code, i) => (
                  <div key={i} className="text-gaming-yellow">
                    {i + 1}. {code}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={copyBackupCodes}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gaming-yellow/50 text-gaming-yellow hover:bg-gaming-yellow/10"
                >
                  <Icon name="Copy" size={14} className="mr-1" />
                  Копировать
                </Button>
                <Button
                  onClick={downloadBackupCodes}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gaming-yellow/50 text-gaming-yellow hover:bg-gaming-yellow/10"
                >
                  <Icon name="Download" size={14} className="mr-1" />
                  Скачать
                </Button>
              </div>
            </div>

            <div>
              <label className="text-white font-medium mb-2 block">
                <strong>Шаг 3:</strong> Введите код из приложения для проверки
              </label>
              <Input
                value={setupCode}
                onChange={(e) => setSetupCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="bg-black/50 border-gaming-red/30 text-white text-center text-2xl font-mono tracking-widest"
              />
            </div>

            <Button
              onClick={handleEnableTwoFactor}
              disabled={setupCode.length !== 6}
              className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
            >
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Подтвердить и включить 2FA
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showVerify} onOpenChange={setShowVerify}>
        <DialogContent className="bg-gray-900 border-gaming-red/30 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="ShieldOff" size={24} className="text-red-400" />
              Отключить 2FA
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                Введите код из приложения-аутентификатора для подтверждения отключения 2FA
              </p>
            </div>

            <div>
              <label className="text-white font-medium mb-2 block">Код подтверждения</label>
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="bg-black/50 border-gaming-red/30 text-white text-center text-2xl font-mono tracking-widest"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowVerify(false)}
                variant="outline"
                className="flex-1 border-gaming-red/30 text-white"
              >
                Отмена
              </Button>
              <Button
                onClick={handleVerifyAndDisable}
                disabled={verificationCode.length !== 6}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Отключить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TwoFactorAuth;
