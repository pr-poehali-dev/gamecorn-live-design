import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export interface Donation {
  id: number;
  username: string;
  amount: number;
  message: string;
  voice: string;
  timestamp: string;
  isPlaying?: boolean;
}

interface DonationWidgetProps {
  onDonate: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
  isLoggedIn: boolean;
  username: string;
}

export const voices = [
  { id: 'ru-RU-DmitryNeural', name: 'Дмитрий (RU)', flag: '🇷🇺', type: 'standard' },
  { id: 'ru-RU-SvetlanaNeural', name: 'Светлана (RU)', flag: '🇷🇺', type: 'standard' },
  { id: 'en-US-GuyNeural', name: 'Guy (US)', flag: '🇺🇸', type: 'standard' },
  { id: 'en-GB-RyanNeural', name: 'Ryan (UK)', flag: '🇬🇧', type: 'standard' },
  { id: 'fr-FR-DeniseNeural', name: 'Denise (FR)', flag: '🇫🇷', type: 'standard' },
  { id: 'de-DE-ConradNeural', name: 'Conrad (DE)', flag: '🇩🇪', type: 'standard' },
  { id: 'custom-morgan-freeman', name: 'Морган Фриман', flag: '🎬', type: 'celebrity' },
  { id: 'custom-schwarzenegger', name: 'Арнольд Шварценеггер', flag: '💪', type: 'celebrity' },
  { id: 'custom-donald-trump', name: 'Дональд Трамп', flag: '🦅', type: 'celebrity' },
  { id: 'custom-queen', name: 'Королева Елизавета', flag: '👑', type: 'celebrity' },
  { id: 'custom-putin', name: 'Владимир Путин', flag: '🇷🇺', type: 'celebrity' },
  { id: 'custom-elon-musk', name: 'Илон Маск', flag: '🚀', type: 'celebrity' },
  { id: 'custom-robot', name: 'Робот', flag: '🤖', type: 'fun' },
  { id: 'custom-darth-vader', name: 'Дарт Вейдер', flag: '⚫', type: 'fun' },
  { id: 'custom-spongebob', name: 'Губка Боб', flag: '🧽', type: 'fun' },
  { id: 'custom-anime-girl', name: 'Аниме девочка', flag: '🌸', type: 'fun' },
];

