import { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ProfileHeader from './profile/ProfileHeader';
import ProfileBanner from './profile/ProfileBanner';
import ProfileEditTab from './profile/ProfileEditTab';
import ProfileStatsCard from './profile/ProfileStatsCard';
import PrivacyTab from './profile/PrivacyTab';
import NotificationsTab from './profile/NotificationsTab';
import SecurityTab from './profile/SecurityTab';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface UserProfileProps {
  username: string;
  userRole: UserRole;
  email: string;
  onUpdate: (data: any) => void;
}

const UserProfile = ({ username: initialUsername, userRole, email, onUpdate }: UserProfileProps) => {
  const [username, setUsername] = useState(initialUsername);
  const [displayName, setDisplayName] = useState(initialUsername);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar, setAvatar] = useState(`https://api.dicebear.com/7.x/avataaars/svg?seed=${initialUsername}`);
  const [banner, setBanner] = useState('');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [streamNotifications, setStreamNotifications] = useState(true);
  const [donationNotifications, setDonationNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(false);
  
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast.success('Аватар обновлен! 🎨');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result as string);
        toast.success('Баннер обновлен! 🖼️');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdate({
      username,
      displayName,
      bio,
      location,
      website,
      avatar,
      banner,
    });
    toast.success('Профиль сохранен! ✅');
  };

  const handleSaveSettings = () => {
    toast.success('Настройки сохранены! ⚙️');
  };

  const handleEnable2FA = (secret: string) => {
    setTwoFactorEnabled(true);
    setTwoFactorSecret(secret);
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setTwoFactorSecret('');
  };

  const handleVerify2FA = (code: string) => {
    return code === '123456';
  };

  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    toast.success('Новый аватар сгенерирован! 🎲');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <ProfileHeader email={email} />

      <ProfileBanner
        banner={banner}
        avatar={avatar}
        username={username}
        displayName={displayName}
        userRole={userRole}
        bio={bio}
        bannerInputRef={bannerInputRef}
        fileInputRef={fileInputRef}
        onBannerUpload={handleBannerUpload}
        onAvatarUpload={handleAvatarUpload}
        onGenerateRandomAvatar={generateRandomAvatar}
      />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/50 p-2">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gaming-red">
            <Icon name="User" size={16} className="mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gaming-red">
            <Icon name="Lock" size={16} className="mr-2" />
            Приватность
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gaming-red">
            <Icon name="Bell" size={16} className="mr-2" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gaming-red">
            <Icon name="Shield" size={16} className="mr-2" />
            Безопасность
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileEditTab
            username={username}
            setUsername={setUsername}
            displayName={displayName}
            setDisplayName={setDisplayName}
            bio={bio}
            setBio={setBio}
            location={location}
            setLocation={setLocation}
            website={website}
            setWebsite={setWebsite}
            onSave={handleSaveProfile}
          />
          <ProfileStatsCard />
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <PrivacyTab
            profileVisibility={profileVisibility}
            setProfileVisibility={setProfileVisibility}
            showEmail={showEmail}
            setShowEmail={setShowEmail}
            showActivity={showActivity}
            setShowActivity={setShowActivity}
            onSave={handleSaveSettings}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationsTab
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            pushNotifications={pushNotifications}
            setPushNotifications={setPushNotifications}
            streamNotifications={streamNotifications}
            setStreamNotifications={setStreamNotifications}
            donationNotifications={donationNotifications}
            setDonationNotifications={setDonationNotifications}
            commentNotifications={commentNotifications}
            setCommentNotifications={setCommentNotifications}
            onSave={handleSaveSettings}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityTab
            twoFactorEnabled={twoFactorEnabled}
            onEnable2FA={handleEnable2FA}
            onDisable2FA={handleDisable2FA}
            onVerify2FA={handleVerify2FA}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
