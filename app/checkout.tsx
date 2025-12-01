import { useHomeStyles } from "@/assets/styles/styles";
import CheckoutBottomControls from "@/components/CheckoutBottomControls";
import CheckoutCard from "@/components/CheckoutCard";
import OrderSummary from "@/components/OrderSummary";
import TitleHeader from "@/components/TitleHeader";
import useCart from "@/hooks/useCart";
import useTheme from "@/hooks/useTheme";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface propAddress {
  id: string | null;
  text: string;
}

const Checkout = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();
  const {getToken} = useAuth();
  const {cartItems, cartAmount, cartCount, tax, taxPercentage, total, shipping } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<propAddress>({
  id: null,
  text: "",
});


  const { mutate: placeOrder } = useMutation({
  mutationFn: async () => {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart Empty");
    }

    if (!selectedAddress || !selectedAddress.id) {
      throw new Error("Undefined Address");
    }

    const token = await getToken();

    const res = await fetch(
      "https://next-ecommerce-silk-rho.vercel.app/api/order/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ selectedAddressId: selectedAddress.id, platform: "mobile" }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to create order");
    }

    return res.json();
  },

  onSuccess: (data) => {
    const { checkoutUrl } = data;

    if (checkoutUrl) {
      Linking.openURL(checkoutUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      console.warn("No checkout URL returned from server");
    }
  },

  onError: (error: any) => {
    let message = "";

    if (error.message === "Cart Empty") {
      message = "Your cart is empty.";
    } else if (error.message === "Undefined Address") {
      message = "Select an address or add a new one to proceed.";
    } else {
      message = "Something went wrong. Please try again.";
    }

    Alert.alert(error.message, message, [{ text: "OK" }]);
  },
});

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <TitleHeader title="Checkout" />

        <ScrollView style={{ paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text style={styles.title}>
              Your{" "}
              <Text style={{ color: colors.primary, fontWeight: 500 }}>
                Order
              </Text>
            </Text>

            {cartItems.map((item) => (
              <CheckoutCard key={item.id} item={item} />
            ))}
          </View>
          <Text style={styles.title}>
            Payment
            <Text style={{ color: colors.primary, fontWeight: 500 }}>
              {" "}
              Summary
            </Text>
          </Text>
          <OrderSummary
            cartCount={cartCount}
            cartAmount={cartAmount}
            tax={tax}
            taxPercentage={taxPercentage}
            total={total}
            shipping={shipping}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </ScrollView>
        <CheckoutBottomControls 
          cartAmount={Math.floor(total)} 
          discount={0}
          shipping = {shipping} 
          placeOrder={placeOrder}
          />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Checkout;
