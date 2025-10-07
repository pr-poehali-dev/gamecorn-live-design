import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RestreamingHeader from './restreaming/RestreamingHeader';
import StreamingTab from './restreaming/StreamingTab';
import DestinationsTab from './restreaming/DestinationsTab';
import SettingsTab from './restreaming/SettingsTab';

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
      <RestreamingHeader />

      <Card className="bg-gradient-to-br from-gray-900 to-black border-gaming-yellow/30">
        <CardContent className="pt-6">
          <Tabs defaultValue="streaming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50">
              <TabsTrigger value="streaming">Трансляция</TabsTrigger>
              <TabsTrigger value="destinations">Платформы</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="streaming" className="space-y-6 mt-6">
              <StreamingTab
                sourceUrl={sourceUrl}
                setSourceUrl={setSourceUrl}
                isStreaming={isStreaming}
                showOBSGuide={showOBSGuide}
                setShowOBSGuide={setShowOBSGuide}
                obsSettings={obsSettings}
                destinations={destinations}
                platformConfig={platformConfig}
                onStartStreaming={startRestreaming}
                onStopStreaming={stopRestreaming}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            </TabsContent>

            <TabsContent value="destinations" className="space-y-4 mt-6">
              <DestinationsTab
                destinations={destinations}
                platformConfig={platformConfig}
                isStreaming={isStreaming}
                onAddDestination={addDestination}
                onUpdateDestination={updateDestination}
                onRemoveDestination={removeDestination}
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-6">
              <SettingsTab
                obsSettings={obsSettings}
                setOBSSettings={setOBSSettings}
                isStreaming={isStreaming}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestreamingPanel;
