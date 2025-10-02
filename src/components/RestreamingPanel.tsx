import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const RestreamingPanel = () => {
  const [destinations, setDestinations] = useState<StreamDestination[]>([
    {
      id: '1',
      platform: 'youtube',
      streamKey: '',
      serverUrl: 'rtmp://a.rtmp.youtube.com/live2',
      enabled: false,
      status: 'offline'
    }
  ]);

  const [obsSettings, setOBSSettings] = useState<OBSSettings>({
    resolution: '1920x1080',
    fps: 30,
    bitrate: 2500,
    encoder: 'x264',
    preset: 'veryfast'
  });

  const [isStreaming, setIsStreaming] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');
  const [showOBSGuide, setShowOBSGuide] = useState(false);

  const platformConfig = {
    youtube: {
      name: 'YouTube',
      color: 'text-red-500',
      icon: 'Youtube',
      rtmpUrl: 'rtmp://a.rtmp.youtube.com/live2'
    },
    twitch: {
      name: 'Twitch',
      color: 'text-purple-500',
      icon: 'Twitch',
      rtmpUrl: 'rtmp://live.twitch.tv/app'
    },
    vk: {
      name: 'VK Видео',
      color: 'text-blue-500',
      icon: 'Video',
      rtmpUrl: 'rtmp://vk.com/live'
    },
    trovo: {
      name: 'Trovo',
      color: 'text-green-500',
      icon: 'Tv',
      rtmpUrl: 'rtmp://livepush.trovo.live/live'
    },
    kick: {
      name: 'Kick',
      color: 'text-lime-500',
      icon: 'Monitor',
      rtmpUrl: 'rtmp://fa723fc1b171.global-contribute.live-video.net/app'
    }
  };

  const addDestination = (platform: keyof typeof platformConfig) => {
    if (destinations.filter(d => d.enabled).length >= 2) {
      alert('Максимум 2 активных платформы для ретрансляции');
      return;
    }

    const newDest: StreamDestination = {
      id: Date.now().toString(),
      platform,
      streamKey: '',
      serverUrl: platformConfig[platform].rtmpUrl,
      enabled: true,
      status: 'offline'
    };

    setDestinations([...destinations, newDest]);
  };

  const updateDestination = (id: string, updates: Partial<StreamDestination>) => {
    setDestinations(destinations.map(d => 
      d.id === id ? { ...d, ...updates } : d
    ));
  };

  const removeDestination = (id: string) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  const startRestreaming = () => {
    if (!sourceUrl) {
      alert('Укажите источник трансляции');
      return;
    }

    const enabledDests = destinations.filter(d => d.enabled && d.streamKey);
    if (enabledDests.length === 0) {
      alert('Добавьте хотя бы одну платформу с ключом трансляции');
      return;
    }

    setIsStreaming(true);
    enabledDests.forEach(dest => {
      updateDestination(dest.id, { status: 'connecting' });
      setTimeout(() => {
        updateDestination(dest.id, { 
          status: 'live',
          viewers: Math.floor(Math.random() * 50),
          bitrate: obsSettings.bitrate 
        });
      }, 2000);
    });
  };

  const stopRestreaming = () => {
    setIsStreaming(false);
    destinations.forEach(dest => {
      updateDestination(dest.id, { status: 'offline', viewers: 0 });
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'live': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'live': return 'В эфире';
      case 'connecting': return 'Подключение...';
      case 'error': return 'Ошибка';
      default: return 'Не активен';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-900 to-black border-gaming-yellow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Icon name="Radio" size={28} className="text-gaming-yellow" />
            <span className="bg-gradient-to-r from-gaming-yellow to-gaming-orange bg-clip-text text-transparent">
              Мультистрим
            </span>
            <Badge variant="outline" className="border-gaming-yellow/50 text-gaming-yellow ml-auto">
              Облачная технология
            </Badge>
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Ретранслируйте свой стрим одновременно на несколько платформ без нагрузки на ваш ПК
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="streaming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50">
              <TabsTrigger value="streaming">Трансляция</TabsTrigger>
              <TabsTrigger value="destinations">Платформы</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="streaming" className="space-y-6 mt-6">
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
                      onClick={startRestreaming}
                      className="flex-1 bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold py-6 text-lg"
                    >
                      <Icon name="Play" className="mr-2" size={24} />
                      НАЧАТЬ ТРАНСЛЯЦИЮ
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRestreaming}
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
            </TabsContent>

            <TabsContent value="destinations" className="space-y-4 mt-6">
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
                    onClick={() => addDestination(key as keyof typeof platformConfig)}
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
                                updateDestination(dest.id, { enabled: checked });
                              }}
                              disabled={isStreaming}
                              className="data-[state=checked]:bg-gaming-yellow"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDestination(dest.id)}
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
                            onChange={(e) => updateDestination(dest.id, { serverUrl: e.target.value })}
                            className="bg-black/50 border-gaming-yellow/20 text-white text-sm"
                            disabled={isStreaming}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300 text-xs">Ключ трансляции</Label>
                          <Input
                            type="password"
                            value={dest.streamKey}
                            onChange={(e) => updateDestination(dest.id, { streamKey: e.target.value })}
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
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-6">
              <Card className="bg-black/30 border-gaming-yellow/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Icon name="Settings" size={20} className="text-gaming-yellow" />
                    Настройки кодирования
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    Оптимизированы для минимальной нагрузки на систему
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Разрешение</Label>
                    <Select
                      value={obsSettings.resolution}
                      onValueChange={(value) => setOBSSettings({...obsSettings, resolution: value})}
                      disabled={isStreaming}
                    >
                      <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                        <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                        <SelectItem value="854x480">854x480 (SD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">FPS (кадры в секунду)</Label>
                    <Select
                      value={obsSettings.fps.toString()}
                      onValueChange={(value) => setOBSSettings({...obsSettings, fps: parseInt(value)})}
                      disabled={isStreaming}
                    >
                      <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60 FPS</SelectItem>
                        <SelectItem value="30">30 FPS (рекомендуется)</SelectItem>
                        <SelectItem value="24">24 FPS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Битрейт (Kbps)</Label>
                    <Select
                      value={obsSettings.bitrate.toString()}
                      onValueChange={(value) => setOBSSettings({...obsSettings, bitrate: parseInt(value)})}
                      disabled={isStreaming}
                    >
                      <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6000">6000 (Высокое качество)</SelectItem>
                        <SelectItem value="4500">4500 (Оптимальное)</SelectItem>
                        <SelectItem value="2500">2500 (Среднее, рекомендуется)</SelectItem>
                        <SelectItem value="1500">1500 (Низкое)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Кодировщик</Label>
                    <Select
                      value={obsSettings.encoder}
                      onValueChange={(value) => setOBSSettings({...obsSettings, encoder: value})}
                      disabled={isStreaming}
                    >
                      <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="x264">x264 (CPU, универсальный)</SelectItem>
                        <SelectItem value="nvenc">NVENC (NVIDIA GPU)</SelectItem>
                        <SelectItem value="qsv">QuickSync (Intel GPU)</SelectItem>
                        <SelectItem value="amf">AMF (AMD GPU)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Пресет кодирования</Label>
                    <Select
                      value={obsSettings.preset}
                      onValueChange={(value) => setOBSSettings({...obsSettings, preset: value})}
                      disabled={isStreaming}
                    >
                      <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ultrafast">Ultrafast (минимальная нагрузка)</SelectItem>
                        <SelectItem value="veryfast">Veryfast (рекомендуется)</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                        <SelectItem value="medium">Medium (лучшее качество)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4 mt-4">
                    <p className="text-white font-bold mb-2">
                      <Icon name="Zap" size={18} className="inline mr-2 text-gaming-yellow" />
                      Рекомендуемые настройки
                    </p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Разрешение: 1280x720 для стабильности</li>
                      <li>• FPS: 30 для экономии ресурсов</li>
                      <li>• Битрейт: 2500 Kbps</li>
                      <li>• Пресет: veryfast</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-gaming-yellow/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Icon name="BookOpen" size={20} className="text-gaming-yellow" />
                    Инструкция по настройке OBS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-bold mb-2">1. Настройка вывода в OBS</h4>
                    <p>Настройки → Вещание → Выберите "Пользовательский"</p>
                    <p className="mt-1 text-gaming-yellow">Сервер: rtmp://localhost:1935/live</p>
                    <p className="text-gaming-yellow">Ключ: любое имя (например: mystream)</p>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-2">2. Настройка кодирования</h4>
                    <p>Настройки → Вывод → Режим вывода: "Расширенный"</p>
                    <p className="mt-1">Используйте настройки из этой панели</p>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-2">3. Запуск трансляции</h4>
                    <p>1. Запустите трансляцию в OBS</p>
                    <p>2. Укажите источник: rtmp://localhost:1935/live/mystream</p>
                    <p>3. Нажмите "Начать трансляцию" в этой панели</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-400 font-bold">
                      ✓ Вся нагрузка идёт на наши облачные серверы, ваш ПК работает легко!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestreamingPanel;
