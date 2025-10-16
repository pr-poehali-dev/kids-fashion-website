import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  article: string;
  name: string;
  price: number;
  image_url: string;
  age_range: string;
  gender: 'boy' | 'girl' | 'unisex';
  brand: string;
}

const PRODUCTS_API = 'https://functions.poehali.dev/6c2374fc-6989-4ca9-adcd-d21f76efc9d7';
const UPLOAD_API = 'https://functions.poehali.dev/6c1d631a-d6df-42e6-a03b-91ad485129ce';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    age_range: '0-12',
    gender: 'unisex',
    brand: 'H&M',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить товары',
        variant: 'destructive',
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const response = await fetch(UPLOAD_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64,
            filename: file.name,
          }),
        });
        const data = await response.json();
        setFormData({ ...formData, image_url: data.url });
        toast({
          title: 'Успешно',
          description: 'Изображение загружено',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить изображение',
          variant: 'destructive',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseInt(formData.price),
      };

      if (editingProduct) {
        await fetch(PRODUCTS_API, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...productData, id: editingProduct.id }),
        });
        toast({
          title: 'Успешно',
          description: 'Товар обновлен',
        });
      } else {
        await fetch(PRODUCTS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        toast({
          title: 'Успешно',
          description: 'Товар добавлен',
        });
      }

      setFormData({
        name: '',
        price: '',
        image_url: '',
        age_range: '0-12',
        gender: 'unisex',
        brand: 'H&M',
      });
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить товар',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image_url: product.image_url,
      age_range: product.age_range,
      gender: product.gender,
      brand: product.brand || 'H&M',
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот товар?')) return;

    try {
      await fetch(`${PRODUCTS_API}?id=${id}`, {
        method: 'DELETE',
      });
      toast({
        title: 'Успешно',
        description: 'Товар удален',
      });
      loadProducts();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить товар',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
            <p className="text-muted-foreground">Управление каталогом товаров</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              На сайт
            </a>
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Товары ({products.length})</TabsTrigger>
            <TabsTrigger value="add">
              {editingProduct ? 'Редактировать' : 'Добавить товар'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Артикул: {product.article}</div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.age_range} | {product.gender}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                  <p className="text-lg font-bold mb-3">{product.price} ₽</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Icon name="Pencil" size={14} className="mr-1" />
                      Изменить
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card className="p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название товара</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Цена (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Изображение товара</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {formData.image_url && (
                    <div className="mt-2 aspect-video max-w-xs rounded-lg overflow-hidden bg-muted">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="age_range">Возрастная группа</Label>
                  <Select
                    value={formData.age_range}
                    onValueChange={(value) => setFormData({ ...formData, age_range: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-12">0-12 месяцев</SelectItem>
                      <SelectItem value="1-3">1-3 года</SelectItem>
                      <SelectItem value="4-6">4-6 лет</SelectItem>
                      <SelectItem value="7-10">7-10 лет</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="gender">Пол</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unisex">Унисекс</SelectItem>
                      <SelectItem value="boy">Мальчик</SelectItem>
                      <SelectItem value="girl">Девочка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brand">Бренд</Label>
                  <Select
                    value={formData.brand}
                    onValueChange={(value) => setFormData({ ...formData, brand: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="H&M">H&M</SelectItem>
                      <SelectItem value="C&A">C&A</SelectItem>
                      <SelectItem value="U.S.Polo Assn.">U.S.Polo Assn.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? 'Сохранение...' : editingProduct ? 'Обновить' : 'Добавить'}
                  </Button>
                  {editingProduct && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(null);
                        setFormData({
                          name: '',
                          price: '',
                          image_url: '',
                          age_range: '0-12',
                          gender: 'unisex',
                          brand: 'H&M',
                        });
                      }}
                    >
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;