import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import DonationAlert from '@/components/DonationAlert';
import { Donation } from '@/components/DonationWidget';

const StreamOverlay = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const storedDonations = localStorage.getItem('gamecorn_donations');
    if (storedDonations) {
      try {
        const parsed = JSON.parse(storedDonations);
        setDonations(parsed);
        setRecentDonations(parsed.slice(0, 5));
      } catch (e) {
        console.error('Error parsing donations:', e);
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gamecorn_donations' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setDonations(parsed);
          setRecentDonations(parsed.slice(0, 5));
        } catch (error) {
          console.error('Error parsing donations:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      const stored = localStorage.getItem('gamecorn_donations');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setDonations(parsed);
          setRecentDonations(parsed.slice(0, 5));
        } catch (e) {
          console.error('Error parsing donations:', e);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (donations.length > 0 && !currentDonation) {
      const nextDonation = donations.find(d => !d.isPlaying);
      if (nextDonation) {
        setCurrentDonation(nextDonation);
        const updatedDonations = donations.map(d =>
          d.id === nextDonation.id ? { ...d, isPlaying: true } : d
        );
        localStorage.setItem('gamecorn_donations', JSON.stringify(updatedDonations));
      }
    }
  }, [donations, currentDonation]);

  const handleDonationComplete = () => {
    if (currentDonation) {
      const updatedDonations = donations.filter(d => d.id !== currentDonation.id);
      setDonations(updatedDonations);
      localStorage.setItem('gamecorn_donations', JSON.stringify(updatedDonations));
      setCurrentDonation(null);
    }
  };

  const copyOverlayUrl = () => {
    const url = `${window.location.origin}/stream-overlay`;
    navigator.clipboard.writeText(url);
    alert('URL оверлея скопирован! Вставьте его в OBS как Browser Source');
  };

  return (
    <div className="min-h-screen bg-transparent">
      {currentDonation && (
        <DonationAlert
          donation={currentDonation}
          onComplete={handleDonationComplete}
        />
      )}

      <div className="fixed top-4 right-4 z-40 space-y-2 max-w-sm">
        {recentDonations.map((donation, index) => (
          <Card
            key={donation.id}
            className="bg-gradient-to-r from-gaming-red/90 to-gaming-orange/90 backdrop-blur-sm p-3 animate-in slide-in-from-right"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gaming-yellow flex items-center justify-center flex-shrink-0">
                <Icon name="DollarSign" size={16} className="text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{donation.username}</p>
                <p className="text-white/80 text-xs truncate">{donation.message}</p>
              </div>
              <p className="text-gaming-yellow font-black text-lg flex-shrink-0">
                {donation.amount}₽
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-4 left-4 z-40 opacity-20 hover:opacity-100 transition-opacity">
        <Card className="bg-black/80 backdrop-blur-sm p-3">
          <div className="flex items-center gap-2 text-white text-xs">
            <Icon name="Activity" size={14} className="text-gaming-red animate-pulse" />
            <span>Stream Overlay Active</span>
          </div>
        </Card>
      </div>

      {donations.length === 0 && !currentDonation && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Card className="bg-black/80 backdrop-blur-sm p-8 max-w-lg">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gaming-red to-gaming-orange flex items-center justify-center mx-auto">
                <Icon name="Monitor" size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Оверлей для стрима</h2>
              <p className="text-gray-400">
                Добавьте эту страницу в OBS как Browser Source для отображения донатов на стриме
              </p>
              <div className="bg-gaming-red/20 border border-gaming-red/30 rounded-lg p-4 space-y-2">
                <p className="text-white font-bold text-sm">Инструкция для OBS:</p>
                <ol className="text-gray-300 text-sm text-left space-y-1 list-decimal list-inside">
                  <li>Добавьте источник "Браузер" (Browser Source)</li>
                  <li>Вставьте URL этой страницы</li>
                  <li>Установите размер 1920x1080</li>
                  <li>Отправляйте донаты с главной страницы</li>
                  <li>Они автоматически появятся на стриме!</li>
                </ol>
              </div>
              <Button
                onClick={copyOverlayUrl}
                className="bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
              >
                <Icon name="Copy" size={16} className="mr-2" />
                Скопировать URL оверлея
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StreamOverlay;
