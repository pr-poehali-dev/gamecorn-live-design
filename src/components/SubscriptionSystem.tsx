import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  color: string;
  icon: string;
}

interface SubscriptionSystemProps {
  currentTier?: string;
  onSubscribe?: (tierId: string) => void;
}

const SubscriptionSystem = ({ currentTier, onSubscribe }: SubscriptionSystemProps) => {
  const tiers: SubscriptionTier[] = [
    {
      id: 'free',
      name: 'Зритель',
      price: 0,
      color: 'bg-gray-600',
      icon: 'Eye',
      features: [
        'Просмотр стримов',
        'Базовый чат',
        'Стандартные эмодзи',
      ],
    },
    {
      id: 'subscriber',
      name: 'Подписчик',
      price: 199,
      color: 'bg-gaming-red',
      icon: 'Gem',
      features: [
        'Все возможности Зрителя',
        'Значок SUB в чате',
        'Эксклюзивные эмодзи',
        'Чат без рекламы',
        'Приоритет в розыгрышах',
      ],
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 499,
      color: 'bg-purple-600',
      icon: 'Star',
      features: [
        'Все возможности Подписчика',
        'VIP значок в чате',
        'Персональные эмодзи',
        'Доступ к закрытым стримам',
        'Приоритетная поддержка',
        'Участие в играх со стримером',
      ],
    },
  ];

  const [selectedTier, setSelectedTier] = useState(currentTier || 'free');

  const handleSubscribe = (tierId: string) => {
    if (tierId === selectedTier) {
      toast.info('Вы уже используете этот уровень!');
      return;
    }

    const tier = tiers.find(t => t.id === tierId);
    if (tier) {
      if (tier.price === 0) {
        toast.info('Это бесплатный уровень доступа');
      } else {
        setSelectedTier(tierId);
        onSubscribe?.(tierId);
        toast.success(`Подписка "${tier.name}" оформлена! 🎉`, {
          description: `${tier.price}₽/месяц`
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-gradient-fire">Система подписок</h2>
        <p className="text-gray-300 text-lg">Выберите уровень поддержки канала</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map(tier => {
          const isCurrentTier = selectedTier === tier.id;
          return (
            <Card
              key={tier.id}
              className={`relative overflow-hidden transition-all ${
                isCurrentTier
                  ? 'border-gaming-yellow/50 bg-gaming-yellow/10 scale-105'
                  : 'border-gaming-red/30 bg-black/30 hover:scale-105'
              }`}
            >
              {isCurrentTier && (
                <Badge className="absolute top-4 right-4 bg-gaming-yellow text-black font-bold">
                  Активна
                </Badge>
              )}
              <CardHeader>
                <div className={`${tier.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <Icon name={tier.icon} size={32} className="text-white" />
                </div>
                <CardTitle className="text-center text-2xl text-white">
                  {tier.name}
                </CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-black text-gradient-fire">
                    {tier.price === 0 ? 'FREE' : `${tier.price}₽`}
                  </span>
                  {tier.price > 0 && (
                    <span className="text-gray-400 text-sm">/месяц</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <Icon name="Check" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={isCurrentTier}
                  className={`w-full font-bold ${
                    isCurrentTier
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80'
                  } text-white`}
                >
                  {isCurrentTier ? 'Текущая подписка' : tier.price === 0 ? 'Базовый доступ' : 'Оформить'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-gaming-yellow" />
            Бонусы для подписчиков
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Icon name="Youtube" size={20} className="text-red-600 mt-1" />
              <div>
                <h4 className="text-white font-bold">YouTube подписка</h4>
                <p className="text-gray-300 text-sm">
                  Синхронизируйте с YouTube для дополнительных бонусов
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Zap" size={20} className="text-gaming-yellow mt-1" />
              <div>
                <h4 className="text-white font-bold">Автопродление</h4>
                <p className="text-gray-300 text-sm">
                  Скидка 10% при автоматическом продлении
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Users" size={20} className="text-gaming-orange mt-1" />
              <div>
                <h4 className="text-white font-bold">Приведи друга</h4>
                <p className="text-gray-300 text-sm">
                  +7 дней бесплатно за каждого друга
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Trophy" size={20} className="text-gaming-yellow mt-1" />
              <div>
                <h4 className="text-white font-bold">Эксклюзивы</h4>
                <p className="text-gray-300 text-sm">
                  Ранний доступ к новым функциям
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSystem;
