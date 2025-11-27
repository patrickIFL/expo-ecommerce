import { useHomeStyles } from "@/assets/styles/styles";
import CheckoutBottomControls from "@/components/CheckoutBottomControls";
import CheckoutCard from "@/components/CheckoutCard";
import OrderSummary from "@/components/OrderSummary";
import TitleHeader from "@/components/TitleHeader";
import useCart from "@/hooks/useCart";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// interface Address {
//   fullName: string;
//   phoneNumber: string;
//   zipcode: number;
//   area: string;
//   city: string;
//   province: string;
// }
const Checkout = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();
  const {cartItems, cartAmount, cartCount, tax, taxPercentage, total, shipping } = useCart();

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
          />
        </ScrollView>
        <CheckoutBottomControls 
          cartAmount={Math.floor(total)} 
          discount={0}
          shipping = {shipping} 
          />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Checkout;
