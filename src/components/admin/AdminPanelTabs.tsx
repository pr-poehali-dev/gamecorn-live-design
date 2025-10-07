import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const AdminPanelTabs = () => {
  return (
    <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2 bg-black/50 p-2">
      <TabsTrigger value="global" className="data-[state=active]:bg-gaming-yellow data-[state=active]:text-black">
        <Icon name="Globe" size={16} className="mr-2" />
        Глобальные
      </TabsTrigger>
      <TabsTrigger value="general" className="data-[state=active]:bg-gaming-red">
        <Icon name="Settings" size={16} className="mr-2" />
        Основные
      </TabsTrigger>
      <TabsTrigger value="domain" className="data-[state=active]:bg-gaming-red">
        <Icon name="Link" size={16} className="mr-2" />
        Домен/SEO
      </TabsTrigger>
      <TabsTrigger value="appearance" className="data-[state=active]:bg-gaming-red">
        <Icon name="Palette" size={16} className="mr-2" />
        Внешний вид
      </TabsTrigger>
      <TabsTrigger value="content" className="data-[state=active]:bg-gaming-red">
        <Icon name="FileText" size={16} className="mr-2" />
        Контент
      </TabsTrigger>
      <TabsTrigger value="navigation" className="data-[state=active]:bg-gaming-red">
        <Icon name="Menu" size={16} className="mr-2" />
        Навигация
      </TabsTrigger>
      <TabsTrigger value="texts" className="data-[state=active]:bg-gaming-red">
        <Icon name="Type" size={16} className="mr-2" />
        Тексты
      </TabsTrigger>
      <TabsTrigger value="media" className="data-[state=active]:bg-gaming-red">
        <Icon name="Image" size={16} className="mr-2" />
        Медиа
      </TabsTrigger>
      <TabsTrigger value="integrations" className="data-[state=active]:bg-gaming-red">
        <Icon name="Plug" size={16} className="mr-2" />
        Интеграции
      </TabsTrigger>
      <TabsTrigger value="auction" className="data-[state=active]:bg-gaming-red">
        <Icon name="Gavel" size={16} className="mr-2" />
        Аукцион
      </TabsTrigger>
      <TabsTrigger value="roulette" className="data-[state=active]:bg-gaming-red">
        <Icon name="Disc" size={16} className="mr-2" />
        Рулетка
      </TabsTrigger>
      <TabsTrigger value="analytics" className="data-[state=active]:bg-gaming-red">
        <Icon name="BarChart3" size={16} className="mr-2" />
        Аналитика
      </TabsTrigger>
      <TabsTrigger value="security" className="data-[state=active]:bg-gaming-red">
        <Icon name="Shield" size={16} className="mr-2" />
        Безопасность
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminPanelTabs;