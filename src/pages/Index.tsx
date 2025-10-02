import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [newComment, setNewComment] = useState('');
  const [likedStreams, setLikedStreams] = useState<Set<number>>(new Set());
  const [streamNotifications, setStreamNotifications] = useState(true);
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

  const [archivedStreams, setArchivedStreams] = useState<Stream[]>([
    {
      id: 101,
      title: 'Elden Ring - Полное прохождение',
      game: 'Elden Ring',
      date: '1 октября',
      time: '3 дня назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '4:32:15',
      views: 12400,
      likes: 342,
      comments: [
        { id: 1, username: 'MegaGamer', text: 'Лучший стрим! 🔥', timestamp: '2 часа назад' },
        { id: 2, username: 'ProPlayer99', text: 'Когда следующий?', timestamp: '1 час назад' }
      ]
    },
    {
      id: 102,
      title: 'CS2 - Легендарный камбэк',
      game: 'Counter-Strike 2',
      date: '28 сентября',
      time: '5 дней назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '2:15:30',
      views: 8900,
      likes: 267,
      comments: []
    },
    {
      id: 103,
      title: 'Baldurs Gate 3 - Создание персонажа',
      game: 'Baldurs Gate 3',
      date: '25 сентября',
      time: '1 неделю назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '3:45:22',
      views: 15600,
      likes: 489,
      comments: []
    },
    {
      id: 104,
      title: 'Cyberpunk 2077 - Сайдквесты',
      game: 'Cyberpunk 2077',
      date: '22 сентября',
      time: '2 недели назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '5:12:45',
      views: 21300,
      likes: 623,
      comments: []
    },
    {
      id: 105,
      title: 'Valorant - Турнир с подписчиками',
      game: 'Valorant',
      date: '18 сентября',
      time: '2 недели назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '6:20:10',
      views: 18700,
      likes: 534,
      comments: []
    },
    {
      id: 106,
      title: 'Minecraft - Постройка города',
      game: 'Minecraft',
      date: '15 сентября',
      time: '3 недели назад',
      thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
      duration: '4:05:33',
      views: 9800,
      likes: 298,
      comments: []
    }
  ]);

  const [liveStream, setLiveStream] = useState<Stream>({
    id: 0,
    title: 'Elden Ring - Битва с боссом',
    game: 'Elden Ring',
    date: 'Сейчас',
    time: 'В эфире',
    thumbnail: '/img/c38201ca-b2da-4f4d-b768-4ad45d0b39d0.jpg',
    isLive: true,
    viewers: 1247,
    likes: 856,
    comments: [
      { id: 1, username: 'StreamFan', text: 'Невероятный геймплей!', timestamp: '5 мин назад' },
      { id: 2, username: 'GamerPro', text: 'Побей босса!', timestamp: '2 мин назад' }
    ]
  });

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

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      toast.error('Заполните все поля!');
      return;
    }
    setIsLoggedIn(true);
    setUsername(loginEmail.split('@')[0]);
    toast.success('Вы успешно вошли!');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleRegister = () => {
    if (!registerEmail || !registerPassword || !registerUsername) {
      toast.error('Заполните все поля!');
      return;
    }
    setIsLoggedIn(true);
    setUsername(registerUsername);
    toast.success('Регистрация успешна! Добро пожаловать!');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterUsername('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    toast.success('Вы вышли из аккаунта');
  };

  const handleLike = (streamId: number) => {
    if (!isLoggedIn) {
      toast.error('Войдите, чтобы поставить лайк!');
      return;
    }

    const newLiked = new Set(likedStreams);
    const isLiked = likedStreams.has(streamId);

    if (isLiked) {
      newLiked.delete(streamId);
      toast.success('Лайк убран');
    } else {
      newLiked.add(streamId);
      toast.success('Лайк поставлен! ❤️');
    }

    setLikedStreams(newLiked);

    if (streamId === 0) {
      setLiveStream(prev => ({
        ...prev,
        likes: prev.likes + (isLiked ? -1 : 1)
      }));
    } else {
      setArchivedStreams(prev => prev.map(stream => 
        stream.id === streamId 
          ? { ...stream, likes: stream.likes + (isLiked ? -1 : 1) }
          : stream
      ));
    }
  };

  const handleAddComment = (streamId: number) => {
    if (!isLoggedIn) {
      toast.error('Войдите, чтобы комментировать!');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Напишите комментарий!');
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      username: username,
      text: newComment,
      timestamp: 'Только что'
    };

    if (streamId === 0) {
      setLiveStream(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
    } else {
      setArchivedStreams(prev => prev.map(stream => 
        stream.id === streamId 
          ? { ...stream, comments: [...stream.comments, comment] }
          : stream
      ));
    }

    toast.success('Комментарий добавлен!');
    setNewComment('');
  };

  const toggleNotifications = () => {
    if (!isLoggedIn) {
      toast.error('Войдите, чтобы включить уведомления!');
      return;
    }
    setStreamNotifications(!streamNotifications);
    toast.success(streamNotifications ? 'Уведомления отключены' : 'Уведомления включены! 🔔');
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
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={toggleNotifications}
                      variant="outline"
                      className={`border-gaming-yellow/50 ${streamNotifications ? 'bg-gaming-yellow/20 text-gaming-yellow' : 'text-white'} hover:bg-gaming-yellow/30`}
                    >
                      <Icon name={streamNotifications ? 'Bell' : 'BellOff'} size={20} />
                    </Button>
                    <div className="flex items-center gap-2 bg-gaming-red/20 border border-gaming-red/50 rounded-lg px-4 py-2">
                      <Icon name="User" size={20} className="text-gaming-yellow" />
                      <span className="text-white font-bold">{username}</span>
                    </div>
                    <Button 
                      onClick={handleLogout}
                      variant="outline" 
                      className="border-gaming-red/50 text-white hover:bg-gaming-red/20"
                    >
                      <Icon name="LogOut" className="mr-2" size={18} />
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold px-6 py-3">
                        <Icon name="User" className="mr-2" size={20} />
                        ВОЙТИ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gaming-dark border-gaming-red/50">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-gradient-fire">
                          {authMode === 'login' ? 'Вход' : 'Регистрация'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {authMode === 'register' && (
                          <div>
                            <label className="text-white font-medium mb-2 block">Никнейм</label>
                            <Input 
                              value={registerUsername}
                              onChange={(e) => setRegisterUsername(e.target.value)}
                              placeholder="ProGamer123"
                              className="bg-black/50 border-gaming-red/30 text-white"
                            />
                          </div>
                        )}
                        <div>
                          <label className="text-white font-medium mb-2 block">Email</label>
                          <Input 
                            type="email"
                            value={authMode === 'login' ? loginEmail : registerEmail}
                            onChange={(e) => authMode === 'login' ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                            placeholder="gamer@example.com"
                            className="bg-black/50 border-gaming-red/30 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-white font-medium mb-2 block">Пароль</label>
                          <Input 
                            type="password"
                            value={authMode === 'login' ? loginPassword : registerPassword}
                            onChange={(e) => authMode === 'login' ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-black/50 border-gaming-red/30 text-white"
                          />
                        </div>
                        <Button 
                          onClick={authMode === 'login' ? handleLogin : handleRegister}
                          className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold py-3"
                        >
                          {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                        <div className="text-center">
                          <button
                            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                            className="text-gaming-yellow hover:text-gaming-orange transition-colors font-medium"
                          >
                            {authMode === 'login' ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

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

                <div className="flex gap-3">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold px-8 py-6 text-xl flex-1"
                  >
                    <Icon name="Play" className="mr-3" size={24} />
                    Смотреть
                  </Button>
                  <Button
                    onClick={() => handleLike(0)}
                    size="lg"
                    className={`${likedStreams.has(0) ? 'bg-gaming-red text-white' : 'bg-black/50 text-white'} hover:bg-gaming-red/80 font-bold px-6 py-6 text-xl`}
                  >
                    <Icon name="Heart" className={likedStreams.has(0) ? 'fill-current' : ''} size={24} />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={20} className="text-gaming-red" />
                    <span className="font-bold">{liveStream.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} className="text-gaming-yellow" />
                    <span className="font-bold">{liveStream.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gaming-red/30 pt-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="MessageCircle" size={24} className="text-gaming-yellow" />
                Комментарии ({liveStream.comments.length})
              </h4>
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {liveStream.comments.map(comment => (
                  <div key={comment.id} className="bg-black/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="User" size={16} className="text-gaming-yellow" />
                      <span className="text-gaming-yellow font-bold">{comment.username}</span>
                      <span className="text-gray-500 text-sm">• {comment.timestamp}</span>
                    </div>
                    <p className="text-white">{comment.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Напишите комментарий..."
                  className="bg-black/50 border-gaming-red/30 text-white flex-1"
                  rows={2}
                />
                <Button
                  onClick={() => handleAddComment(0)}
                  className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
                >
                  <Icon name="Send" size={20} />
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
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          <span>{stream.views?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Heart" size={14} className="text-gaming-red" />
                          <span>{stream.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MessageCircle" size={14} className="text-gaming-yellow" />
                        <span>{stream.comments.length}</span>
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
                <div className="flex items-center justify-between flex-wrap gap-4">
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
                      <span className="font-medium">{selectedVideo.views?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Icon name="Calendar" size={18} />
                      <span>{selectedVideo.date}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleLike(selectedVideo.id)}
                    className={`${likedStreams.has(selectedVideo.id) ? 'bg-gaming-red text-white' : 'bg-black/50 text-white border border-gaming-red/30'} hover:bg-gaming-red/80 font-bold px-6 py-2`}
                  >
                    <Icon name="Heart" className={likedStreams.has(selectedVideo.id) ? 'fill-current mr-2' : 'mr-2'} size={20} />
                    {selectedVideo.likes}
                  </Button>
                </div>
                <p className="text-gray-300 text-lg">
                  Эпичный стрим с лучшими моментами! Не пропусти захватывающий геймплей и крутые комментарии.
                </p>
                <div className="border-t border-gaming-red/30 pt-4">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Icon name="MessageCircle" size={24} className="text-gaming-yellow" />
                    Комментарии ({selectedVideo.comments.length})
                  </h4>
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {selectedVideo.comments.length > 0 ? (
                      selectedVideo.comments.map(comment => (
                        <div key={comment.id} className="bg-black/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="User" size={14} className="text-gaming-yellow" />
                            <span className="text-gaming-yellow font-bold text-sm">{comment.username}</span>
                            <span className="text-gray-500 text-xs">• {comment.timestamp}</span>
                          </div>
                          <p className="text-white text-sm">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Будьте первым, кто оставит комментарий!</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Напишите комментарий..."
                      className="bg-black/50 border-gaming-red/30 text-white flex-1"
                      rows={2}
                    />
                    <Button
                      onClick={() => handleAddComment(selectedVideo.id)}
                      className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
                    >
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
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