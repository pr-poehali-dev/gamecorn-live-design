import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  enabled: boolean;
}

const ContentEditor = () => {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: 'hero',
      title: 'Заголовок главной секции',
      subtitle: 'Подзаголовок',
      content: 'Описание для главной секции',
      imageUrl: '/img/hero-bg.jpg',
      enabled: true
    },
    {
      id: 'about',
      title: 'О стримере',
      content: 'Текст о стримере',
      imageUrl: '/img/avatar.jpg',
      enabled: true
    },
    {
      id: 'schedule',
      title: 'Расписание стримов',
      content: 'Информация о расписании',
      enabled: true
    }
  ]);

  const updateSection = (id: string, field: string, value: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const addSection = () => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      title: 'Новая секция',
      content: '',
      enabled: true
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const saveChanges = () => {
    localStorage.setItem('site_content', JSON.stringify(sections));
    alert('Контент сохранён!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Редактор контента</h2>
        <div className="flex gap-2">
          <Button onClick={addSection} variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить секцию
          </Button>
          <Button onClick={saveChanges} className="bg-gaming-red hover:bg-gaming-red/90">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить всё
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={section.id} className="bg-gaming-dark/90 border-gaming-red/30 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gaming-red">#{index + 1}</span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={(checked) => updateSection(section.id, 'enabled', checked)}
                  />
                  <Label className="text-white">Показывать на сайте</Label>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteSection(section.id)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Заголовок</Label>
                <Input
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white"
                />
              </div>

              {section.subtitle !== undefined && (
                <div>
                  <Label className="text-white">Подзаголовок</Label>
                  <Input
                    value={section.subtitle}
                    onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <Label className="text-white">Контент</Label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                  className="bg-black/50 border-gaming-red/30 text-white min-h-[100px]"
                />
              </div>

              {section.imageUrl !== undefined && (
                <div className="md:col-span-2">
                  <Label className="text-white">URL изображения</Label>
                  <div className="flex gap-2">
                    <Input
                      value={section.imageUrl}
                      onChange={(e) => updateSection(section.id, 'imageUrl', e.target.value)}
                      className="bg-black/50 border-gaming-red/30 text-white"
                      placeholder="/img/your-image.jpg"
                    />
                    <Button variant="outline" size="sm">
                      <Icon name="Upload" size={16} />
                    </Button>
                  </div>
                  {section.imageUrl && (
                    <img 
                      src={section.imageUrl} 
                      alt="Preview" 
                      className="mt-2 h-20 object-cover rounded border border-gaming-red/30"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentEditor;
