import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from '@tanstack/react-query';

type Product = {
    id: string;
    name: string;
    image: string[];
    offerPrice: number;
  };

  type CartItem = {
    id: string;
    quantity: number;
    product: Product;
  };

const useCart = () => {
  const {getToken} = useAuth();
  const { data: cartItems = [], isLoading, refetch:refetchCart, isRefetching:isRefetchingCart } = useQuery<CartItem[]>({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch('https://next-ecommerce-silk-rho.vercel.app/api/cart/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return [];
      return data.cartItems as CartItem[];
    },
  });

  const getCartTotal: any = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      const price = item.product.offerPrice ?? 0;
      const qty = item.quantity ?? 0;
      return total + price * qty;
    }, 0);
  };

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);
  const cartAmount = getCartTotal(cartItems);
  const taxPercentage = 2 / 100;
  const tax = cartAmount * taxPercentage;
  const shipping = 0;
  const total = cartAmount + tax
  
  return {cartItems, isLoading, cartCount, cartAmount, refetchCart, isRefetchingCart,
    taxPercentage, tax, shipping, total
  }
}

export default useCart