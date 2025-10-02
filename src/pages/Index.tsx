import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Stream {
  id: number;
  title: string;
  game: string;
  date: string;
  time: string;
  thumbnail: string;
  isLive?: boolean;
  viewers?: number;
  duration?: string;
  views?: number;
}

interface DonationAlert {
  id: number;
  name: string;
  amount: number;
  message: string;
}

const Index = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationName, setDonationName] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Stream | null>(null);
  const [recentDonations, setRecentDonations] = useState<DonationAlert[]>([
    { id: 1, name: 'ProGamer99', amount: 500, message: 'Лучший стример! 🔥' },
    { id: 2, name: 'MegaFan', amount: 1000, message: 'За новое оборудование!' },
    { id: 3, name: 'Анонимус', amount: 250, message: 'Продолжай в том же духе!' }
  ]);

  const upcomingStreams: Stream[] = [
    {
      id: 1,
      title: 'Cyberpunk 2077 - Прохождение',
      game: 'Cyberpunk 2077',
      date: '15 октября',
      time: '19:00',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg'
    },
    {
      id: 2,
      title: 'Valorant - Ранковые игры',
      game: 'Valorant',
      date: '16 октября',
      time: '20:00',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg'
    },
    {
      id: 3,
      title: 'Minecraft - Постройка замка',
      game: 'Minecraft',
      date: '17 октября',
      time: '18:00',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg'
    }
  ];

  const archivedStreams: Stream[] = [
    {
      id: 101,
      title: 'Elden Ring - Полное прохождение',
      game: 'Elden Ring',
      date: '1 октября',
      time: '3 дня назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '4:32:15',
      views: 12400
    },
    {
      id: 102,
      title: 'CS2 - Легендарный камбэк',
      game: 'Counter-Strike 2',
      date: '28 сентября',
      time: '5 дней назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '2:15:30',
      views: 8900
    },
    {
      id: 103,
      title: 'Baldurs Gate 3 - Создание персонажа',
      game: 'Baldurs Gate 3',
      date: '25 сентября',
      time: '1 неделю назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '3:45:22',
      views: 15600
    },
    {
      id: 104,
      title: 'Cyberpunk 2077 - Сайдквесты',
      game: 'Cyberpunk 2077',
      date: '22 сентября',
      time: '2 недели назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '5:12:45',
      views: 21300
    },
    {
      id: 105,
      title: 'Valorant - Турнир с подписчиками',
      game: 'Valorant',
      date: '18 сентября',
      time: '2 недели назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '6:20:10',
      views: 18700
    },
    {
      id: 106,
      title: 'Minecraft - Постройка города',
      game: 'Minecraft',
      date: '15 сентября',
      time: '3 недели назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '4:05:33',
      views: 9800
    }
  ];

  const liveStream: Stream = {
    id: 0,
    title: 'Elden Ring - Битва с боссом',
    game: 'Elden Ring',
    date: 'Сейчас',
    time: 'В эфире',
    thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
    isLive: true,
    viewers: 1247
  };

  const handleDonation = () => {
    if (!donationName || !donationAmount) {
      toast.error('Заполните имя и сумму доната!');
      return;
    }

    const newDonation: DonationAlert = {
      id: Date.now(),
      name: donationName,
      amount: parseInt(donationAmount),
      message: donationMessage || '❤️'
    };

    setRecentDonations([newDonation, ...recentDonations.slice(0, 4)]);
    toast.success(`Спасибо за донат ${donationAmount}₽!`, {
      description: `От ${donationName}`,
      duration: 5000,
    });

    setDonationName('');
    setDonationAmount('');
    setDonationMessage('');
  };

  return (
    <div className="min-h-screen bg-gaming-dark">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/img/679cf77e-a2bb-44bb-b7f0-722f62732409.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10">
        <nav className="bg-black/50 backdrop-blur-md border-b border-gaming-red/30 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/img/b5ff3fd1-73c8-4659-b7fb-c8cb106822c5.jpg" 
                  alt="GameCorn Live"
                  className="w-16 h-16 rounded-full border-4 border-gaming-red shadow-lg shadow-gaming-red/50"
                />
                <div>
                  <h1 className="text-3xl font-black text-gradient-fire glow-red">
                    GAMECORN LIVE
                  </h1>
                  <p className="text-gaming-yellow text-sm font-medium">Игровые стримы каждый день</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold px-6 py-3 animate-pulse-glow">
                      <Icon name="Heart" className="mr-2" size={20} />
                      ДОНАТ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gaming-dark border-gaming-red/50">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-gradient-fire">Поддержать канал</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white font-medium mb-2 block">Ваше имя</label>
                        <Input 
                          value={donationName}
                          onChange={(e) => setDonationName(e.target.value)}
                          placeholder="ProGamer123"
                          className="bg-black/50 border-gaming-red/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Сумма (₽)</label>
                        <Input 
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="100"
                          className="bg-black/50 border-gaming-red/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Сообщение</label>
                        <Input 
                          value={donationMessage}
                          onChange={(e) => setDonationMessage(e.target.value)}
                          placeholder="Твой текст здесь..."
                          className="bg-black/50 border-gaming-red/30 text-white"
                        />
                      </div>
                      <Button 
                        onClick={handleDonation}
                        className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold py-3"
                      >
                        Отправить донат
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </nav>

        <section className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-gaming-red/20 via-gaming-orange/20 to-gaming-yellow/20 rounded-2xl p-8 border-2 border-gaming-red/50 mb-12 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-gaming-red via-gaming-orange to-gaming-yellow rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-glow"></div>
                <img 
                  src={liveStream.thumbnail}
                  alt={liveStream.title}
                  className="relative rounded-xl w-full aspect-video object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-gaming-red text-white font-bold px-4 py-2 text-lg animate-pulse">
                  <Icon name="Radio" className="mr-2 animate-pulse" size={16} />
                  LIVE
                </Badge>
                <Badge className="absolute top-4 right-4 bg-black/70 text-white font-bold px-4 py-2">
                  <Icon name="Eye" className="mr-2" size={16} />
                  {liveStream.viewers?.toLocaleString()}
                </Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge className="bg-gaming-yellow text-black font-bold mb-4">
                    {liveStream.game}
                  </Badge>
                  <h2 className="text-5xl font-black text-white glow-red mb-4">
                    {liveStream.title}
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Смотри захватывающий стрим прямо сейчас! Битва с боссом, донаты и веселье!
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold px-8 py-6 text-xl w-full md:w-auto"
                >
                  <Icon name="Play" className="mr-3" size={24} />
                  Смотреть стрим
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-12 animate-slide-up">
            <h3 className="text-3xl font-black text-gradient-fire glow-yellow mb-6 flex items-center gap-3">
              <Icon name="Flame" size={32} className="text-gaming-orange" />
              Последние донаты
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {recentDonations.map((donation, index) => (
                <Card 
                  key={donation.id}
                  className="bg-gradient-to-br from-gaming-red/20 to-gaming-orange/20 border-gaming-red/50 hover:border-gaming-yellow/70 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-gaming-yellow font-bold text-lg">{donation.name}</span>
                      <Badge className="bg-gaming-yellow text-black font-bold">
                        {donation.amount}₽
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{donation.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl font-black text-gradient-fire glow-yellow mb-6 flex items-center gap-3">
              <Icon name="Calendar" size={32} className="text-gaming-yellow" />
              Расписание стримов
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingStreams.map((stream, index) => (
                <Card 
                  key={stream.id}
                  className="bg-gradient-to-br from-black/80 to-gaming-dark border-gaming-red/30 hover:border-gaming-yellow/50 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Icon name="Play" size={48} className="text-gaming-yellow" />
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <Badge className="bg-gaming-yellow text-black font-bold mb-3">
                      {stream.game}
                    </Badge>
                    <h4 className="text-white font-bold text-lg mb-3 line-clamp-2">
                      {stream.title}
                    </h4>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>{stream.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{stream.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-3xl font-black text-gradient-fire glow-yellow mb-6 flex items-center gap-3">
              <Icon name="Video" size={32} className="text-gaming-red" />
              Архив стримов
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {archivedStreams.map((stream, index) => (
                <Card 
                  key={stream.id}
                  onClick={() => setSelectedVideo(stream)}
                  className="bg-gradient-to-br from-black/80 to-gaming-dark border-gaming-red/30 hover:border-gaming-orange/50 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(index + 6) * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Icon name="Play" size={48} className="text-gaming-orange" />
                    </div>
                    <Badge className="absolute bottom-3 right-3 bg-black/80 text-white font-bold px-2 py-1 text-xs">
                      {stream.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <Badge className="bg-gaming-orange text-white font-bold mb-3 text-xs">
                      {stream.game}
                    </Badge>
                    <h4 className="text-white font-bold text-lg mb-3 line-clamp-2">
                      {stream.title}
                    </h4>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        <span>{stream.views?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        <span>{stream.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="bg-gaming-dark border-gaming-red/50 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gradient-fire flex items-center gap-2">
                <Icon name="Video" size={28} />
                {selectedVideo?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedVideo && (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                  <img 
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold px-12 py-8 text-2xl rounded-full"
                    >
                      <Icon name="Play" className="mr-3" size={32} />
                      Смотреть
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className="bg-gaming-yellow text-black font-bold px-4 py-2">
                    {selectedVideo.game}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Icon name="Clock" size={18} />
                    <span className="font-medium">{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Icon name="Eye" size={18} />
                    <span className="font-medium">{selectedVideo.views?.toLocaleString()} просмотров</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Icon name="Calendar" size={18} />
                    <span>{selectedVideo.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg">
                  Эпичный стрим с лучшими моментами! Не пропусти захватывающий геймплей и крутые комментарии.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <footer className="bg-black/50 border-t border-gaming-red/30 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <img 
                  src="https://v3.fal.media/files/koala/8VZiLv1TcltrLPUyszAnz_output.png" 
                  alt="Steam"
                  className="w-10 h-10 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                />
                <img 
                  src="https://v3.fal.media/files/koala/8VZiLv1TcltrLPUyszAnz_output.png" 
                  alt="PlayStation"
                  className="w-10 h-10 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                />
                <img 
                  src="https://v3.fal.media/files/koala/8VZiLv1TcltrLPUyszAnz_output.png" 
                  alt="Xbox"
                  className="w-10 h-10 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                />
              </div>
              <p className="text-gray-400">© 2024 GameCorn Live. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;