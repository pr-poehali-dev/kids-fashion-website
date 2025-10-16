import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  ageRange: string;
  gender: 'boy' | 'girl' | 'unisex';
}

const Catalog = () => {
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl'>('all');

  const ageRanges = [
    { value: 'all', label: 'Все возраста' },
    { value: '0-12', label: '0-12 мес' },
    { value: '1-3', label: '1-3 года' },
    { value: '4-6', label: '4-6 лет' },
    { value: '7-10', label: '7-10 лет' },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Хлопковый комбинезон',
      price: 2499,
      image: '/placeholder.svg',
      ageRange: '0-12',
      gender: 'unisex',
    },
    {
      id: 2,
      name: 'Платье с рюшами',
      price: 3299,
      image: '/placeholder.svg',
      ageRange: '1-3',
      gender: 'girl',
    },
    {
      id: 3,
      name: 'Спортивный костюм',
      price: 4199,
      image: '/placeholder.svg',
      ageRange: '4-6',
      gender: 'boy',
    },
    {
      id: 4,
      name: 'Джинсовая куртка',
      price: 5499,
      image: '/placeholder.svg',
      ageRange: '7-10',
      gender: 'unisex',
    },
    {
      id: 5,
      name: 'Летний сарафан',
      price: 2899,
      image: '/placeholder.svg',
      ageRange: '4-6',
      gender: 'girl',
    },
    {
      id: 6,
      name: 'Толстовка с капюшоном',
      price: 3499,
      image: '/placeholder.svg',
      ageRange: '7-10',
      gender: 'boy',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const ageMatch = selectedAge === 'all' || product.ageRange === selectedAge;
    const genderMatch = selectedGender === 'all' || product.gender === selectedGender || product.gender === 'unisex';
    return ageMatch && genderMatch;
  });

  return (
    <section id="catalog" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Наш каталог</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Выберите возраст и пол ребенка для подбора идеальной одежды
          </p>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={(value) => setSelectedGender(value as any)}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="boy">Мальчики</TabsTrigger>
              <TabsTrigger value="girl">Девочки</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ageRanges.map((age) => (
            <Button
              key={age.value}
              variant={selectedAge === age.value ? 'default' : 'outline'}
              onClick={() => setSelectedAge(age.value)}
              className="rounded-full"
            >
              {age.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-[3/4] bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {ageRanges.find(a => a.value === product.ageRange)?.label}
                  </span>
                  {product.gender !== 'unisex' && (
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {product.gender === 'boy' ? '👦' : '👧'}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold mb-2">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{product.price} ₽</span>
                  <Button size="sm" className="gap-2">
                    <Icon name="ShoppingCart" size={16} />
                    В корзину
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Товары не найдены. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
