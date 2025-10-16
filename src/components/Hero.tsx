import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              Премиум бренды 0-10 лет
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Брендовая одежда для ваших малышей
            </h2>
            <p className="text-lg text-muted-foreground">
              Качественная детская одежда от мировых брендов. Комфорт, стиль и безопасность для вашего ребенка.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingBag" size={20} />
                В каталог
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://wa.me/79633984703" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={20} />
                  WhatsApp
                </a>
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Товаров</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Брендов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/06c1dce4-4f5d-457f-af63-97d3d0e8270d/files/582d65c5-9035-44ce-9da0-1fd13eec0ece.jpg" 
                alt="Детская одежда"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;