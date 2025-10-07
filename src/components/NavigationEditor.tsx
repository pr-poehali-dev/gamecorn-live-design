import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  enabled: boolean;
  order: number;
}

const NavigationEditor = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', label: 'Главная', url: '/', icon: 'Home', enabled: true, order: 1 },
    { id: '2', label: 'Стримы', url: '/streams', icon: 'Tv', enabled: true, order: 2 },
    { id: '3', label: 'Аукцион', url: '/auction', icon: 'Gavel', enabled: true, order: 3 },
    { id: '4', label: 'Рулетка', url: '/roulette', icon: 'Disc', enabled: true, order: 4 },
    { id: '5', label: 'Подписка', url: '/subscribe', icon: 'Star', enabled: true, order: 5 },
  ]);

  const updateMenuItem = (id: string, field: keyof MenuItem, value: any) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      label: 'Новый пункт',
      url: '/new',
      icon: 'Link',
      enabled: true,
      order: menuItems.length + 1
    };
    setMenuItems([...menuItems, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...menuItems];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    newItems.forEach((item, i) => item.order = i + 1);
    setMenuItems(newItems);
  };

  const moveDown = (index: number) => {
    if (index === menuItems.length - 1) return;
    const newItems = [...menuItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    newItems.forEach((item, i) => item.order = i + 1);
    setMenuItems(newItems);
  };

  const saveMenu = () => {
    localStorage.setItem('site_navigation', JSON.stringify(menuItems));
    alert('Навигация сохранена!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Редактор навигации</h2>
        <div className="flex gap-2">
          <Button onClick={addMenuItem} variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить пункт
          </Button>
          <Button onClick={saveMenu} className="bg-gaming-red hover:bg-gaming-red/90">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <Card key={item.id} className="bg-gaming-dark/90 border-gaming-red/30 p-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="h-6 px-2"
                >
                  <Icon name="ChevronUp" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveDown(index)}
                  disabled={index === menuItems.length - 1}
                  className="h-6 px-2"
                >
                  <Icon name="ChevronDown" size={14} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={item.enabled}
                  onCheckedChange={(checked) => updateMenuItem(item.id, 'enabled', checked)}
                />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Input
                    value={item.label}
                    onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="Название"
                  />
                </div>
                <div>
                  <Input
                    value={item.url}
                    onChange={(e) => updateMenuItem(item.id, 'url', e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="/url"
                  />
                </div>
                <div>
                  <Input
                    value={item.icon || ''}
                    onChange={(e) => updateMenuItem(item.id, 'icon', e.target.value)}
                    className="bg-black/50 border-gaming-red/30 text-white"
                    placeholder="Иконка (опционально)"
                  />
                </div>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteMenuItem(item.id)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NavigationEditor;
