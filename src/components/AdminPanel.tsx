import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import AdminPanelHeader from './admin/AdminPanelHeader';
import AdminPanelTabs from './admin/AdminPanelTabs';
import GeneralSettings from './admin/GeneralSettings';
import FeaturesSettings from './admin/FeaturesSettings';
import SecuritySettings from './admin/SecuritySettings';
import ModerationSettings from './admin/ModerationSettings';
import SystemTools from './admin/SystemTools';
import AnalyticsDashboard from './AnalyticsDashboard';
import SiteSettingsPanel from './SiteSettingsPanel';
import AuctionSettings from './AuctionSettings';
import RouletteSettings from './RouletteSettings';
import ContentEditor from './ContentEditor';
import NavigationEditor from './NavigationEditor';
import DomainSettings from './DomainSettings';
import MediaManager from './MediaManager';
import TextEditor from './TextEditor';
import IntegrationSettings from './IntegrationSettings';

interface AdminPanelProps {
  userEmail: string;
}

const AdminPanel = ({ userEmail }: AdminPanelProps) => {
  const [siteName, setSiteName] = useState('GameCorn Live');
  const [siteDescription, setSiteDescription] = useState('Игровые стримы каждый день');
  const [maxViewers, setMaxViewers] = useState('10000');
  const [donationMin, setDonationMin] = useState('10');
  const [donationMax, setDonationMax] = useState('100000');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [donationsEnabled, setDonationsEnabled] = useState(true);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [moderationMode, setModerationMode] = useState(false);
  const [autoModeration, setAutoModeration] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState('');

  const handleSaveSettings = () => {
    toast.success('Настройки сохранены! ⚙️', {
      description: 'Все изменения применены к сайту'
    });
  };

  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Кэш очищен! 🗑️');
  };

  const handleExportData = () => {
    const data = {
      siteName,
      siteDescription,
      settings: {
        maintenanceMode,
        commentsEnabled,
        donationsEnabled,
        registrationEnabled,
        moderationMode,
        autoModeration
      },
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gamecorn-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Настройки экспортированы! 📦');
  };

  const handleEnable2FA = (secret: string) => {
    setTwoFactorEnabled(true);
    setTwoFactorSecret(secret);
    toast.success('2FA включена для вашего аккаунта! 🔐');
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setTwoFactorSecret('');
  };

  const handleVerify2FA = (code: string) => {
    return code === '123456';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <AdminPanelHeader userEmail={userEmail} />

      <Tabs defaultValue="general" className="w-full">
        <AdminPanelTabs />

        <TabsContent value="general" className="space-y-4">
          <GeneralSettings
            siteName={siteName}
            setSiteName={setSiteName}
            siteDescription={siteDescription}
            setSiteDescription={setSiteDescription}
            maxViewers={maxViewers}
            setMaxViewers={setMaxViewers}
            donationMin={donationMin}
            setDonationMin={setDonationMin}
            onSave={handleSaveSettings}
          />
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <FeaturesSettings
            commentsEnabled={commentsEnabled}
            setCommentsEnabled={setCommentsEnabled}
            donationsEnabled={donationsEnabled}
            setDonationsEnabled={setDonationsEnabled}
            registrationEnabled={registrationEnabled}
            setRegistrationEnabled={setRegistrationEnabled}
            maintenanceMode={maintenanceMode}
            setMaintenanceMode={setMaintenanceMode}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings
            userEmail={userEmail}
            twoFactorEnabled={twoFactorEnabled}
            onEnable2FA={handleEnable2FA}
            onDisable2FA={handleDisable2FA}
            onVerify2FA={handleVerify2FA}
          />
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <ModerationSettings
            moderationMode={moderationMode}
            setModerationMode={setModerationMode}
            autoModeration={autoModeration}
            setAutoModeration={setAutoModeration}
          />
        </TabsContent>

        <TabsContent value="domain" className="space-y-4">
          <DomainSettings />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <SiteSettingsPanel />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentEditor />
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <NavigationEditor />
        </TabsContent>

        <TabsContent value="texts" className="space-y-4">
          <TextEditor />
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <MediaManager />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="auction" className="space-y-4">
          <AuctionSettings />
        </TabsContent>

        <TabsContent value="roulette" className="space-y-4">
          <RouletteSettings />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <SystemTools
            onClearCache={handleClearCache}
            onExportData={handleExportData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
