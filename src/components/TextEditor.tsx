import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TextElement {
  id: string;
  location: string;
  label: string;
  value: string;
  type: 'title' | 'subtitle' | 'button' | 'description' | 'label';
}

const TextEditor = () => {
  const [texts, setTexts] = useState<TextElement[]>([
    { id: '1', location: 'Главная', label: 'Заголовок Hero', value: 'Добро пожаловать на GameCorn Live', type: 'title' },
    { id: '2', location: 'Главная', label: 'Подзаголовок Hero', value: 'Лучшие стримы и развлечения', type: 'subtitle' },
    { id: '3', location: 'Главная', label: 'Кнопка "Смотреть"', value: 'Смотреть стрим', type: 'button' },
    { id: '4', location: 'Главная', label: 'Кнопка "Донат"', value: 'Поддержать стримера', type: 'button' },
    { id: '5', location: 'Аукцион', label: 'Заголовок страницы', value: 'Аукцион привилегий', type: 'title' },
    { id: '6', location: 'Аукцион', label: 'Описание', value: 'Делай ставки и побеждай!', type: 'description' },
    { id: '7', location: 'Рулетка', label: 'Заголовок', value: 'Рулетка призов', type: 'title' },
    { id: '8', location: 'Подписка', label: 'Заголовок', value: 'Стань подписчиком', type: 'title' },
    { id: '9', location: 'Подписка', label: 'Описание преимуществ', value: 'Получи эксклюзивные привилегии', type: 'description' },
    { id: '10', location: 'Футер', label: 'Копирайт', value: '© 2025 GameCorn Live. Все права защищены', type: 'label' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Все');

  const locations = ['Все', ...new Set(texts.map(t => t.location))];

  const filteredTexts = texts.filter(text => {
    const matchesSearch = text.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         text.value.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'Все' || text.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const updateText = (id: string, value: string) => {
    setTexts(texts.map(text => text.id === id ? { ...text, value } : text));
  };

  const saveTexts = () => {
    localStorage.setItem('site_texts', JSON.stringify(texts));
    alert('Тексты сохранены!');
  };

  const exportTexts = () => {
    const dataStr = JSON.stringify(texts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-texts.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Редактор текстов</h2>
        <div className="flex gap-2">
          <Button onClick={exportTexts} variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          <Button onClick={saveTexts} className="bg-gaming-red hover:bg-gaming-red/90">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <Card className="bg-gaming-dark/90 border-gaming-red/30 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Поиск</Label>
            <Input
              placeholder="Найти текст..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 border-gaming-red/30 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Фильтр по локации</Label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-black/50 border border-gaming-red/30 text-white rounded-md px-3 py-2"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {filteredTexts.map((text) => (
          <Card key={text.id} className="bg-gaming-dark/90 border-gaming-red/30 p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-gaming-red/20 text-gaming-red px-2 py-1 rounded">
                    {text.location}
                  </span>
                  <span className="text-xs bg-gaming-purple/20 text-gaming-purple px-2 py-1 rounded">
                    {text.type}
                  </span>
                </div>
                <Label className="text-white font-bold">{text.label}</Label>
              </div>
              <div className="md:col-span-9">
                {text.type === 'description' ? (
                  <Textarea
                    value={text.value}
                    onChange={(e) => updateText(text.id, e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    rows={3}
                  />
                ) : (
                  <Input
                    value={text.value}
                    onChange={(e) => updateText(text.id, e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTexts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Тексты не найдены</p>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
