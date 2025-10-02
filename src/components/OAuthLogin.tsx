import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';

interface OAuthProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  hoverColor: string;
  description: string;
}

interface OAuthLoginProps {
  onSuccess: (userData: { username: string; email: string; avatar?: string; provider: string }) => void;
  onCancel?: () => void;
}

const providers: OAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: 'Mail',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    description: 'Войти через Google аккаунт'
  },
  {
    id: 'vk',
    name: 'ВКонтакте',
    icon: 'MessageCircle',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    description: 'Войти через ВКонтакте'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'Send',
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
    description: 'Войти через Telegram'
  },
  {
    id: 'yandex',
    name: 'Яндекс',
    icon: 'Search',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    description: 'Войти через Яндекс ID'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'MessageSquare',
    color: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700',
    description: 'Войти через Discord'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: 'Twitch',
    color: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700',
    description: 'Войти через Twitch'
  },
  {
    id: 'steam',
    name: 'Steam',
    icon: 'Gamepad2',
    color: 'bg-gray-700',
    hoverColor: 'hover:bg-gray-800',
    description: 'Войти через Steam'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'Github',
    color: 'bg-gray-800',
    hoverColor: 'hover:bg-gray-900',
    description: 'Войти через GitHub'
  }
];

const OAuthLogin = ({ onSuccess, onCancel }: OAuthLoginProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedDataProcessing, setAcceptedDataProcessing] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleOAuthLogin = (provider: OAuthProvider) => {
    if (!acceptedTerms || !acceptedPrivacy || !acceptedDataProcessing) {
      toast.error('Примите все соглашения', {
        description: 'Для продолжения необходимо согласиться с условиями использования и политикой конфиденциальности'
      });
      return;
    }

    toast.loading(`Подключаемся к ${provider.name}...`);

    setTimeout(() => {
      const mockUserData = {
        username: `User_${Math.random().toString(36).substring(7)}`,
        email: `user@${provider.id}.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider.id}`,
        provider: provider.id
      };

      toast.dismiss();
      toast.success(`Вход через ${provider.name} успешен! 🎉`, {
        description: `Добро пожаловать, ${mockUserData.username}!`
      });

      onSuccess(mockUserData);
    }, 1500);
  };

  const allAgreed = acceptedTerms && acceptedPrivacy && acceptedDataProcessing;

  return (
    <Card className="bg-gradient-to-br from-black/90 to-gaming-dark border-gaming-red/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Shield" size={24} className="text-gaming-yellow" />
          Быстрый вход через соцсети
        </CardTitle>
        <CardDescription className="text-gray-400">
          Безопасная авторизация через популярные платформы
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-gaming-red/10 border border-gaming-red/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="Lock" size={16} className="text-gaming-yellow mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-bold text-white mb-1">🔐 Ваша безопасность - наш приоритет</p>
                <ul className="space-y-1 text-xs">
                  <li>• Мы не получаем доступ к вашему паролю</li>
                  <li>• Запрашиваем только базовую информацию (имя, email)</li>
                  <li>• Все данные передаются по защищенному соединению</li>
                  <li>• Соответствие GDPR, 152-ФЗ и другим стандартам</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-0.5 border-gaming-red/50 data-[state=checked]:bg-gaming-yellow data-[state=checked]:border-gaming-yellow"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                Я принимаю{' '}
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-gaming-yellow hover:text-gaming-orange underline"
                >
                  Пользовательское соглашение
                </button>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox
                checked={acceptedPrivacy}
                onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                className="mt-0.5 border-gaming-red/50 data-[state=checked]:bg-gaming-yellow data-[state=checked]:border-gaming-yellow"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                Я согласен с{' '}
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-gaming-yellow hover:text-gaming-orange underline"
                >
                  Политикой конфиденциальности
                </button>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox
                checked={acceptedDataProcessing}
                onCheckedChange={(checked) => setAcceptedDataProcessing(checked as boolean)}
                className="mt-0.5 border-gaming-red/50 data-[state=checked]:bg-gaming-yellow data-[state=checked]:border-gaming-yellow"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                Я даю согласие на обработку персональных данных в соответствии с 152-ФЗ РФ
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {providers.map((provider) => (
            <Button
              key={provider.id}
              onClick={() => handleOAuthLogin(provider)}
              disabled={!allAgreed}
              className={`${provider.color} ${provider.hoverColor} text-white font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              title={provider.description}
            >
              <Icon name={provider.icon as any} size={18} className="mr-2" />
              {provider.name}
            </Button>
          ))}
        </div>

        {!allAgreed && (
          <p className="text-gaming-yellow text-sm text-center animate-pulse">
            Примите все соглашения выше для продолжения
          </p>
        )}

        <div className="border-t border-gaming-red/30 pt-4">
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
            <p>
              При входе через соцсети мы получаем только ваше имя и email. Никакая другая информация не запрашивается и не хранится. Вы можете удалить свой аккаунт в любой момент.
            </p>
          </div>
        </div>

        {onCancel && (
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full border-gaming-red/30 hover:bg-gaming-red/10 text-white"
          >
            Вернуться к обычному входу
          </Button>
        )}
      </CardContent>

      <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
        <DialogContent className="bg-gray-900 border-gaming-red/30 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Shield" size={24} className="text-gaming-yellow" />
              Политика конфиденциальности
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Действует с 1 января 2024 года
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-300">
            <section>
              <h3 className="font-bold text-white mb-2">1. Общие положения</h3>
              <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса GameCorn Live.</p>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">2. Какие данные мы собираем</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Имя пользователя</li>
                <li>Email адрес</li>
                <li>Аватар (при входе через соцсети)</li>
                <li>IP-адрес (для безопасности)</li>
                <li>Cookies для улучшения работы сайта</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">3. Как мы используем данные</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Аутентификация и авторизация</li>
                <li>Персонализация контента</li>
                <li>Связь с пользователем (уведомления, новости)</li>
                <li>Аналитика и улучшение сервиса</li>
                <li>Защита от мошенничества</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">4. Защита данных</h3>
              <p>Мы используем современные методы шифрования и защиты данных:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>SSL/TLS шифрование</li>
                <li>Безопасное хранение в защищенных базах данных</li>
                <li>Регулярные проверки безопасности</li>
                <li>Ограниченный доступ к данным</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">5. Передача данных третьим лицам</h3>
              <p>Мы НЕ продаем и НЕ передаем ваши данные третьим лицам, кроме случаев:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>С вашего явного согласия</li>
                <li>По требованию закона</li>
                <li>Для работы платежных систем (только необходимый минимум)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">6. Ваши права</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Доступ к своим данным</li>
                <li>Исправление неточных данных</li>
                <li>Удаление аккаунта и всех данных</li>
                <li>Отзыв согласия на обработку</li>
                <li>Экспорт ваших данных</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">7. Cookies</h3>
              <p>Мы используем cookies для:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Сохранения сессии входа</li>
                <li>Запоминания настроек</li>
                <li>Аналитики (анонимной)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">8. Соответствие законодательству</h3>
              <p>Мы соблюдаем:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>152-ФЗ "О персональных данных" (РФ)</li>
                <li>GDPR (Европейский союз)</li>
                <li>CCPA (Калифорния, США)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">9. Контакты</h3>
              <p>По вопросам конфиденциальности: <span className="text-gaming-yellow">privacy@gamecorn.live</span></p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="bg-gray-900 border-gaming-red/30 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} className="text-gaming-yellow" />
              Пользовательское соглашение
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Действует с 1 января 2024 года
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-300">
            <section>
              <h3 className="font-bold text-white mb-2">1. Общие условия</h3>
              <p>Используя сервис GameCorn Live, вы соглашаетесь с настоящими условиями использования.</p>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">2. Учетная запись</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Вы обязаны предоставлять достоверную информацию</li>
                <li>Не передавать доступ к аккаунту третьим лицам</li>
                <li>Сохранять конфиденциальность данных для входа</li>
                <li>Незамедлительно сообщать о компрометации аккаунта</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">3. Правила поведения</h3>
              <p>Запрещается:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Публикация оскорбительного контента</li>
                <li>Спам и реклама без разрешения</li>
                <li>Попытки взлома и атак на систему</li>
                <li>Нарушение прав других пользователей</li>
                <li>Размещение запрещенного законом контента</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">4. Интеллектуальная собственность</h3>
              <p>Весь контент сервиса защищен авторским правом. Использование без разрешения запрещено.</p>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">5. Донаты и платежи</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Все платежи добровольные</li>
                <li>Возврат средств возможен в течение 14 дней</li>
                <li>При нарушении правил доступ может быть заблокирован</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">6. Ограничение ответственности</h3>
              <p>Сервис предоставляется "как есть". Мы не несем ответственности за:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Технические сбои</li>
                <li>Потерю данных</li>
                <li>Действия других пользователей</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">7. Изменения условий</h3>
              <p>Мы оставляем за собой право изменять условия. Уведомление за 7 дней до вступления в силу.</p>
            </section>

            <section>
              <h3 className="font-bold text-white mb-2">8. Контакты</h3>
              <p>Служба поддержки: <span className="text-gaming-yellow">support@gamecorn.live</span></p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default OAuthLogin;
