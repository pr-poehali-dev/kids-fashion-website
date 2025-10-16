import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  article: string;
  name: string;
  price: number;
  image_url: string;
  brand: string;
  quantity: number;
}

const WHATSAPP_NUMBER = '79633984703';

export const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const orderText = items
      .map((item) => `${item.article} - ${item.name} (${item.brand}) x${item.quantity} = ${item.price * item.quantity} ₽`)
      .join('%0A');

    const message = `Здравствуйте! Хочу оформить заказ:%0A%0A${orderText}%0A%0AОбщая сумма: ${total} ₽`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="ShoppingBag" size={20} />
            {items.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {items.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Корзина ({items.length})</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Корзина пуста</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Добавьте товары из каталога
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-1">Арт: {item.article}</div>
                        <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{item.price} ₽</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => removeItem(item.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Итого:</span>
                    <span>{total} ₽</span>
                  </div>
                  <Button className="w-full gap-2" size="lg" onClick={handleCheckout}>
                    <Icon name="MessageCircle" size={20} />
                    Оформить в WhatsApp
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export const useCart = () => {
  const [, forceUpdate] = useState({});

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const savedCart = localStorage.getItem('cart');
    const items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(items));
    forceUpdate({});
    window.dispatchEvent(new Event('cart-updated'));
  };

  return { addToCart };
};
