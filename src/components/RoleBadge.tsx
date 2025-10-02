import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md';
}

const RoleBadge = ({ role, size = 'sm' }: RoleBadgeProps) => {
  const iconSize = size === 'sm' ? 12 : 16;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const roleConfig = {
    owner: {
      icon: 'Crown',
      label: 'ВЛАДЕЛЕЦ',
      className: 'bg-gradient-to-r from-gaming-yellow to-gaming-orange text-black font-bold border-gaming-yellow',
    },
    moderator: {
      icon: 'Shield',
      label: 'МОДЕР',
      className: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold border-green-400',
    },
    vip: {
      icon: 'Star',
      label: 'VIP',
      className: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold border-purple-400',
    },
    subscriber: {
      icon: 'Gem',
      label: 'SUB',
      className: 'bg-gradient-to-r from-gaming-red to-red-600 text-white font-bold border-gaming-red',
    },
    viewer: {
      icon: '',
      label: '',
      className: '',
    },
  };

  const config = roleConfig[role];

  if (role === 'viewer') {
    return null;
  }

  return (
    <Badge className={`${config.className} ${padding} inline-flex items-center gap-1 shadow-lg animate-glow`}>
      <Icon name={config.icon} size={iconSize} />
      {config.label}
    </Badge>
  );
};

export default RoleBadge;
