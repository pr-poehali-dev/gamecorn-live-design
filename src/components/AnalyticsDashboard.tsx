import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  const viewsData = [
    { time: '00:00', views: 120 },
    { time: '03:00', views: 80 },
    { time: '06:00', views: 150 },
    { time: '09:00', views: 300 },
    { time: '12:00', views: 450 },
    { time: '15:00', views: 600 },
    { time: '18:00', views: 820 },
    { time: '21:00', views: 950 },
  ];

  const donationsData = [
    { date: 'Пн', amount: 1200 },
    { date: 'Вт', amount: 1800 },
    { date: 'Ср', amount: 2400 },
    { date: 'Чт', amount: 1600 },
    { date: 'Пт', amount: 3200 },
    { date: 'Сб', amount: 4500 },
    { date: 'Вс', amount: 3800 },
  ];

  const maxViews = Math.max(...viewsData.map(d => d.views));
  const maxDonations = Math.max(...donationsData.map(d => d.amount));

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gaming-red to-gaming-orange border-gaming-yellow">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Icon name="BarChart3" size={28} className="text-gaming-yellow" />
            Аналитика и статистика
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Всего просмотров</p>
                <p className="text-3xl font-black text-white">142.5K</p>
                <p className="text-green-500 text-xs flex items-center gap-1 mt-1">
                  <Icon name="TrendingUp" size={12} />
                  +12.5% за неделю
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Icon name="Eye" size={24} className="text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Сумма донатов</p>
                <p className="text-3xl font-black text-white">₽18.5K</p>
                <p className="text-green-500 text-xs flex items-center gap-1 mt-1">
                  <Icon name="TrendingUp" size={12} />
                  +24.8% за неделю
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Подписчиков</p>
                <p className="text-3xl font-black text-white">8,234</p>
                <p className="text-green-500 text-xs flex items-center gap-1 mt-1">
                  <Icon name="TrendingUp" size={12} />
                  +156 за неделю
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Icon name="Users" size={24} className="text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Средний онлайн</p>
                <p className="text-3xl font-black text-white">1,847</p>
                <p className="text-green-500 text-xs flex items-center gap-1 mt-1">
                  <Icon name="TrendingUp" size={12} />
                  +8.3% за неделю
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Icon name="Activity" size={24} className="text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views" className="w-full">
        <TabsList className="grid grid-cols-3 gap-2 bg-black/50 p-2">
          <TabsTrigger value="views" className="data-[state=active]:bg-gaming-red">
            <Icon name="Eye" size={16} className="mr-2" />
            Просмотры
          </TabsTrigger>
          <TabsTrigger value="donations" className="data-[state=active]:bg-gaming-red">
            <Icon name="DollarSign" size={16} className="mr-2" />
            Донаты
          </TabsTrigger>
          <TabsTrigger value="engagement" className="data-[state=active]:bg-gaming-red">
            <Icon name="Users" size={16} className="mr-2" />
            Активность
          </TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-gaming-yellow" />
                  График просмотров
                </span>
                <div className="flex gap-2">
                  {(['day', 'week', 'month'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded text-sm ${
                        timeRange === range
                          ? 'bg-gaming-yellow text-black'
                          : 'bg-black/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      {range === 'day' ? 'День' : range === 'week' ? 'Неделя' : 'Месяц'}
                    </button>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-end gap-4 px-4">
                  {viewsData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative group">
                        <div
                          className="w-full bg-gradient-to-t from-gaming-red to-gaming-orange rounded-t-lg transition-all duration-300 hover:from-gaming-yellow hover:to-gaming-orange cursor-pointer"
                          style={{ height: `${(data.views / maxViews) * 200}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {data.views} просмотров
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{data.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="DollarSign" size={20} className="text-gaming-yellow" />
                Динамика донатов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-end gap-3 px-4">
                  {donationsData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative group">
                        <div
                          className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-300 hover:from-gaming-yellow hover:to-gaming-orange cursor-pointer"
                          style={{ height: `${(data.amount / maxDonations) * 200}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ₽{data.amount}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{data.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-2">Средний донат</p>
                <p className="text-2xl font-black text-gaming-yellow">₽342</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-2">Крупнейший донат</p>
                <p className="text-2xl font-black text-gaming-orange">₽5,000</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-2">Всего донатов</p>
                <p className="text-2xl font-black text-green-500">154</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} className="text-gaming-yellow" />
                  Активность в чате
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Всего комментариев</span>
                  <span className="text-white font-bold">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Средняя длина</span>
                  <span className="text-white font-bold">24 символа</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Активных пользователей</span>
                  <span className="text-white font-bold">1,234</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Heart" size={20} className="text-gaming-yellow" />
                  Реакции
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">❤️ Лайки</span>
                  <span className="text-white font-bold">15,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">🔥 Огонь</span>
                  <span className="text-white font-bold">8,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">😂 Смех</span>
                  <span className="text-white font-bold">5,123</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Trophy" size={20} className="text-gaming-yellow" />
                Топ активных пользователей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'ProGamer99', messages: 234, donations: 5 },
                  { name: 'MegaFan', messages: 189, donations: 12 },
                  { name: 'StreamLover', messages: 156, donations: 3 },
                  { name: 'GamingKing', messages: 142, donations: 8 },
                  { name: 'ChatMaster', messages: 128, donations: 2 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-gaming-yellow font-bold w-6">#{i + 1}</span>
                      <div className="w-8 h-8 rounded-full bg-gaming-red flex items-center justify-center text-white font-bold">
                        {user.name[0]}
                      </div>
                      <span className="text-white font-bold">{user.name}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-400">
                        <Icon name="MessageSquare" size={14} className="inline mr-1" />
                        {user.messages}
                      </span>
                      <span className="text-gaming-yellow">
                        <Icon name="DollarSign" size={14} className="inline mr-1" />
                        {user.donations}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
