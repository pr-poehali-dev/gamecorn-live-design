import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AboutNavigationProps {
  isLoggedIn: boolean;
  canManageSettings: boolean;
  showSettings: boolean;
  onToggleSettings: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const AboutNavigation = ({
  isLoggedIn,
  canManageSettings,
  showSettings,
  onToggleSettings,
  onLogin,
  onLogout
}: AboutNavigationProps) => {
  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-gaming-red/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <Icon name="ArrowLeft" size={24} className="text-gaming-yellow" />
              <span className="text-white font-bold">Назад</span>
            </a>
            <div className="h-8 w-px bg-gaming-red/30" />
            <div>
              <h1 className="text-2xl font-black text-gradient-fire">О НАС</h1>
              <p className="text-gaming-yellow text-xs font-medium">
                Информация о канале и владельце
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {canManageSettings && (
                  <Button
                    onClick={onToggleSettings}
                    variant="outline"
                    className="border-gaming-yellow/50 text-white hover:bg-gaming-yellow/20"
                  >
                    <Icon
                      name={showSettings ? 'EyeOff' : 'Settings'}
                      className="mr-2"
                      size={18}
                    />
                    {showSettings ? 'Скрыть настройки' : 'Управление'}
                  </Button>
                )}
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-gaming-red/50 text-white hover:bg-gaming-red/20"
                >
                  <Icon name="LogOut" className="mr-2" size={18} />
                  Выйти
                </Button>
              </>
            ) : (
              <Button
                onClick={onLogin}
                className="bg-gradient-to-r from-gaming-yellow to-gaming-orange hover:from-gaming-yellow/80 hover:to-gaming-orange/80 text-black font-bold"
              >
                <Icon name="User" className="mr-2" size={20} />
                ВОЙТИ
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AboutNavigation;
