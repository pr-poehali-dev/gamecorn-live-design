import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SiteStats {
  totalStreams: number;
  totalViewers: string;
  totalDonations: string;
  averageViewers: string;
  totalWatchTime: string;
  subscribersCount: string;
}

interface StatisticsCardProps {
  siteStats: SiteStats;
}

const StatisticsCard = ({ siteStats }: StatisticsCardProps) => {
  return (
    <Card className="bg-black/30 border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="BarChart3" size={24} className="text-gaming-yellow" />
          Статистика канала
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gaming-red/20 rounded-lg p-4 text-center border border-gaming-red/30">
            <Icon name="Tv" size={32} className="text-gaming-yellow mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {siteStats.totalStreams}
            </div>
            <div className="text-gray-400 text-sm">Всего стримов</div>
          </div>
          <div className="bg-gaming-orange/20 rounded-lg p-4 text-center border border-gaming-orange/30">
            <Icon name="Eye" size={32} className="text-gaming-yellow mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {siteStats.totalViewers}
            </div>
            <div className="text-gray-400 text-sm">Всего зрителей</div>
          </div>
          <div className="bg-gaming-yellow/20 rounded-lg p-4 text-center border border-gaming-yellow/30">
            <Icon name="DollarSign" size={32} className="text-gaming-yellow mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {siteStats.totalDonations}
            </div>
            <div className="text-gray-400 text-sm">Донатов получено</div>
          </div>
          <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
            <Icon name="Users" size={32} className="text-gaming-yellow mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {siteStats.averageViewers}
            </div>
            <div className="text-gray-400 text-sm">Средний онлайн</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
            <Icon name="Clock" size={32} className="text-gaming-yellow mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {siteStats.totalWatchTime}
            </div>
            <div className="text-gray-400 text-sm">Время просмотра</div>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
            <Icon name="UserPlus" size={32} className="text-gaming-yellow mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">
              {siteStats.subscribersCount}
            </div>
            <div className="text-gray-400 text-sm">Подписчиков</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
