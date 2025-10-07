import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ProfileStatsCard = () => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="BarChart3" size={20} className="text-gaming-yellow" />
          Моя статистика
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-gaming-yellow">156</p>
            <p className="text-sm text-gray-400">Комментариев</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-gaming-orange">23</p>
            <p className="text-sm text-gray-400">Донатов</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-green-500">₽2.4K</p>
            <p className="text-sm text-gray-400">Отправлено</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-purple-500">47ч</p>
            <p className="text-sm text-gray-400">Просмотрено</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStatsCard;
