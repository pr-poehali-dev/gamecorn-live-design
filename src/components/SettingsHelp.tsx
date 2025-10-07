import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const SettingsHelp = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="HelpCircle" size={24} className="text-blue-400" />
          Справка по настройкам
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid grid-cols-3 bg-black/50">
            <TabsTrigger value="global">Глобальные</TabsTrigger>
            <TabsTrigger value="about">О нас</TabsTrigger>
            <TabsTrigger value="tips">Советы</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-3 mt-4">
            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Icon name="Globe" size={16} className="text-blue-400" />
                Глобальные настройки
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Применяются ко всему сайту</li>
                <li>• Хранятся в localStorage браузера</li>
                <li>• Доступны через Админ-панель → вкладка "Глобальные"</li>
              </ul>
            </div>

            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-white font-bold mb-2">Разделы:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><strong>Общие:</strong> название, описание, сообщения</li>
                <li><strong>Внешний вид:</strong> цвета темы</li>
                <li><strong>Функции:</strong> вкл/выкл разделов сайта</li>
              </ul>
            </div>

            <div className="bg-red-500/20 rounded-lg p-3 border border-red-500/30">
              <p className="text-white font-bold text-sm">
                <Icon name="AlertTriangle" size={14} className="inline mr-2 text-red-500" />
                Режим обслуживания
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Закрывает сайт для посетителей. Только владелец имеет доступ.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-3 mt-4">
            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Icon name="User" size={16} className="text-blue-400" />
                Страница "О нас"
              </h4>
              <p className="text-sm text-gray-300 mb-2">
                Перейдите на /about → Войти → Управление
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-white font-bold mb-2">Вкладки:</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>
                  <strong>👤 Владелец:</strong><br/>
                  Аватар, имя, описание, контакты
                </li>
                <li>
                  <strong>🔗 Соцсети:</strong><br/>
                  Добавление/удаление соцсетей, изменение ссылок
                </li>
                <li>
                  <strong>⚙️ Настройки:</strong><br/>
                  Включение/выключение функций страниц
                </li>
              </ul>
            </div>

            <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/30">
              <p className="text-white font-bold text-sm">
                <Icon name="CheckCircle" size={14} className="inline mr-2 text-green-500" />
                Автосохранение
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Изменения в соцсетях сохраняются автоматически!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-3 mt-4">
            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Icon name="Lightbulb" size={16} className="text-yellow-400" />
                Полезные советы
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>
                  <strong>💾 Резервные копии:</strong><br/>
                  Экспортируйте настройки перед большими изменениями
                </li>
                <li>
                  <strong>🎨 Цвета:</strong><br/>
                  После изменения цветов обновите страницу (F5)
                </li>
                <li>
                  <strong>📱 Соцсети:</strong><br/>
                  18 иконок на выбор для любых платформ
                </li>
                <li>
                  <strong>🔄 Сброс:</strong><br/>
                  Кнопка "Сбросить" вернет настройки по умолчанию
                </li>
              </ul>
            </div>

            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-white font-bold mb-2">Горячие клавиши:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <kbd className="bg-black/50 px-2 py-1 rounded text-xs">F5</kbd> - обновить страницу</li>
                <li>• <kbd className="bg-black/50 px-2 py-1 rounded text-xs">Ctrl+S</kbd> - сохранить (в форме)</li>
                <li>• <kbd className="bg-black/50 px-2 py-1 rounded text-xs">F12</kbd> - консоль разработчика</li>
              </ul>
            </div>

            <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
              <p className="text-white font-bold text-sm mb-2">
                <Icon name="BookOpen" size={14} className="inline mr-2 text-blue-400" />
                Полная документация
              </p>
              <p className="text-xs text-gray-300">
                Подробное руководство доступно в файле SETTINGS_GUIDE.md
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsHelp;
