import { useHomeStyles } from '@/assets/styles/styles';
import BottomControls from '@/components/BottomControls';
import CartCard from '@/components/CartCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import TitleHeader from '@/components/TitleHeader';
import useTheme from '@/hooks/useTheme';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Orders = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();
  const { getToken } = useAuth();

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

  const { data: cartItems = [], isLoading, refetch, isRefetching } = useQuery<CartItem[]>({
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

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <TitleHeader title="My Cart" />

        <ScrollView
          style={{paddingVertical: 20}}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
              tintColor={colors.primary}       
              colors={[colors.primary]}
              />
          }
        >
          {isLoading ? (
            <Text style={{ color: colors.text, textAlign: 'center' }}>
              <LoadingSpinner />
            </Text>
          ) : cartItems.length === 0 ? (
            <Text style={{ color: colors.text, textAlign: 'center' }}>Your cart is empty</Text>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                padding: 10
              }}
            >
              {cartItems.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </View>
          )}
        </ScrollView>

        <BottomControls cartAmount={100} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Orders;
