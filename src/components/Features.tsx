import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Качество',
      description: 'Только оригинальные вещи от проверенных брендов',
      color: 'text-primary',
    },
    {
      icon: 'Truck',
      title: 'Доставка',
      description: 'СДЭК по всей России и местная доставка',
      color: 'text-secondary',
    },
    {
      icon: 'MessageCircle',
      title: 'Консультация',
      description: 'Поможем подобрать идеальный образ через WhatsApp',
      color: 'text-accent',
    },
    {
      icon: 'Star',
      title: 'Эксклюзив',
      description: 'Уникальные модели от мировых дизайнеров',
      color: 'text-primary',
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы создаем особенный опыт покупки детской одежды
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow border-none bg-white">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={feature.icon as any} size={24} className={feature.color} />
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;