import { useHomeStyles } from "@/assets/styles/styles";
import CartBottomControls from "@/components/CartBottomControls";
import CartCard from "@/components/CartCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import TitleHeader from "@/components/TitleHeader";
import useCart from "@/hooks/useCart";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Orders = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();

  const {
    isRefetchingCart,
    refetchCart,
    isLoading,
    cartItems,
    cartCount,
    cartAmount,
    shipping,
  } = useCart();

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <TitleHeader title="My Cart" />

        <ScrollView
          style={{ paddingVertical: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingCart}
              onRefresh={() => refetchCart()}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {isLoading ? (
            <View style={{ marginTop: 100, flex: 1 }}>
              <LoadingSpinner />
            </View>
          ) : cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              {/* SignIn SignUp Page */}
              <LinearGradient
                colors={colors.gradients.empty}
                style={styles.emptyIconContainer}
              >
                <Ionicons
                  name="cart-outline"
                  size={60}
                  color={colors.textMuted}
                />
              </LinearGradient>

              <Text style={styles.emptyText}>Your Cart is Empty!</Text>
              <Text style={styles.emptySubtext}>
                Browse our available products and enjoy shopping now.
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/")}
                style={{
                  marginTop: 18,
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ color: "white" }}>Start Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              {cartItems.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </View>
          )}
        </ScrollView>

        <CartBottomControls
          cartAmount={cartAmount}
          cartCount={cartCount}
          shipping={shipping}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Orders;
