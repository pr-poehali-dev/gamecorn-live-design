import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface StreamDestination {
  id: string;
  platform: 'youtube' | 'twitch' | 'vk' | 'trovo' | 'kick';
  streamKey: string;
  serverUrl: string;
  enabled: boolean;
  status: 'offline' | 'connecting' | 'live' | 'error';
  bitrate?: number;
  viewers?: number;
}

interface OBSSettings {
  resolution: string;
  fps: number;
  bitrate: number;
  encoder: string;
  preset: string;
}

interface PlatformConfig {
  name: string;
  color: string;
  icon: string;
  rtmpUrl: string;
}

interface StreamingTabProps {
  sourceUrl: string;
  setSourceUrl: (url: string) => void;
  isStreaming: boolean;
  showOBSGuide: boolean;
  setShowOBSGuide: (show: boolean) => void;
  obsSettings: OBSSettings;
  destinations: StreamDestination[];
  platformConfig: Record<string, PlatformConfig>;
  onStartStreaming: () => void;
  onStopStreaming: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

const StreamingTab = ({
  sourceUrl,
  setSourceUrl,
  isStreaming,
  showOBSGuide,
  setShowOBSGuide,
  obsSettings,
  destinations,
  platformConfig,
  onStartStreaming,
  onStopStreaming,
  getStatusColor,
  getStatusText
}: StreamingTabProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white mb-2 flex items-center gap-2">
          <Icon name="Wifi" size={18} className="text-gaming-yellow" />
          Источник трансляции
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="rtmp://localhost:1935/live или URL YouTube стрима"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="bg-black/50 border-gaming-yellow/30 text-white"
            disabled={isStreaming}
          />
          <Button
            variant="outline"
            className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/20"
            onClick={() => setShowOBSGuide(!showOBSGuide)}
          >
            <Icon name="HelpCircle" size={18} />
          </Button>
        </div>
        {showOBSGuide && (
          <div className="mt-2 p-4 bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-gaming-yellow">Настройка OBS:</strong><br/>
              1. Откройте OBS → Настройки → Вещание<br/>
              2. Сервис: "Пользовательский"<br/>
              3. Сервер: rtmp://localhost:1935/live<br/>
              4. Ключ потока: любое имя (например: mystream)<br/>
              5. Полный URL: rtmp://localhost:1935/live/mystream
            </p>
          </div>
        )}
      </div>

      <div className="bg-black/30 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">Статус трансляции</h3>
            <p className="text-gray-400 text-sm">
              {isStreaming ? 'Идёт ретрансляция' : 'Трансляция остановлена'}
            </p>
          </div>
          <div className={`h-4 w-4 rounded-full ${isStreaming ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Битрейт</p>
            <p className="text-white font-bold">{isStreaming ? obsSettings.bitrate : 0} Kbps</p>
          </div>
          <div className="bg-black/50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">FPS</p>
            <p className="text-white font-bold">{isStreaming ? obsSettings.fps : 0}</p>
          </div>
          <div className="bg-black/50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Платформы</p>
            <p className="text-white font-bold">
              {destinations.filter(d => d.status === 'live').length} / {destinations.filter(d => d.enabled).length}
            </p>
          </div>
          <div className="bg-black/50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Зрители</p>
            <p className="text-white font-bold">
              {destinations.reduce((sum, d) => sum + (d.viewers || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {!isStreaming ? (
          <Button
            onClick={onStartStreaming}
            className="flex-1 bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold py-6 text-lg"
          >
            <Icon name="Play" className="mr-2" size={24} />
            НАЧАТЬ ТРАНСЛЯЦИЮ
          </Button>
        ) : (
          <Button
            onClick={onStopStreaming}
            className="flex-1 bg-gaming-red hover:bg-gaming-red/80 text-white font-bold py-6 text-lg"
          >
            <Icon name="Square" className="mr-2" size={24} />
            ОСТАНОВИТЬ
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-white font-bold flex items-center gap-2">
          <Icon name="Activity" size={18} className="text-gaming-yellow" />
          Активные платформы
        </h4>
        {destinations.filter(d => d.enabled).length === 0 ? (
          <p className="text-gray-400 text-sm">Добавьте платформы во вкладке "Платформы"</p>
        ) : (
          destinations.filter(d => d.enabled).map(dest => (
            <div key={dest.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gaming-yellow/20">
              <div className="flex items-center gap-3">
                <Icon 
                  name={platformConfig[dest.platform].icon as any} 
                  size={24} 
                  className={platformConfig[dest.platform].color}
                />
                <div>
                  <p className="text-white font-bold">{platformConfig[dest.platform].name}</p>
                  <p className={`text-xs ${getStatusColor(dest.status)}`}>
                    {getStatusText(dest.status)}
                    {dest.status === 'live' && dest.viewers !== undefined && ` • ${dest.viewers} зрителей`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {dest.status === 'live' && (
                  <Badge variant="outline" className="border-green-500/50 text-green-500">
                    LIVE
                  </Badge>
                )}
                {dest.bitrate && (
                  <span className="text-xs text-gray-400">{dest.bitrate} Kbps</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StreamingTab;
