import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GeneralSettingsProps {
  siteName: string;
  setSiteName: (value: string) => void;
  siteDescription: string;
  setSiteDescription: (value: string) => void;
  maxViewers: string;
  setMaxViewers: (value: string) => void;
  donationMin: string;
  setDonationMin: (value: string) => void;
  onSave: () => void;
}

const GeneralSettings = ({
  siteName,
  setSiteName,
  siteDescription,
  setSiteDescription,
  maxViewers,
  setMaxViewers,
  donationMin,
  setDonationMin,
  onSave
}: GeneralSettingsProps) => {
  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Globe" size={20} className="text-gaming-yellow" />
          Основные настройки сайта
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-white mb-2 block">Название сайта</Label>
          <Input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="bg-black/50 border-gaming-red/30 text-white"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Описание</Label>
          <Textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            className="bg-black/50 border-gaming-red/30 text-white"
            rows={3}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block">Макс. зрителей онлайн</Label>
            <Input
              type="number"
              value={maxViewers}
              onChange={(e) => setMaxViewers(e.target.value)}
              className="bg-black/50 border-gaming-red/30 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Мин. сумма доната (₽)</Label>
            <Input
              type="number"
              value={donationMin}
              onChange={(e) => setDonationMin(e.target.value)}
              className="bg-black/50 border-gaming-red/30 text-white"
            />
          </div>
        </div>

        <Button
          onClick={onSave}
          className="w-full bg-gradient-to-r from-gaming-red to-gaming-orange hover:from-gaming-red/80 hover:to-gaming-orange/80 text-white font-bold"
        >
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить настройки
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
