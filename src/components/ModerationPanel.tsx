import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface ModerationAction {
  id: number;
  username: string;
  action: string;
  reason: string;
  timestamp: string;
}

interface BannedWord {
  id: number;
  word: string;
  severity: 'low' | 'medium' | 'high';
}

interface ModerationPanelProps {
  userRole: UserRole;
}

const ModerationPanel = ({ userRole }: ModerationPanelProps) => {
  const canModerate = userRole === 'owner' || userRole === 'moderator';

  const [slowMode, setSlowMode] = useState(false);
  const [slowModeSeconds, setSlowModeSeconds] = useState(5);
  const [subscribersOnly, setSubscribersOnly] = useState(false);
  const [linkFilter, setLinkFilter] = useState(true);
  const [capsFilter, setCapsFilter] = useState(true);
  const [spamFilter, setSpamFilter] = useState(true);

  const [newBannedWord, setNewBannedWord] = useState('');
  const [bannedWords, setBannedWords] = useState<BannedWord[]>([
    { id: 1, word: 'спам', severity: 'medium' },
    { id: 2, word: 'реклама', severity: 'low' },
  ]);

  const [recentActions, setRecentActions] = useState<ModerationAction[]>([
    { id: 1, username: 'Spammer123', action: 'Бан', reason: 'Спам ссылками', timestamp: '5 мин назад' },
    { id: 2, username: 'ToxicUser', action: 'Тайм-аут', reason: 'Нарушение правил', timestamp: '15 мин назад' },
  ]);

  const [banUsername, setBanUsername] = useState('');
  const [banReason, setBanReason] = useState('');
  const [timeoutDuration, setTimeoutDuration] = useState('10');

  const addBannedWord = () => {
    if (!newBannedWord.trim()) {
      toast.error('Введите слово для бана!');
      return;
    }
    setBannedWords(prev => [
      ...prev,
      { id: Date.now(), word: newBannedWord, severity: 'medium' }
    ]);
    toast.success(`Слово "${newBannedWord}" добавлено в фильтр!`);
    setNewBannedWord('');
  };

  const removeBannedWord = (id: number) => {
    setBannedWords(prev => prev.filter(w => w.id !== id));
    toast.success('Слово удалено из фильтра!');
  };

  const handleBanUser = () => {
    if (!banUsername.trim()) {
      toast.error('Введите имя пользователя!');
      return;
    }
    const newAction: ModerationAction = {
      id: Date.now(),
      username: banUsername,
      action: 'Бан',
      reason: banReason || 'Нарушение правил',
      timestamp: 'Только что'
    };
    setRecentActions(prev => [newAction, ...prev]);
    toast.success(`Пользователь ${banUsername} забанен! 🔨`);
    setBanUsername('');
    setBanReason('');
  };

  const handleTimeoutUser = () => {
    if (!banUsername.trim()) {
      toast.error('Введите имя пользователя!');
      return;
    }
    const newAction: ModerationAction = {
      id: Date.now(),
      username: banUsername,
      action: `Тайм-аут ${timeoutDuration}м`,
      reason: banReason || 'Нарушение правил',
      timestamp: 'Только что'
    };
    setRecentActions(prev => [newAction, ...prev]);
    toast.success(`Тайм-аут ${timeoutDuration} минут для ${banUsername}! ⏱️`);
    setBanUsername('');
    setBanReason('');
  };

  if (!canModerate) {
    return (
      <Card className="bg-gaming-red/10 border-gaming-red/30">
        <CardContent className="py-8 text-center">
          <Icon name="ShieldAlert" size={48} className="text-gaming-red mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Доступ запрещен</h3>
          <p className="text-gray-300">
            Панель модерации доступна только владельцам и модераторам канала
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
        <CardHeader>
          <CardTitle className="text-gradient-fire flex items-center gap-2">
            <Icon name="Shield" size={24} />
            Панель модерации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <Icon name="Settings" size={18} className="text-gaming-yellow" />
                Настройки чата
              </h4>
              
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div>
                  <Label className="text-white font-medium">Медленный режим</Label>
                  <p className="text-gray-400 text-xs">
                    Интервал {slowModeSeconds} сек между сообщениями
                  </p>
                </div>
                <Switch checked={slowMode} onCheckedChange={setSlowMode} />
              </div>

              {slowMode && (
                <div className="space-y-2">
                  <Label className="text-white">Интервал (секунды)</Label>
                  <Input
                    type="number"
                    value={slowModeSeconds}
                    onChange={(e) => setSlowModeSeconds(Number(e.target.value))}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <Label className="text-white font-medium">Только подписчики</Label>
                <Switch checked={subscribersOnly} onCheckedChange={setSubscribersOnly} />
              </div>

              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <Label className="text-white font-medium">Фильтр ссылок</Label>
                <Switch checked={linkFilter} onCheckedChange={setLinkFilter} />
              </div>

              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <Label className="text-white font-medium">Фильтр CAPS</Label>
                <Switch checked={capsFilter} onCheckedChange={setCapsFilter} />
              </div>

              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <Label className="text-white font-medium">Анти-спам</Label>
                <Switch checked={spamFilter} onCheckedChange={setSpamFilter} />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <Icon name="Ban" size={18} className="text-gaming-red" />
                Действия модератора
              </h4>

              <div className="space-y-2">
                <Label className="text-white">Имя пользователя</Label>
                <Input
                  value={banUsername}
                  onChange={(e) => setBanUsername(e.target.value)}
                  placeholder="Username"
                  className="bg-black/50 border-gaming-red/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Причина</Label>
                <Textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Нарушение правил..."
                  className="bg-black/50 border-gaming-red/30 text-white"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleTimeoutUser}
                  className="bg-gaming-orange hover:bg-gaming-orange/80 text-white font-bold"
                >
                  <Icon name="Clock" className="mr-2" size={16} />
                  Тайм-аут
                </Button>
                <Button
                  onClick={handleBanUser}
                  className="bg-gaming-red hover:bg-gaming-red/80 text-white font-bold"
                >
                  <Icon name="Ban" className="mr-2" size={16} />
                  Забанить
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Длительность тайм-аута (минуты)</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '5', '10', '60'].map(duration => (
                    <Button
                      key={duration}
                      onClick={() => setTimeoutDuration(duration)}
                      variant={timeoutDuration === duration ? 'default' : 'outline'}
                      className={`text-xs ${
                        timeoutDuration === duration
                          ? 'bg-gaming-yellow text-black'
                          : 'border-gaming-red/30 text-white'
                      }`}
                    >
                      {duration}м
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gaming-red/30 pt-4 space-y-4">
            <h4 className="text-white font-bold flex items-center gap-2">
              <Icon name="Filter" size={18} className="text-gaming-yellow" />
              Фильтр слов
            </h4>

            <div className="flex gap-2">
              <Input
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                placeholder="Добавить запрещенное слово..."
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <Button
                onClick={addBannedWord}
                className="bg-gaming-red hover:bg-gaming-red/80 text-white"
              >
                <Icon name="Plus" size={18} />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {bannedWords.map(word => (
                <Badge
                  key={word.id}
                  className={`${
                    word.severity === 'high'
                      ? 'bg-red-600'
                      : word.severity === 'medium'
                      ? 'bg-orange-600'
                      : 'bg-yellow-600'
                  } text-white px-3 py-1 cursor-pointer hover:opacity-80`}
                  onClick={() => removeBannedWord(word.id)}
                >
                  {word.word}
                  <Icon name="X" size={12} className="ml-2" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t border-gaming-red/30 pt-4">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Icon name="History" size={18} className="text-gaming-yellow" />
              Последние действия
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {recentActions.map(action => (
                <div
                  key={action.id}
                  className="bg-black/30 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gaming-red text-white">
                        {action.action}
                      </Badge>
                      <span className="text-white font-bold">{action.username}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{action.reason}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{action.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModerationPanel;
