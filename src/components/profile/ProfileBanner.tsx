import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import RoleBadge from '../RoleBadge';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface ProfileBannerProps {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  banner: string;
  userRole: UserRole;
  fileInputRef: React.RefObject<HTMLInputElement>;
  bannerInputRef: React.RefObject<HTMLInputElement>;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBannerUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateRandomAvatar: () => void;
}

const ProfileBanner = ({
  username,
  displayName,
  bio,
  avatar,
  banner,
  userRole,
  fileInputRef,
  bannerInputRef,
  onAvatarUpload,
  onBannerUpload,
  onGenerateRandomAvatar
}: ProfileBannerProps) => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30 overflow-hidden">
      <div 
        className="h-32 bg-gradient-to-r from-gaming-red to-gaming-orange relative group cursor-pointer"
        onClick={() => bannerInputRef.current?.click()}
        style={banner ? { backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Icon name="Camera" size={32} className="text-white" />
        </div>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          onChange={onBannerUpload}
          className="hidden"
        />
      </div>
      <CardContent className="pt-0 px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-16">
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-full border-4 border-gaming-dark overflow-hidden bg-gaming-red cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={avatar} alt={username} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon name="Camera" size={24} className="text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onAvatarUpload}
              className="hidden"
            />
          </div>
          <div className="flex-1 mt-16 md:mt-20">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">{displayName}</h2>
                <p className="text-gray-400">@{username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <RoleBadge role={userRole} size="lg" />
                </div>
              </div>
              <Button
                onClick={onGenerateRandomAvatar}
                variant="outline"
                className="border-gaming-yellow/50 text-gaming-yellow hover:bg-gaming-yellow/10"
              >
                <Icon name="Shuffle" size={16} className="mr-2" />
                Случайный аватар
              </Button>
            </div>
            {bio && (
              <p className="text-gray-300 mt-4">{bio}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBanner;
