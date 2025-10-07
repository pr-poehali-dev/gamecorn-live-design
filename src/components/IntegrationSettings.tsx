import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IntegrationSettings = () => {
  const [youtubeEnabled, setYoutubeEnabled] = useState(true);
  const [youtubeChannelId, setYoutubeChannelId] = useState('');
  const [youtubeApiKey, setYoutubeApiKey] = useState('');

  const [twitchEnabled, setTwitchEnabled] = useState(true);
  const [twitchUsername, setTwitchUsername] = useState('');
  const [twitchClientId, setTwitchClientId] = useState('');

  const [vkEnabled, setVkEnabled] = useState(false);
  const [vkGroupId, setVkGroupId] = useState('');
  const [vkAccessToken, setVkAccessToken] = useState('');

  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [discordWebhook, setDiscordWebhook] = useState('');
  const [discordServerId, setDiscordServerId] = useState('');

  const [donationAlertsEnabled, setDonationAlertsEnabled] = useState(false);
  const [donationAlertsToken, setDonationAlertsToken] = useState('');

  const [streamElementsEnabled, setStreamElementsEnabled] = useState(false);
  const [streamElementsToken, setStreamElementsToken] = useState('');

  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');

  const saveIntegrations = () => {
    const integrations = {
      youtube: { enabled: youtubeEnabled, channelId: youtubeChannelId, apiKey: youtubeApiKey },
      twitch: { enabled: twitchEnabled, username: twitchUsername, clientId: twitchClientId },
      vk: { enabled: vkEnabled, groupId: vkGroupId, accessToken: vkAccessToken },
      discord: { enabled: discordEnabled, webhook: discordWebhook, serverId: discordServerId },
      donationAlerts: { enabled: donationAlertsEnabled, token: donationAlertsToken },
      streamElements: { enabled: streamElementsEnabled, token: streamElementsToken },
      telegram: { enabled: telegramEnabled, botToken: telegramBotToken, chatId: telegramChatId }
    };
    localStorage.setItem('site_integrations', JSON.stringify(integrations));
    alert('Интеграции сохранены!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Интеграции</h2>
        <Button onClick={saveIntegrations} className="bg-gaming-red hover:bg-gaming-red/90">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить все
        </Button>
      </div>

      <Tabs defaultValue="streaming" className="w-full">
        <TabsList className="grid grid-cols-3 bg-black/50">
          <TabsTrigger value="streaming" className="data-[state=active]:bg-gaming-red">
            <Icon name="Tv" size={16} className="mr-2" />
            Стриминг
          </TabsTrigger>
          <TabsTrigger value="donations" className="data-[state=active]:bg-gaming-red">
            <Icon name="DollarSign" size={16} className="mr-2" />
            Донаты
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-gaming-red">
            <Icon name="Share2" size={16} className="mr-2" />
            Соцсети
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streaming" className="space-y-4">
          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded">
                  <Icon name="Youtube" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">YouTube</h3>
                  <p className="text-sm text-gray-400">Интеграция с YouTube Gaming</p>
                </div>
              </div>
              <Switch checked={youtubeEnabled} onCheckedChange={setYoutubeEnabled} />
            </div>
            {youtubeEnabled && (
              <div className="space-y-3 mt-4 pt-4 border-t border-gaming-red/20">
                <div>
                  <Label className="text-white">ID канала</Label>
                  <Input
                    value={youtubeChannelId}
                    onChange={(e) => setYoutubeChannelId(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="UCxxxxxxxxxxxxx"
                  />
                </div>
                <div>
                  <Label className="text-white">API ключ</Label>
                  <Input
                    type="password"
                    value={youtubeApiKey}
                    onChange={(e) => setYoutubeApiKey(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="AIzaSy..."
                  />
                </div>
              </div>
            )}
          </Card>

          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 p-2 rounded">
                  <Icon name="Twitch" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Twitch</h3>
                  <p className="text-sm text-gray-400">Интеграция с Twitch</p>
                </div>
              </div>
              <Switch checked={twitchEnabled} onCheckedChange={setTwitchEnabled} />
            </div>
            {twitchEnabled && (
              <div className="space-y-3 mt-4 pt-4 border-t border-gaming-red/20">
                <div>
                  <Label className="text-white">Имя пользователя</Label>
                  <Input
                    value={twitchUsername}
                    onChange={(e) => setTwitchUsername(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="username"
                  />
                </div>
                <div>
                  <Label className="text-white">Client ID</Label>
                  <Input
                    type="password"
                    value={twitchClientId}
                    onChange={(e) => setTwitchClientId(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="xxxxxxxxxxxxx"
                  />
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 p-2 rounded">
                  <Icon name="DollarSign" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Donation Alerts</h3>
                  <p className="text-sm text-gray-400">Система донатов</p>
                </div>
              </div>
              <Switch checked={donationAlertsEnabled} onCheckedChange={setDonationAlertsEnabled} />
            </div>
            {donationAlertsEnabled && (
              <div className="mt-4 pt-4 border-t border-gaming-red/20">
                <Label className="text-white">Access Token</Label>
                <Input
                  type="password"
                  value={donationAlertsToken}
                  onChange={(e) => setDonationAlertsToken(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                  placeholder="Токен доступа"
                />
              </div>
            )}
          </Card>

          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">StreamElements</h3>
                  <p className="text-sm text-gray-400">Алерты и виджеты</p>
                </div>
              </div>
              <Switch checked={streamElementsEnabled} onCheckedChange={setStreamElementsEnabled} />
            </div>
            {streamElementsEnabled && (
              <div className="mt-4 pt-4 border-t border-gaming-red/20">
                <Label className="text-white">JWT Token</Label>
                <Input
                  type="password"
                  value={streamElementsToken}
                  onChange={(e) => setStreamElementsToken(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                  placeholder="eyJhbGciOi..."
                />
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded">
                  <Icon name="MessageCircle" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">VK</h3>
                  <p className="text-sm text-gray-400">Интеграция с ВКонтакте</p>
                </div>
              </div>
              <Switch checked={vkEnabled} onCheckedChange={setVkEnabled} />
            </div>
            {vkEnabled && (
              <div className="space-y-3 mt-4 pt-4 border-t border-gaming-red/20">
                <div>
                  <Label className="text-white">ID группы</Label>
                  <Input
                    value={vkGroupId}
                    onChange={(e) => setVkGroupId(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="123456789"
                  />
                </div>
                <div>
                  <Label className="text-white">Access Token</Label>
                  <Input
                    type="password"
                    value={vkAccessToken}
                    onChange={(e) => setVkAccessToken(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
              </div>
            )}
          </Card>

          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded">
                  <Icon name="MessageSquare" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Discord</h3>
                  <p className="text-sm text-gray-400">Уведомления в Discord</p>
                </div>
              </div>
              <Switch checked={discordEnabled} onCheckedChange={setDiscordEnabled} />
            </div>
            {discordEnabled && (
              <div className="space-y-3 mt-4 pt-4 border-t border-gaming-red/20">
                <div>
                  <Label className="text-white">Webhook URL</Label>
                  <Input
                    value={discordWebhook}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="https://discord.com/api/webhooks/..."
                  />
                </div>
                <div>
                  <Label className="text-white">Server ID</Label>
                  <Input
                    value={discordServerId}
                    onChange={(e) => setDiscordServerId(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="123456789012345678"
                  />
                </div>
              </div>
            )}
          </Card>

          <Card className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-400 p-2 rounded">
                  <Icon name="Send" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Telegram</h3>
                  <p className="text-sm text-gray-400">Бот для уведомлений</p>
                </div>
              </div>
              <Switch checked={telegramEnabled} onCheckedChange={setTelegramEnabled} />
            </div>
            {telegramEnabled && (
              <div className="space-y-3 mt-4 pt-4 border-t border-gaming-red/20">
                <div>
                  <Label className="text-white">Bot Token</Label>
                  <Input
                    type="password"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                  />
                </div>
                <div>
                  <Label className="text-white">Chat ID</Label>
                  <Input
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="-1001234567890"
                  />
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationSettings;
