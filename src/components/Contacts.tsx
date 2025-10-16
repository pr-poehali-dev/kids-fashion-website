import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  const contactInfo = [
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      description: 'Персональный подбор образа',
      action: 'Написать',
      link: 'https://wa.me/79000000000',
      color: 'text-green-600',
    },
    {
      icon: 'Truck',
      title: 'Доставка СДЭК',
      description: 'По всей России 3-7 дней',
      action: 'Узнать стоимость',
      link: '#',
      color: 'text-secondary',
    },
    {
      icon: 'MapPin',
      title: 'Местная доставка',
      description: 'В пределах города 1-2 дня',
      action: 'Подробнее',
      link: '#',
      color: 'text-accent',
    },
  ];

  return (
    <section id="contacts" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Контакты и доставка</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы поможем подобрать идеальный образ и быстро доставим заказ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contact) => (
            <Card key={contact.title} className="p-6 text-center hover:shadow-lg transition-shadow bg-white border-none">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name={contact.icon as any} size={28} className={contact.color} />
              </div>
              <h4 className="text-xl font-semibold mb-2">{contact.title}</h4>
              <p className="text-muted-foreground text-sm mb-4">{contact.description}</p>
              <Button variant="outline" className="w-full" asChild>
                <a href={contact.link} target="_blank" rel="noopener noreferrer">
                  {contact.action}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-none">
          <div className="max-w-2xl mx-auto text-center">
            <Icon name="Sparkles" size={48} className="mx-auto mb-6 text-primary" />
            <h4 className="text-2xl md:text-3xl font-bold mb-4">
              Нужна помощь в выборе?
            </h4>
            <p className="text-muted-foreground mb-6">
              Напишите нам в WhatsApp — мы подберем образ, отправим фото надетых вещей и поможем с размером
            </p>
            <Button size="lg" className="gap-2">
              <Icon name="MessageCircle" size={20} />
              Написать в WhatsApp
            </Button>
          </div>
        </Card>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Package" size={24} className="text-secondary" />
              Доставка СДЭК
            </h5>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Отправка в течение 1-2 дней после заказа</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Доставка до пункта выдачи или курьером</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Возможность примерки перед оплатой</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Отслеживание посылки онлайн</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={24} className="text-accent" />
              Местная доставка
            </h5>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Быстрая доставка по городу за 1-2 дня</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Курьер привезет в удобное время</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Возможность примерить при получении</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Бесплатно при заказе от 5000 ₽</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
