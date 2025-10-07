import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ContactCardProps {
  email: string;
  location: string;
}

const ContactCard = ({ email, location }: ContactCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-gaming-red/10 to-gaming-orange/10 border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Mail" size={20} className="text-gaming-yellow" />
          Связаться с нами
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-gaming-red/20 transition-all"
        >
          <Icon name="Mail" size={20} className="text-gaming-yellow" />
          <span className="text-white">{email}</span>
        </a>
        <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
          <Icon name="MapPin" size={20} className="text-gaming-yellow" />
          <span className="text-white">{location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
