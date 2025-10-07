import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OwnerInfo {
  name: string;
  realName: string;
  avatar: string;
  description: string;
  email: string;
  location: string;
  joinDate: string;
}

interface OwnerCardProps {
  ownerInfo: OwnerInfo;
  showSettings: boolean;
  canManageSettings: boolean;
  editName: string;
  setEditName: (value: string) => void;
  editRealName: string;
  setEditRealName: (value: string) => void;
  editDescription: string;
  setEditDescription: (value: string) => void;
  editEmail: string;
  setEditEmail: (value: string) => void;
  onSave: () => void;
}

const OwnerCard = ({
  ownerInfo,
  showSettings,
  canManageSettings,
  editName,
  setEditName,
  editRealName,
  setEditRealName,
  editDescription,
  setEditDescription,
  editEmail,
  setEditEmail,
  onSave
}: OwnerCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-gradient-fire flex items-center gap-2">
          <Icon name="Crown" size={24} />
          Владелец канала
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-6">
          <img
            src={ownerInfo.avatar}
            alt={ownerInfo.name}
            className="w-32 h-32 rounded-full border-4 border-gaming-yellow shadow-lg shadow-gaming-yellow/50"
          />
          <div className="flex-1 space-y-3">
            {showSettings && canManageSettings ? (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Никнейм</Label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Настоящее имя</Label>
                  <Input
                    value={editRealName}
                    onChange={(e) => setEditRealName(e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-black text-white">
                  {ownerInfo.name}
                </h2>
                <p className="text-gaming-yellow text-lg font-medium">
                  {ownerInfo.realName}
                </p>
              </>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gaming-yellow text-black font-bold">
                <Icon name="MapPin" size={12} className="mr-1" />
                {ownerInfo.location}
              </Badge>
              <Badge className="bg-gaming-red text-white font-bold">
                <Icon name="Calendar" size={12} className="mr-1" />
                С {ownerInfo.joinDate}
              </Badge>
              <Badge className="bg-gaming-orange text-white font-bold">
                <Icon name="Mail" size={12} className="mr-1" />
                {ownerInfo.email}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {showSettings && canManageSettings ? (
            <>
              <Label className="text-white">Описание</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="bg-black/50 border-gaming-red/30 text-white"
                rows={4}
              />
              <div className="space-y-2">
                <Label className="text-white">Email для связи</Label>
                <Input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                />
              </div>
              <Button
                onClick={onSave}
                className="w-full bg-gaming-yellow hover:bg-gaming-yellow/80 text-black font-bold"
              >
                <Icon name="Save" className="mr-2" size={18} />
                Сохранить изменения
              </Button>
            </>
          ) : (
            <p className="text-gray-300 text-lg leading-relaxed">
              {ownerInfo.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerCard;
