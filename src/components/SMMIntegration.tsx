import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
}

const SMMIntegration = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: 'bg-red-600', connected: false },
    { id: 'vk', name: 'ВКонтакте', icon: 'Share2', color: 'bg-blue-600', connected: false },
    { id: 'telegram', name: 'Telegram', icon: 'Send', color: 'bg-sky-500', connected: false },
    { id: 'twitter', name: 'Twitter/X', icon: 'Twitter', color: 'bg-black', connected: false },
    { id: 'discord', name: 'Discord', icon: 'MessageSquare', color: 'bg-indigo-600', connected: false },
    { id: 'twitch', name: 'Twitch', icon: 'Twitch', color: 'bg-purple-600', connected: false },
  ]);

  const [autoPost, setAutoPost] = useState({
    newStream: true,
    streamEnd: true,
    highlights: true,
    clips: false,
  });

  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [channelId, setChannelId] = useState('');

  const togglePlatform = (platformId: string) => {
    setPlatforms(prev =>
      prev.map(p =>
        p.id === platformId ? { ...p, connected: !p.connected } : p
      )
    );
    const platform = platforms.find(p => p.id === platformId);
    if (platform) {
      toast.success(`${platform.name} ${platform.connected ? 'отключен' : 'подключен'}!`, {
        description: platform.connected ? 'Автопостинг остановлен' : 'Автопостинг активирован'
      });
    }
  };

  const connectYouTube = () => {
    if (!youtubeApiKey || !channelId) {
      toast.error('Заполните API ключ и ID канала!');
      return;
    }
    togglePlatform('youtube');
    toast.success('YouTube API подключен! 📺', {
      description: 'Синхронизация видео активна'
    });
  };

  const testPost = () => {
    const connectedPlatforms = platforms.filter(p => p.connected);
    if (connectedPlatforms.length === 0) {
      toast.error('Подключите хотя бы одну платформу!');
      return;
    }
    toast.success('Тестовый пост отправлен! 🚀', {
      description: `На ${connectedPlatforms.length} платформ(ы)`
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
        <CardHeader>
          <CardTitle className="text-gradient-fire flex items-center gap-2">
            <Icon name="Share2" size={24} />
            SMM Интеграции
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {platforms.map(platform => (
              <div
                key={platform.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  platform.connected
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-black/30 border-gaming-red/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${platform.color} p-2 rounded-lg`}>
                    <Icon name={platform.icon} size={20} className="text-white" />
                  </div>
                  <span className="text-white font-bold">{platform.name}</span>
                </div>
                <Switch
                  checked={platform.connected}
                  onCheckedChange={() => togglePlatform(platform.id)}
                />
              </div>
            ))}
          </div>

          {platforms.find(p => p.id === 'youtube')?.connected && (
            <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-red-600/30">
              <h4 className="text-white font-bold flex items-center gap-2">
                <Icon name="Youtube" size={18} className="text-red-600" />
                YouTube API настройки
              </h4>
              <div className="space-y-2">
                <Label className="text-white">API ключ</Label>
                <Input
                  value={youtubeApiKey}
                  onChange={(e) => setYoutubeApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="bg-black/50 border-gaming-red/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">ID канала</Label>
                <Input
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  placeholder="UC..."
                  className="bg-black/50 border-gaming-red/30 text-white"
                />
              </div>
              <Button
                onClick={connectYouTube}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Icon name="Link" className="mr-2" size={16} />
                Подключить YouTube API
              </Button>
            </div>
          )}

          <div className="border-t border-gaming-red/30 pt-4">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Icon name="Zap" size={20} className="text-gaming-yellow" />
              Автоматический постинг
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Новый стрим</Label>
                <Switch
                  checked={autoPost.newStream}
                  onCheckedChange={(checked) =>
                    setAutoPost(prev => ({ ...prev, newStream: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white">Окончание стрима</Label>
                <Switch
                  checked={autoPost.streamEnd}
                  onCheckedChange={(checked) =>
                    setAutoPost(prev => ({ ...prev, streamEnd: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white">Лучшие моменты</Label>
                <Switch
                  checked={autoPost.highlights}
                  onCheckedChange={(checked) =>
                    setAutoPost(prev => ({ ...prev, highlights: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-white">Клипы</Label>
                <Switch
                  checked={autoPost.clips}
                  onCheckedChange={(checked) =>
                    setAutoPost(prev => ({ ...prev, clips: checked }))
                  }
                />
              </div>
            </div>
          </div>

          <Button
            onClick={testPost}
            className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
          >
            <Icon name="Send" className="mr-2" size={18} />
            Отправить тестовый пост
          </Button>

          <div className="bg-black/30 rounded-lg p-4">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <Icon name="Info" size={16} className="text-gaming-yellow" />
              Статистика за последние 7 дней:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-300">
                <span className="text-gaming-yellow">142</span> автопоста
              </div>
              <div className="text-gray-300">
                <span className="text-gaming-yellow">8,234</span> охват
              </div>
              <div className="text-gray-300">
                <span className="text-gaming-yellow">1,543</span> переходов
              </div>
              <div className="text-gray-300">
                <span className="text-gaming-yellow">18.7%</span> вовлеченность
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMMIntegration;