const DonationWidget = ({ onDonate, isLoggedIn, username }: DonationWidgetProps) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('ru-RU-DmitryNeural');
  const [volume, setVolume] = useState([80]);
  const [speed, setSpeed] = useState([100]);

  const presetAmounts = [50, 100, 200, 500, 1000, 5000];

  const handleDonate = () => {
    if (!isLoggedIn) {
      toast.error('Войдите, чтобы отправить донат!');
      return;
    }

    const donateAmount = parseFloat(amount);
    if (!amount || donateAmount <= 0) {
      toast.error('Введите корректную сумму доната!');
      return;
    }

    if (!message.trim()) {
      toast.error('Напишите сообщение для доната!');
      return;
    }

    const selectedVoiceData = voices.find(v => v.id === selectedVoice);
    
    onDonate({
      username,
      amount: donateAmount,
      message: message.trim(),
      voice: selectedVoice,
      isPlaying: false,
    });

    toast.success(`Донат ${donateAmount}₽ отправлен! 💰`, {
      description: `Голос: ${selectedVoiceData?.name}`,
    });

    setAmount('');
    setMessage('');
  };

  const handleTestVoice = () => {
    if (!message.trim()) {
      toast.info('Напишите текст для прослушивания');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = selectedVoice.startsWith('ru') ? 'ru-RU' : 'en-US';
    utterance.volume = volume[0] / 100;
    utterance.rate = speed[0] / 100;
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    
    toast.success('Воспроизведение голоса 🔊');
  };

  const selectedVoiceData = voices.find(v => v.id === selectedVoice);
  const standardVoices = voices.filter(v => v.type === 'standard');
  const celebrityVoices = voices.filter(v => v.type === 'celebrity');
  const funVoices = voices.filter(v => v.type === 'fun');

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-red/20 border-gaming-red/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon name="DollarSign" size={24} className="text-gaming-yellow" />
          Отправить донат
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-white mb-2 block">Сумма доната (₽)</Label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {presetAmounts.map(preset => (
              <Button
                key={preset}
                variant="outline"
                onClick={() => setAmount(preset.toString())}
                className={`border-gaming-red/30 hover:border-gaming-yellow hover:bg-gaming-yellow/10 ${
                  amount === preset.toString() ? 'bg-gaming-yellow/20 border-gaming-yellow' : ''
                }`}
              >
                {preset}₽
              </Button>
            ))}
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Или введите свою сумму"
            className="bg-black/50 border-gaming-red/30 text-white"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block flex items-center gap-2">
            <Icon name="MessageSquare" size={16} />
            Сообщение для доната
          </Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Привет! Классный стрим! 🔥"
            className="bg-black/50 border-gaming-red/30 text-white min-h-[100px]"
            maxLength={500}
          />
          <p className="text-gray-400 text-xs mt-1">{message.length}/500 символов</p>
        </div>

        <div>
          <Label className="text-white mb-2 block flex items-center gap-2">
            <Icon name="Mic" size={16} />
            Голос озвучки
          </Label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="bg-black/50 border-gaming-red/30 text-white">
              <SelectValue>
                <span className="flex items-center gap-2">
                  <span>{selectedVoiceData?.flag}</span>
                  <span>{selectedVoiceData?.name}</span>
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gaming-red/30">
              <div className="px-2 py-1 text-xs font-bold text-gaming-yellow">
                Стандартные голоса
              </div>
              {standardVoices.map(voice => (
                <SelectItem key={voice.id} value={voice.id} className="text-white hover:bg-gaming-red/20">
                  <span className="flex items-center gap-2">
                    <span>{voice.flag}</span>
                    <span>{voice.name}</span>
                  </span>
                </SelectItem>
              ))}
              <div className="px-2 py-1 text-xs font-bold text-gaming-yellow mt-2">
                Знаменитости
              </div>
              {celebrityVoices.map(voice => (
                <SelectItem key={voice.id} value={voice.id} className="text-white hover:bg-gaming-red/20">
                  <span className="flex items-center gap-2">
                    <span>{voice.flag}</span>
                    <span>{voice.name}</span>
                  </span>
                </SelectItem>
              ))}
              <div className="px-2 py-1 text-xs font-bold text-gaming-yellow mt-2">
                Прикольные
              </div>
              {funVoices.map(voice => (
                <SelectItem key={voice.id} value={voice.id} className="text-white hover:bg-gaming-red/20">
                  <span className="flex items-center gap-2">
                    <span>{voice.flag}</span>
                    <span>{voice.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block flex items-center gap-2 text-sm">
              <Icon name="Volume2" size={14} />
              Громкость: {volume[0]}%
            </Label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={5}
              className="cursor-pointer"
            />
          </div>
          <div>
            <Label className="text-white mb-2 block flex items-center gap-2 text-sm">
              <Icon name="Gauge" size={14} />
              Скорость: {speed[0]}%
            </Label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={50}
              max={200}
              step={10}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleTestVoice}
            variant="outline"
            className="flex-1 border-gaming-yellow/50 hover:bg-gaming-yellow/10 text-white"
            disabled={!message.trim()}
          >
            <Icon name="Play" size={16} className="mr-1" />
            Тест голоса
          </Button>
          <Button
            onClick={handleDonate}
            className="flex-1 bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
            disabled={!isLoggedIn}
          >
            <Icon name="Send" size={16} className="mr-1" />
            Отправить донат
          </Button>
        </div>

        {!isLoggedIn && (
          <p className="text-gaming-yellow text-sm text-center">
            Войдите, чтобы отправлять донаты
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DonationWidget;
