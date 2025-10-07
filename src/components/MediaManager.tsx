import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'video';
  name: string;
  url: string;
  size?: string;
  usedIn: string[];
}

const MediaManager = () => {
  const [images, setImages] = useState<MediaFile[]>([
    { id: '1', type: 'image', name: 'Баннер главной', url: '/img/hero-banner.jpg', usedIn: ['Главная страница'] },
    { id: '2', type: 'image', name: 'Аватар', url: '/img/avatar.jpg', usedIn: ['Профиль'] },
    { id: '3', type: 'image', name: 'Фон сайта', url: '/img/background.jpg', usedIn: ['Весь сайт'] },
  ]);

  const [sounds, setSounds] = useState<MediaFile[]>([
    { id: '1', type: 'audio', name: 'Звук доната', url: '/sounds/donation.mp3', usedIn: ['Донаты'] },
    { id: '2', type: 'audio', name: 'Звук подписки', url: '/sounds/subscribe.mp3', usedIn: ['Подписки'] },
    { id: '3', type: 'audio', name: 'Звук рулетки', url: '/sounds/roulette.mp3', usedIn: ['Рулетка'] },
  ]);

  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadName, setUploadName] = useState('');

  const addMedia = (type: 'image' | 'audio') => {
    if (!uploadUrl || !uploadName) {
      alert('Заполните все поля');
      return;
    }

    const newMedia: MediaFile = {
      id: `${type}-${Date.now()}`,
      type,
      name: uploadName,
      url: uploadUrl,
      usedIn: []
    };

    if (type === 'image') {
      setImages([...images, newMedia]);
    } else {
      setSounds([...sounds, newMedia]);
    }

    setUploadUrl('');
    setUploadName('');
    alert('Файл добавлен!');
  };

  const deleteMedia = (type: 'image' | 'audio', id: string) => {
    if (type === 'image') {
      setImages(images.filter(img => img.id !== id));
    } else {
      setSounds(sounds.filter(snd => snd.id !== id));
    }
  };

  const saveMedia = () => {
    localStorage.setItem('site_images', JSON.stringify(images));
    localStorage.setItem('site_sounds', JSON.stringify(sounds));
    alert('Медиафайлы сохранены!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Медиаменеджер</h2>
        <Button onClick={saveMedia} className="bg-gaming-red hover:bg-gaming-red/90">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить
        </Button>
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid grid-cols-2 bg-black/50">
          <TabsTrigger value="images" className="data-[state=active]:bg-gaming-red">
            <Icon name="Image" size={16} className="mr-2" />
            Изображения
          </TabsTrigger>
          <TabsTrigger value="sounds" className="data-[state=active]:bg-gaming-red">
            <Icon name="Volume2" size={16} className="mr-2" />
            Звуки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="space-y-4">
          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Загрузить изображение</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Название"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <Input
                placeholder="URL или путь"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <Button onClick={() => addMedia('image')} className="bg-gaming-red">
                <Icon name="Upload" size={16} className="mr-2" />
                Добавить
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="bg-gaming-dark/90 border-gaming-red/30 overflow-hidden">
                <div className="aspect-video bg-black/50 flex items-center justify-center">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '';
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-white">{image.name}</h4>
                  <p className="text-sm text-gray-400 truncate">{image.url}</p>
                  {image.usedIn.length > 0 && (
                    <p className="text-xs text-gaming-red">
                      Используется: {image.usedIn.join(', ')}
                    </p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Изменить
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteMedia('image', image.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sounds" className="space-y-4">
          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Загрузить звук</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Название"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <Input
                placeholder="URL или путь"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
              />
              <Button onClick={() => addMedia('audio')} className="bg-gaming-red">
                <Icon name="Upload" size={16} className="mr-2" />
                Добавить
              </Button>
            </div>
          </Card>

          <div className="space-y-3">
            {sounds.map((sound) => (
              <Card key={sound.id} className="bg-gaming-dark/90 border-gaming-red/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-gaming-red/20 p-3 rounded-lg">
                      <Icon name="Volume2" size={24} className="text-gaming-red" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{sound.name}</h4>
                      <p className="text-sm text-gray-400 truncate">{sound.url}</p>
                      {sound.usedIn.length > 0 && (
                        <p className="text-xs text-gaming-red mt-1">
                          Используется: {sound.usedIn.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Play" size={14} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteMedia('audio', sound.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaManager;
