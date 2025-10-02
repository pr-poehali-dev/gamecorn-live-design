import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import RoleBadge from '@/components/RoleBadge';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface RouletteBlock {
  id: number;
  color: string;
  prize: string;
  value: number;
}

interface Bet {
  id: number;
  username: string;
  role: UserRole;
  amount: number;
  blockId: number;
  comment: string;
  timestamp: string;
}

interface Winner {
  id: number;
  username: string;
  role: UserRole;
  prize: string;
  amount: number;
  timestamp: string;
}

const Auction = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [balance, setBalance] = useState(1000);

  // Настройки рулетки
  const [blockCount, setBlockCount] = useState(8);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winningBlock, setWinningBlock] = useState<RouletteBlock | null>(null);

  // Блоки рулетки
  const [blocks, setBlocks] = useState<RouletteBlock[]>([
    { id: 1, color: '#dc2626', prize: 'x2', value: 2 },
    { id: 2, color: '#2563eb', prize: 'x0.5', value: 0.5 },
    { id: 3, color: '#16a34a', prize: 'x3', value: 3 },
    { id: 4, color: '#9333ea', prize: 'x0', value: 0 },
    { id: 5, color: '#ea580c', prize: 'x5', value: 5 },
    { id: 6, color: '#0891b2', prize: 'x1', value: 1 },
    { id: 7, color: '#ca8a04', prize: 'x10', value: 10 },
    { id: 8, color: '#4b5563', prize: 'x0.1', value: 0.1 },
  ]);

  // Ставки
  const [betAmount, setBetAmount] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [betComment, setBetComment] = useState('');
  const [bets, setBets] = useState<Bet[]>([
    { id: 1, username: 'ProGamer', role: 'vip', amount: 100, blockId: 7, comment: 'Ставлю на x10! 🔥', timestamp: '2 мин назад' },
    { id: 2, username: 'LuckyPlayer', role: 'subscriber', amount: 50, blockId: 5, comment: 'Удача со мной!', timestamp: '5 мин назад' },
  ]);

  // История победителей
  const [winners, setWinners] = useState<Winner[]>([
    { id: 1, username: 'WinnerPro', role: 'vip', prize: 'x10', amount: 500, timestamp: '10 мин назад' },
    { id: 2, username: 'MegaLuck', role: 'subscriber', prize: 'x5', amount: 250, timestamp: '15 мин назад' },
  ]);

  // Настройки (для админа)
  const [showSettings, setShowSettings] = useState(false);
  const [newBlockColor, setNewBlockColor] = useState('#dc2626');
  const [newBlockPrize, setNewBlockPrize] = useState('');
  const [newBlockValue, setNewBlockValue] = useState('');

  const rouletteRef = useRef<HTMLDivElement>(null);
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  const canManageRoulette = userRole === 'owner' || userRole === 'moderator';

  // Инициализация звуков
  useEffect(() => {
    // Звук вращения (длинный звук рулетки)
    spinSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    
    // Звук выигрыша (приятный звон)
    winSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    
    return () => {
      spinSoundRef.current = null;
      winSoundRef.current = null;
    };
  }, []);

  // Функция для воспроизведения звука вращения
  const playSpinSound = () => {
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.playbackRate = 1.0;
      spinSoundRef.current.volume = 0.3;
      spinSoundRef.current.play().catch(() => {});
    }
  };

  // Функция для воспроизведения звука выигрыша
  const playWinSound = () => {
    if (winSoundRef.current) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.volume = 0.5;
      winSoundRef.current.play().catch(() => {});
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('TestUser');
    setUserRole('viewer');
    toast.success('Добро пожаловать на аукцион! 🎰');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('viewer');
    toast.info('Вы вышли из аккаунта');
  };

  const placeBet = () => {
    if (!isLoggedIn) {
      toast.error('Войдите, чтобы делать ставки!');
      return;
    }

    if (!betAmount || parseFloat(betAmount) <= 0) {
      toast.error('Введите корректную сумму ставки!');
      return;
    }

    if (!selectedBlock) {
      toast.error('Выберите позицию на рулетке!');
      return;
    }

    const amount = parseFloat(betAmount);
    if (amount > balance) {
      toast.error('Недостаточно средств!');
      return;
    }

    const newBet: Bet = {
      id: Date.now(),
      username,
      role: userRole,
      amount,
      blockId: selectedBlock,
      comment: betComment || 'Ставка сделана!',
      timestamp: 'Только что',
    };

    setBets(prev => [newBet, ...prev]);
    setBalance(prev => prev - amount);
    setBetAmount('');
    setBetComment('');
    setSelectedBlock(null);

    toast.success(`Ставка ${amount}₽ принята! 🎲`, {
      description: `На позицию: ${blocks.find(b => b.id === selectedBlock)?.prize}`,
    });
  };

  const spinRoulette = () => {
    if (isSpinning) return;

    if (bets.length === 0) {
      toast.error('Нет активных ставок для розыгрыша!');
      return;
    }

    setIsSpinning(true);
    playSpinSound(); // Воспроизводим звук вращения
    
    // Случайный блок-победитель
    const randomIndex = Math.floor(Math.random() * blocks.length);
    const winner = blocks[randomIndex];
    
    // Рассчитываем угол вращения
    const segmentAngle = 360 / blocks.length;
    const targetRotation = 360 * 5 + (360 - (randomIndex * segmentAngle + segmentAngle / 2)); // 5 полных оборотов + точная позиция
    
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinningBlock(winner);
      processWinners(winner);
    }, 4000);
  };

  const processWinners = (winningBlock: RouletteBlock) => {
    const winningBets = bets.filter(bet => bet.blockId === winningBlock.id);

    if (winningBets.length === 0) {
      toast.error('Никто не угадал! 😢', {
        description: `Выпало: ${winningBlock.prize}`,
      });
    } else {
      playWinSound(); // Воспроизводим звук выигрыша
      
      winningBets.forEach(bet => {
        const winAmount = bet.amount * winningBlock.value;
        setBalance(prev => prev + winAmount);

        const newWinner: Winner = {
          id: Date.now() + bet.id,
          username: bet.username,
          role: bet.role,
          prize: winningBlock.prize,
          amount: winAmount,
          timestamp: 'Только что',
        };

        setWinners(prev => [newWinner, ...prev]);

        if (bet.username === username) {
          toast.success(`Вы выиграли ${winAmount}₽! 🎉`, {
            description: `Множитель: ${winningBlock.prize}`,
          });
        }
      });
    }

    // Очищаем ставки после розыгрыша
    setBets([]);
  };

  const addBlock = () => {
    if (!newBlockPrize || !newBlockValue) {
      toast.error('Заполните все поля!');
      return;
    }

    const newBlock: RouletteBlock = {
      id: Date.now(),
      color: newBlockColor,
      prize: newBlockPrize,
      value: parseFloat(newBlockValue),
    };

    setBlocks(prev => [...prev, newBlock]);
    setBlockCount(blocks.length + 1);
    
    setNewBlockPrize('');
    setNewBlockValue('');
    
    toast.success('Новый блок добавлен! 🎨');
  };

  const removeBlock = (id: number) => {
    if (blocks.length <= 3) {
      toast.error('Минимум 3 блока должно быть!');
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
    setBlockCount(blocks.length - 1);
    toast.success('Блок удален!');
  };

  const totalBetsAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);

  return (
    <div className="min-h-screen bg-gaming-dark">
      <nav className="bg-black/50 backdrop-blur-md border-b border-gaming-red/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3">
                <Icon name="ArrowLeft" size={24} className="text-gaming-yellow" />
                <span className="text-white font-bold">Назад</span>
              </a>
              <div className="h-8 w-px bg-gaming-red/30" />
              <div>
                <h1 className="text-2xl font-black text-gradient-fire">
                  АУКЦИОННАЯ РУЛЕТКА
                </h1>
                <p className="text-gaming-yellow text-xs font-medium">Сделай ставку и выиграй!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <div className="bg-gaming-yellow/20 border border-gaming-yellow/50 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Coins" size={20} className="text-gaming-yellow" />
                      <span className="text-white font-bold">{balance}₽</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gaming-red/20 border border-gaming-red/50 rounded-lg px-4 py-2">
                    <Icon name="User" size={20} className="text-gaming-yellow" />
                    <span className="text-white font-bold">{username}</span>
                    <RoleBadge role={userRole} size="md" />
                  </div>
                  <Button onClick={handleLogout} variant="outline" className="border-gaming-red/50 text-white hover:bg-gaming-red/20">
                    <Icon name="LogOut" className="mr-2" size={18} />
                    Выйти
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogin} className="bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold">
                  <Icon name="User" className="mr-2" size={20} />
                  ВОЙТИ
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Рулетка */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-gradient-fire flex items-center gap-2">
                  <Icon name="Target" size={24} />
                  Рулетка
                </CardTitle>
                {canManageRoulette && (
                  <Button
                    onClick={() => setShowSettings(!showSettings)}
                    variant="outline"
                    size="sm"
                    className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/20"
                  >
                    <Icon name="Settings" size={18} />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Рулетка */}
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-10">
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-gaming-red animate-pulse" />
                  </div>
                  
                  <div
                    ref={rouletteRef}
                    className="relative w-full aspect-square max-w-md mx-auto"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                    }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {blocks.map((block, index) => {
                        const segmentAngle = 360 / blocks.length;
                        const startAngle = index * segmentAngle - 90;
                        const endAngle = startAngle + segmentAngle;
                        
                        const startRad = (startAngle * Math.PI) / 180;
                        const endRad = (endAngle * Math.PI) / 180;
                        
                        const x1 = 100 + 100 * Math.cos(startRad);
                        const y1 = 100 + 100 * Math.sin(startRad);
                        const x2 = 100 + 100 * Math.cos(endRad);
                        const y2 = 100 + 100 * Math.sin(endRad);
                        
                        const largeArc = segmentAngle > 180 ? 1 : 0;
                        
                        return (
                          <g key={block.id}>
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={block.color}
                              stroke="#000"
                              strokeWidth="2"
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => !isSpinning && setSelectedBlock(block.id)}
                            />
                            <text
                              x={100 + 60 * Math.cos((startAngle + segmentAngle / 2) * Math.PI / 180)}
                              y={100 + 60 * Math.sin((startAngle + segmentAngle / 2) * Math.PI / 180)}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="16"
                              fontWeight="bold"
                              className="pointer-events-none select-none"
                            >
                              {block.prize}
                            </text>
                          </g>
                        );
                      })}
                      <circle cx="100" cy="100" r="20" fill="#000" />
                      <circle cx="100" cy="100" r="15" fill="#fbbf24" />
                    </svg>
                  </div>

                  {winningBlock && !isSpinning && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Badge className="bg-gaming-yellow text-black font-bold text-2xl px-8 py-4 animate-bounce">
                        Выпало: {winningBlock.prize}!
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Кнопка запуска */}
                <Button
                  onClick={spinRoulette}
                  disabled={isSpinning || bets.length === 0}
                  className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold py-6 text-xl disabled:opacity-50"
                >
                  {isSpinning ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
                      Крутится...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="mr-2" size={24} />
                      Запустить рулетку
                    </>
                  )}
                </Button>

                {/* Статистика */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <Icon name="Users" size={24} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{bets.length}</div>
                    <div className="text-gray-400 text-sm">Ставок</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <Icon name="Coins" size={24} className="text-gaming-yellow mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{totalBetsAmount}₽</div>
                    <div className="text-gray-400 text-sm">Банк</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Настройки рулетки (только для админов) */}
            {showSettings && canManageRoulette && (
              <Card className="bg-gaming-yellow/10 border-gaming-yellow/30 animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Wrench" size={20} />
                    Настройки рулетки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Добавить новый блок</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="color"
                        value={newBlockColor}
                        onChange={(e) => setNewBlockColor(e.target.value)}
                        className="h-10"
                      />
                      <Input
                        value={newBlockPrize}
                        onChange={(e) => setNewBlockPrize(e.target.value)}
                        placeholder="x2"
                        className="bg-black/50 border-gaming-yellow/30 text-white"
                      />
                      <Input
                        type="number"
                        value={newBlockValue}
                        onChange={(e) => setNewBlockValue(e.target.value)}
                        placeholder="2"
                        className="bg-black/50 border-gaming-yellow/30 text-white"
                      />
                    </div>
                    <Button
                      onClick={addBlock}
                      className="w-full bg-gaming-yellow hover:bg-gaming-yellow/80 text-black font-bold"
                    >
                      <Icon name="Plus" className="mr-2" size={16} />
                      Добавить блок
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Текущие блоки ({blocks.length})</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {blocks.map(block => (
                        <div
                          key={block.id}
                          className="flex items-center justify-between p-2 rounded-lg border"
                          style={{ backgroundColor: block.color + '20', borderColor: block.color }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: block.color }}
                            />
                            <span className="text-white font-bold">{block.prize}</span>
                          </div>
                          <Button
                            onClick={() => removeBlock(block.id)}
                            size="sm"
                            variant="ghost"
                            className="text-white hover:text-red-500"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* История победителей */}
            <Card className="bg-black/30 border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Trophy" size={20} className="text-gaming-yellow" />
                  Последние победители
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {winners.map(winner => (
                    <div key={winner.id} className="bg-black/50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Award" size={18} className="text-gaming-yellow" />
                        <span className="text-white font-bold">{winner.username}</span>
                        <RoleBadge role={winner.role} size="sm" />
                      </div>
                      <div className="text-right">
                        <div className="text-gaming-yellow font-bold">{winner.prize}</div>
                        <div className="text-green-500 text-sm">+{winner.amount}₽</div>
                      </div>
                    </div>
                  ))}
                  {winners.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Пока нет победителей</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Панель ставок */}
          <div className="space-y-6">
            {/* Форма ставки */}
            <Card className="bg-gradient-to-br from-gaming-yellow/10 to-gaming-orange/10 border-gaming-yellow/30">
              <CardHeader>
                <CardTitle className="text-gradient-fire flex items-center gap-2">
                  <Icon name="DollarSign" size={24} />
                  Сделать ставку
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoggedIn ? (
                  <>
                    <div className="space-y-2">
                      <Label className="text-white">Выберите позицию</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {blocks.map(block => (
                          <Button
                            key={block.id}
                            onClick={() => setSelectedBlock(block.id)}
                            variant={selectedBlock === block.id ? 'default' : 'outline'}
                            className={`font-bold ${
                              selectedBlock === block.id
                                ? 'ring-2 ring-gaming-yellow'
                                : 'border-gaming-red/30'
                            }`}
                            style={{
                              backgroundColor: selectedBlock === block.id ? block.color : undefined,
                              color: 'white',
                            }}
                          >
                            {block.prize}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Сумма ставки</Label>
                      <Input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        placeholder="100"
                        className="bg-black/50 border-gaming-yellow/30 text-white"
                      />
                      <div className="flex gap-2">
                        {[50, 100, 500, 1000].map(amount => (
                          <Button
                            key={amount}
                            onClick={() => setBetAmount(amount.toString())}
                            size="sm"
                            variant="outline"
                            className="flex-1 border-gaming-yellow/30 text-white hover:bg-gaming-yellow/20"
                          >
                            {amount}₽
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Комментарий (необязательно)</Label>
                      <Textarea
                        value={betComment}
                        onChange={(e) => setBetComment(e.target.value)}
                        placeholder="Удача со мной! 🍀"
                        className="bg-black/50 border-gaming-yellow/30 text-white"
                        rows={2}
                      />
                    </div>

                    <Button
                      onClick={placeBet}
                      disabled={!selectedBlock || !betAmount || isSpinning}
                      className="w-full bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold py-4 disabled:opacity-50"
                    >
                      <Icon name="Zap" className="mr-2" size={20} />
                      Поставить {betAmount || '0'}₽
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Lock" size={48} className="text-gaming-yellow mx-auto mb-4" />
                    <p className="text-white font-bold mb-4">Войдите, чтобы делать ставки</p>
                    <Button
                      onClick={handleLogin}
                      className="bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold"
                    >
                      Войти
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Активные ставки */}
            <Card className="bg-black/30 border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="List" size={20} className="text-gaming-yellow" />
                  Активные ставки ({bets.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {bets.map(bet => {
                    const block = blocks.find(b => b.id === bet.blockId);
                    return (
                      <div key={bet.id} className="bg-black/50 rounded-lg p-3 border border-gaming-red/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon name="User" size={16} className="text-gaming-yellow" />
                            <span className="text-white font-bold text-sm">{bet.username}</span>
                            <RoleBadge role={bet.role} size="sm" />
                          </div>
                          <div className="text-right">
                            <div className="text-gaming-yellow font-bold">{bet.amount}₽</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className="font-bold"
                            style={{ backgroundColor: block?.color }}
                          >
                            {block?.prize}
                          </Badge>
                          <span className="text-gray-500 text-xs">{bet.timestamp}</span>
                        </div>
                        {bet.comment && (
                          <p className="text-gray-300 text-sm italic">"{bet.comment}"</p>
                        )}
                      </div>
                    );
                  })}
                  {bets.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Нет активных ставок</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;