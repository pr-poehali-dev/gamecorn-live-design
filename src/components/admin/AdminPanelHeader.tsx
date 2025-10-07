import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AdminPanelHeaderProps {
  userEmail: string;
}

const AdminPanelHeader = ({ userEmail }: AdminPanelHeaderProps) => {
  return (
    <Card className="bg-gradient-to-r from-gaming-red to-gaming-orange border-gaming-yellow">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-3">
          <Icon name="Crown" size={28} className="text-gaming-yellow" />
          Панель администратора
        </CardTitle>
        <CardDescription className="text-white/80">
          Полный доступ к управлению сайтом • {userEmail}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AdminPanelHeader;