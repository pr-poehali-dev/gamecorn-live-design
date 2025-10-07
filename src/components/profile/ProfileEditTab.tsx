import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ProfileEditTabProps {
  username: string;
  displayName: string;
  bio: string;
  location: string;
  website: string;
  onUsernameChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onSave: () => void;
}

const ProfileEditTab = ({
  username,
  displayName,
  bio,
  location,
  website,
  onUsernameChange,
  onDisplayNameChange,
  onBioChange,
  onLocationChange,
  onWebsiteChange,
  onSave
}: ProfileEditTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Edit" size={20} className="text-gaming-yellow" />
            Редактирование профиля
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Никнейм</Label>
              <Input
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                placeholder="ProGamer123"
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Уникальное имя для входа</p>
            </div>

            <div>
              <Label className="text-white mb-2 block">Отображаемое имя</Label>
              <Input
                value={displayName}
                onChange={(e) => onDisplayNameChange(e.target.value)}
                placeholder="Крутой Геймер"
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Как вас видят другие</p>
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">О себе</Label>
            <Textarea
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
              placeholder="Расскажите о себе..."
              className="bg-black/50 border-gaming-red/30 text-white"
              rows={4}
            />
            <p className="text-xs text-gray-400 mt-1">{bio.length}/500 символов</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Местоположение</Label>
              <Input
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="Москва, Россия"
                className="bg-black/50 border-gaming-red/30 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Веб-сайт</Label>
              <Input
                value={website}
                onChange={(e) => onWebsiteChange(e.target.value)}
                placeholder="https://yoursite.com"
                className="bg-black/50 border-gaming-red/30 text-white"
              />
            </div>
          </div>

          <Button
            onClick={onSave}
            className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
          >
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-gaming-yellow" />
            Моя статистика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-black text-gaming-yellow">156</p>
              <p className="text-sm text-gray-400">Комментариев</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-black text-gaming-orange">23</p>
              <p className="text-sm text-gray-400">Донатов</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-black text-green-500">₽2.4K</p>
              <p className="text-sm text-gray-400">Отправлено</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-black text-purple-500">47ч</p>
              <p className="text-sm text-gray-400">Просмотрено</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEditTab;
