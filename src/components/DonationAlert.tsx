import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Donation } from './DonationWidget';

interface DonationAlertProps {
  donation: Donation;
  onComplete: () => void;
}

const DonationAlert = ({ donation, onComplete }: DonationAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const utterance = new SpeechSynthesisUtterance(
      `${donation.username} отправил донат ${donation.amount} рублей. Сообщение: ${donation.message}`
    );
    
    utterance.lang = donation.voice.startsWith('ru') ? 'ru-RU' : 'en-US';
    utterance.volume = 0.8;
    utterance.rate = 1.0;

    if (donation.voice.startsWith('custom-')) {
      utterance.pitch = getCustomVoicePitch(donation.voice);
      utterance.rate = getCustomVoiceRate(donation.voice);
    }

    utterance.onend = () => {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 2000);
    };

    utterance.onerror = () => {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 3000);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);

    const estimatedDuration = (utterance.text.length / 10) * 1000;
    const progressStep = 100 / (estimatedDuration / 100);
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + progressStep;
        return next >= 100 ? 100 : next;
      });
    }, 100);

    return () => {
      window.speechSynthesis.cancel();
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [donation, onComplete]);

  const getCustomVoicePitch = (voiceId: string): number => {
    const pitchMap: Record<string, number> = {
      'custom-morgan-freeman': 0.7,
      'custom-schwarzenegger': 0.6,
      'custom-donald-trump': 0.8,
      'custom-queen': 1.2,
      'custom-putin': 0.7,
      'custom-elon-musk': 0.9,
      'custom-robot': 0.5,
      'custom-darth-vader': 0.4,
      'custom-spongebob': 1.8,
      'custom-anime-girl': 1.6,
    };
    return pitchMap[voiceId] || 1.0;
  };

  const getCustomVoiceRate = (voiceId: string): number => {
    const rateMap: Record<string, number> = {
      'custom-morgan-freeman': 0.85,
      'custom-schwarzenegger': 0.9,
      'custom-donald-trump': 1.1,
      'custom-queen': 0.9,
      'custom-putin': 0.85,
      'custom-elon-musk': 1.0,
      'custom-robot': 0.8,
      'custom-darth-vader': 0.75,
      'custom-spongebob': 1.3,
      'custom-anime-girl': 1.2,
    };
    return rateMap[voiceId] || 1.0;
  };

  const getAmountColor = () => {
    if (donation.amount >= 5000) return 'from-purple-500 to-pink-500';
    if (donation.amount >= 1000) return 'from-gaming-red to-gaming-orange';
    if (donation.amount >= 500) return 'from-gaming-orange to-gaming-yellow';
    return 'from-blue-500 to-cyan-500';
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
        pointerEvents: 'none'
      }}
    >
      <Card
        className={`max-w-2xl w-full bg-gradient-to-br ${getAmountColor()} p-1 transform transition-all duration-500 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-75 translate-y-10'
        }`}
      >
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gaming-yellow to-gaming-orange flex items-center justify-center animate-pulse">
                <Icon name="DollarSign" size={32} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{donation.username}</p>
                <p className="text-gray-400">отправил донат</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-4xl font-black bg-gradient-to-r ${getAmountColor()} bg-clip-text text-transparent`}>
                {donation.amount}₽
              </p>
            </div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <Icon name="MessageSquare" size={20} className="text-gaming-yellow mt-1 flex-shrink-0" />
              <p className="text-xl text-white leading-relaxed break-words">{donation.message}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <Icon name="Mic" size={14} />
                Воспроизведение...
              </span>
              <span className="text-gaming-yellow">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-black/50 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getAmountColor()} transition-all duration-100 rounded-full`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {donation.amount >= 1000 && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl animate-bounce">
              {donation.amount >= 5000 ? '🎉' : '🔥'}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DonationAlert;
