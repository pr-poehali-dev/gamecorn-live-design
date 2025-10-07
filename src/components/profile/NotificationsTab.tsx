import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NotificationsTabProps {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  pushNotifications: boolean;
  setPushNotifications: (value: boolean) => void;
  streamNotifications: boolean;
  setStreamNotifications: (value: boolean) => void;
  donationNotifications: boolean;
  setDonationNotifications: (value: boolean) => void;
  commentNotifications: boolean;
  setCommentNotifications: (value: boolean) => void;
  onSave: () => void;
}

const NotificationsTab = ({
  emailNotifications,
  setEmailNotifications,
  pushNotifications,
  setPushNotifications,
  streamNotifications,
  setStreamNotifications,
  donationNotifications,
  setDonationNotifications,
  commentNotifications,
  setCommentNotifications,
  onSave
}: NotificationsTabProps) => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Bell" size={20} className="text-gaming-yellow" />
          Управление уведомлениями
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Email уведомления</p>
              <p className="text-sm text-gray-400">Получать письма о событиях</p>
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Smartphone" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Push-уведомления</p>
              <p className="text-sm text-gray-400">Всплывающие уведомления в браузере</p>
            </div>
          </div>
          <Switch
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Tv" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Начало стримов</p>
              <p className="text-sm text-gray-400">Когда стример выходит в эфир</p>
            </div>
          </div>
          <Switch
            checked={streamNotifications}
            onCheckedChange={setStreamNotifications}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="DollarSign" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Донаты</p>
              <p className="text-sm text-gray-400">Когда ваш донат был озвучен</p>
            </div>
          </div>
          <Switch
            checked={donationNotifications}
            onCheckedChange={setDonationNotifications}
            className="data-[state=checked]:bg-gaming-yellow"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="MessageSquare" size={20} className="text-gaming-yellow" />
            <div>
              <p className="font-bold text-white">Ответы на комментарии</p>
              <p className="text-sm text-gray-400">Когда кто-то ответил на ваш комментарий</p>
            </div>
          </div>
          <Switch
            checked={commentNotifications}
            onCheckedChange={setCommentNotifications}
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

export default NotificationsTab;
