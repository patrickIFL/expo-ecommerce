import { useHomeStyles } from '@/assets/styles/styles';
import BottomControls from '@/components/BottomControls';
import TitleHeader from '@/components/TitleHeader';
import useTheme from '@/hooks/useTheme';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
            <Text style={{ color: colors.text, textAlign: 'center' }}>LoadingSpinner</Text>
          ) : cartItems.length === 0 ? (
            <Text style={{ color: colors.text, textAlign: 'center' }}>Your cart is empty</Text>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {cartItems.map((item) => {
                const product = item.product;
                return (
                  <View
                    key={item.id}
                    style={{
                      width: '48%',
                      marginBottom: 15,
                      backgroundColor: colors.surface,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                  >
                    {product.image?.[0] && (
                      <Image
                        source={{ uri: product.image[0] }}
                        style={{ width: '100%', height: 120 }}
                        resizeMode="cover"
                      />
                    )}

                    <View style={{ padding: 10 }}>
                      <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '600' }}>
                        {product.name}
                      </Text>
                      <Text style={{ color: colors.textMuted, marginVertical: 5 }}>
                        Quantity: {item.quantity}
                      </Text>
                      <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                        ₱{product.offerPrice * item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor: colors.primary,
                          borderRadius: 50,
                        }}
                        onPress={() => console.log('Checkout', item.id)}
                      >
                        <Text style={{ color: colors.primary, textAlign: 'center', fontSize: 12 }}>
                          Buy now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>

        <BottomControls cartAmount={100} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Orders;
