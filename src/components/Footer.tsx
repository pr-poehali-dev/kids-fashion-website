import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Baby" size={24} />
              <h3 className="text-xl font-bold">BRANDKIDS</h3>
            </div>
            <p className="text-sm text-background/70">
              Премиум детская одежда от мировых брендов для детей 0-10 лет
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#home" className="hover:text-background transition-colors">Главная</a></li>
              <li><a href="#catalog" className="hover:text-background transition-colors">Каталог</a></li>
              <li><a href="#contacts" className="hover:text-background transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Возврат товара</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <span>info@brandkids.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm text-background/70">
          <p>&copy; 2024 BRANDKIDS. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;