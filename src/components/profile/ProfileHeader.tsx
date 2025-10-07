import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ProfileHeaderProps {
  email: string;
}

const ProfileHeader = ({ email }: ProfileHeaderProps) => {
  return (
    <Card className="bg-gradient-to-r from-gaming-red to-gaming-orange border-gaming-yellow">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-3">
          <Icon name="User" size={28} className="text-gaming-yellow" />
          Личный кабинет
        </CardTitle>
        <CardDescription className="text-white/80">
          Управление профилем и настройками • {email}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProfileHeader;
