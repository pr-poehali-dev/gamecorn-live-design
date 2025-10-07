import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

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

interface PlatformConfig {
  name: string;
  color: string;
  icon: string;
  rtmpUrl: string;
}

interface DestinationsTabProps {
  destinations: StreamDestination[];
  platformConfig: Record<string, PlatformConfig>;
  isStreaming: boolean;
  onAddDestination: (platform: string) => void;
  onUpdateDestination: (id: string, updates: Partial<StreamDestination>) => void;
  onRemoveDestination: (id: string) => void;
}

const DestinationsTab = ({
  destinations,
  platformConfig,
  isStreaming,
  onAddDestination,
  onUpdateDestination,
  onRemoveDestination
}: DestinationsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4">
        <p className="text-white text-sm">
          <Icon name="Info" size={16} className="inline mr-2 text-gaming-yellow" />
          Можно активировать максимум 2 платформы одновременно для оптимальной производительности
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(platformConfig).map(([key, config]) => (
          <Button
            key={key}
            onClick={() => onAddDestination(key)}
            variant="outline"
            className="border-gaming-yellow/30 hover:bg-gaming-yellow/20 h-20 flex flex-col gap-2"
            disabled={isStreaming || destinations.filter(d => d.enabled).length >= 2}
          >
            <Icon name={config.icon as any} size={28} className={config.color} />
            <span className="text-white font-bold text-sm">{config.name}</span>
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="text-white font-bold">Настроенные платформы</h4>
        {destinations.length === 0 ? (
          <p className="text-gray-400 text-sm">Добавьте платформы для ретрансляции</p>
        ) : (
          destinations.map(dest => (
            <Card key={dest.id} className="bg-black/50 border-gaming-yellow/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon 
                      name={platformConfig[dest.platform].icon as any} 
                      size={24} 
                      className={platformConfig[dest.platform].color}
                    />
                    <span className="text-white font-bold">
                      {platformConfig[dest.platform].name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={dest.enabled}
                      onCheckedChange={(checked) => {
                        const enabledCount = destinations.filter(d => d.enabled && d.id !== dest.id).length;
                        if (checked && enabledCount >= 2) {
                          alert('Максимум 2 активных платформы');
                          return;
                        }
                        onUpdateDestination(dest.id, { enabled: checked });
                      }}
                      disabled={isStreaming}
                      className="data-[state=checked]:bg-gaming-yellow"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveDestination(dest.id)}
                      disabled={isStreaming}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/20"
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 text-xs">RTMP Сервер</Label>
                  <Input
                    value={dest.serverUrl}
                    onChange={(e) => onUpdateDestination(dest.id, { serverUrl: e.target.value })}
                    className="bg-black/50 border-gaming-yellow/20 text-white text-sm"
                    disabled={isStreaming}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 text-xs">Ключ трансляции</Label>
                  <Input
                    type="password"
                    value={dest.streamKey}
                    onChange={(e) => onUpdateDestination(dest.id, { streamKey: e.target.value })}
                    placeholder="Введите ключ трансляции с платформы"
                    className="bg-black/50 border-gaming-yellow/20 text-white text-sm"
                    disabled={isStreaming}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DestinationsTab;
