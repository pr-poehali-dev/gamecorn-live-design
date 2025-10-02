import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface YouTubeSettingsProps {
  currentVideoId: string;
  onVideoIdChange: (videoId: string) => void;
}

const YouTubeSettings = ({ currentVideoId, onVideoIdChange }: YouTubeSettingsProps) => {
  const [videoId, setVideoId] = useState(currentVideoId);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUpdateVideo = () => {
    const extractedId = extractVideoId(youtubeUrl || videoId);
    if (extractedId) {
      setVideoId(extractedId);
      onVideoIdChange(extractedId);
      toast.success('Видео обновлено! 📺', {
        description: `ID: ${extractedId}`
      });
      setYoutubeUrl('');
    } else {
      toast.error('Неверная ссылка или ID YouTube!');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-gradient-fire flex items-center gap-2">
          <Icon name="Settings" size={24} />
          Настройки трансляции YouTube
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white font-medium">Ссылка на видео YouTube</Label>
          <Input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="bg-black/50 border-gaming-red/30 text-white"
          />
          <p className="text-gray-400 text-sm">Вставьте полную ссылку на видео или прямой эфир</p>
        </div>

        <div className="space-y-2">
          <Label className="text-white font-medium">или ID видео</Label>
          <Input
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="jfKfPfyJRdk"
            className="bg-black/50 border-gaming-red/30 text-white"
          />
          <p className="text-gray-400 text-sm">11-символьный код из ссылки YouTube</p>
        </div>

        <Button
          onClick={handleUpdateVideo}
          className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
        >
          <Icon name="RefreshCw" className="mr-2" size={18} />
          Обновить трансляцию
        </Button>

        <div className="border-t border-gaming-red/30 pt-4 space-y-2">
          <h4 className="text-white font-bold flex items-center gap-2">
            <Icon name="Info" size={18} className="text-gaming-yellow" />
            Настройки качества
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Badge className="bg-gaming-red/20 text-white border border-gaming-red/50 justify-center py-2">
              HD 1080p
            </Badge>
            <Badge className="bg-gaming-red/20 text-white border border-gaming-red/50 justify-center py-2">
              Автовоспроизведение
            </Badge>
            <Badge className="bg-gaming-red/20 text-white border border-gaming-red/50 justify-center py-2">
              Полноэкранный режим
            </Badge>
            <Badge className="bg-gaming-red/20 text-white border border-gaming-red/50 justify-center py-2">
              Без рекламы
            </Badge>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Плеер настроен на максимальное качество HD 1080p с оптимальным битрейтом для стриминга
          </p>
        </div>

        <div className="bg-black/30 rounded-lg p-4 space-y-2">
          <h4 className="text-white font-bold text-sm flex items-center gap-2">
            <Icon name="Zap" size={16} className="text-gaming-yellow" />
            Текущие настройки:
          </h4>
          <ul className="text-gray-300 text-xs space-y-1">
            <li>• Качество: HD 1080p (приоритет)</li>
            <li>• Битрейт: Максимальный доступный</li>
            <li>• Кодек: H.264/VP9</li>
            <li>• Аудио: AAC 128kbps+</li>
            <li>• Задержка: Минимальная</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeSettings;
