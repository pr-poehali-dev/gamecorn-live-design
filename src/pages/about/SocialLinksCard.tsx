import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  followers?: string;
  enabled: boolean;
}

interface SocialLinksCardProps {
  socialLinks: SocialLink[];
  showSettings: boolean;
  canManageSettings: boolean;
  editingSocial: string | null;
  editSocialUrl: string;
  setEditingSocial: (id: string | null) => void;
  setEditSocialUrl: (url: string) => void;
  onToggleLink: (id: string) => void;
  onSaveUrl: (id: string) => void;
}

const SocialLinksCard = ({
  socialLinks,
  showSettings,
  canManageSettings,
  editingSocial,
  editSocialUrl,
  setEditingSocial,
  setEditSocialUrl,
  onToggleLink,
  onSaveUrl
}: SocialLinksCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-gaming-yellow/10 to-gaming-orange/10 border-gaming-yellow/30">
      <CardHeader>
        <CardTitle className="text-gradient-fire flex items-center gap-2">
          <Icon name="Share2" size={24} />
          Социальные сети
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {socialLinks
          .filter((link) => showSettings || link.enabled)
          .map((link) => (
            <div key={link.id}>
              {editingSocial === link.id && showSettings ? (
                <div className="space-y-2 p-3 bg-black/30 rounded-lg border border-gaming-yellow/30">
                  <Label className="text-white text-sm">Редактировать ссылку</Label>
                  <Input
                    value={editSocialUrl}
                    onChange={(e) => setEditSocialUrl(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onSaveUrl(link.id)}
                      size="sm"
                      className="flex-1 bg-gaming-yellow hover:bg-gaming-yellow/80 text-black"
                    >
                      <Icon name="Save" size={14} className="mr-1" />
                      Сохранить
                    </Button>
                    <Button
                      onClick={() => setEditingSocial(null)}
                      size="sm"
                      variant="outline"
                      className="border-gaming-red/30 text-white"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 rounded-lg border transition-all ${
                    link.enabled
                      ? 'bg-black/30 border-gaming-red/30 hover:border-gaming-yellow/50 hover:scale-105'
                      : 'bg-black/10 border-gray-600/30 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: link.color }}
                      >
                        <Icon name={link.icon} size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">{link.platform}</div>
                        {link.followers && (
                          <div className="text-gaming-yellow text-sm">
                            {link.followers} подписчиков
                          </div>
                        )}
                      </div>
                    </div>
                    {showSettings && canManageSettings && (
                      <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                        <Button
                          onClick={() => {
                            setEditingSocial(link.id);
                            setEditSocialUrl(link.url);
                          }}
                          size="sm"
                          variant="ghost"
                          className="text-white hover:text-gaming-yellow"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Switch
                          checked={link.enabled}
                          onCheckedChange={() => onToggleLink(link.id)}
                        />
                      </div>
                    )}
                  </div>
                </a>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default SocialLinksCard;
