import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OBSSettings {
  resolution: string;
  fps: number;
  bitrate: number;
  encoder: string;
  preset: string;
}

interface SettingsTabProps {
  obsSettings: OBSSettings;
  setOBSSettings: (settings: OBSSettings) => void;
  isStreaming: boolean;
}

const SettingsTab = ({ obsSettings, setOBSSettings, isStreaming }: SettingsTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-black/30 border-gaming-yellow/20">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Icon name="Settings" size={20} className="text-gaming-yellow" />
            Настройки кодирования
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Оптимизированы для минимальной нагрузки на систему
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Разрешение</Label>
            <Select
              value={obsSettings.resolution}
              onValueChange={(value) => setOBSSettings({...obsSettings, resolution: value})}
              disabled={isStreaming}
            >
              <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                <SelectItem value="854x480">854x480 (SD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">FPS (кадры в секунду)</Label>
            <Select
              value={obsSettings.fps.toString()}
              onValueChange={(value) => setOBSSettings({...obsSettings, fps: parseInt(value)})}
              disabled={isStreaming}
            >
              <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60 FPS</SelectItem>
                <SelectItem value="30">30 FPS (рекомендуется)</SelectItem>
                <SelectItem value="24">24 FPS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Битрейт (Kbps)</Label>
            <Select
              value={obsSettings.bitrate.toString()}
              onValueChange={(value) => setOBSSettings({...obsSettings, bitrate: parseInt(value)})}
              disabled={isStreaming}
            >
              <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6000">6000 (Высокое качество)</SelectItem>
                <SelectItem value="4500">4500 (Оптимальное)</SelectItem>
                <SelectItem value="2500">2500 (Среднее, рекомендуется)</SelectItem>
                <SelectItem value="1500">1500 (Низкое)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Кодировщик</Label>
            <Select
              value={obsSettings.encoder}
              onValueChange={(value) => setOBSSettings({...obsSettings, encoder: value})}
              disabled={isStreaming}
            >
              <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="x264">x264 (CPU, универсальный)</SelectItem>
                <SelectItem value="nvenc">NVENC (NVIDIA GPU)</SelectItem>
                <SelectItem value="qsv">QuickSync (Intel GPU)</SelectItem>
                <SelectItem value="amf">AMF (AMD GPU)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Пресет кодирования</Label>
            <Select
              value={obsSettings.preset}
              onValueChange={(value) => setOBSSettings({...obsSettings, preset: value})}
              disabled={isStreaming}
            >
              <SelectTrigger className="bg-black/50 border-gaming-yellow/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultrafast">Ultrafast (минимальная нагрузка)</SelectItem>
                <SelectItem value="veryfast">Veryfast (рекомендуется)</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
                <SelectItem value="medium">Medium (лучшее качество)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gaming-yellow/10 border border-gaming-yellow/30 rounded-lg p-4 mt-4">
            <p className="text-white font-bold mb-2">
              <Icon name="Zap" size={18} className="inline mr-2 text-gaming-yellow" />
              Рекомендуемые настройки
            </p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Разрешение: 1280x720 для стабильности</li>
              <li>• FPS: 30 для экономии ресурсов</li>
              <li>• Битрейт: 2500 Kbps</li>
              <li>• Пресет: veryfast</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/30 border-gaming-yellow/20">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Icon name="BookOpen" size={20} className="text-gaming-yellow" />
            Инструкция по настройке OBS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300 text-sm">
          <div>
            <h4 className="text-white font-bold mb-2">1. Настройка вывода в OBS</h4>
            <p>Настройки → Вещание → Выберите "Пользовательский"</p>
            <p className="mt-1 text-gaming-yellow">Сервер: rtmp://localhost:1935/live</p>
            <p className="text-gaming-yellow">Ключ: любое имя (например: mystream)</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">2. Настройка кодирования</h4>
            <p>Настройки → Вывод → Режим вывода: "Расширенный"</p>
            <p className="mt-1">Используйте настройки из этой панели</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">3. Запуск трансляции</h4>
            <p>1. Запустите трансляцию в OBS</p>
            <p>2. Укажите источник: rtmp://localhost:1935/live/mystream</p>
            <p>3. Нажмите "Начать трансляцию" в этой панели</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 font-bold">
              ✓ Вся нагрузка идёт на наши облачные серверы, ваш ПК работает легко!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
