import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Truck from "./Truck";

interface CheckoutBottomControlsProps {
  cartAmount: number;
  discount: number;
  shipping: number;
  placeOrder: () => void;
}

const CheckoutBottomControls: React.FC<CheckoutBottomControlsProps> = ({
  cartAmount,
  discount,
  shipping,
  placeOrder,
}) => {
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  // const styles = useHomeStyles();
  // const router = useRouter();

  const styles = StyleSheet.create({
    headerTitleWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 5,
    },

    titleActions: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
    },

    shipping: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    headerTitleSection: {
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 7,
    },

    title: {
      fontSize: 20,
      fontWeight: "500",
      letterSpacing: -1,
      color: colors.primary,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: "500",
      letterSpacing: -1,
      color: colors.textMuted,
    },
    discountText: {
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: -1,
      color: colors.textMuted,
    },
    discountValue: {
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: -1,
      color: colors.primary,
    },

    checkoutButton: {
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  });

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={styles.headerTitleSection}
    >
      <View style={styles.headerTitleWrapper}>
        <View style={styles.titleActions}>
          <Text style={styles.subtitle}>Total:</Text>
          <Text style={styles.title}>₱{formatMoney(cartAmount)}</Text>

          {discount > 0 ? (
            <View style={styles.shipping}>
              <Text style={styles.discountText}>Saved |</Text>
              <Text style={styles.discountValue}>₱{formatMoney(discount)}</Text>
            </View>
          ) : (
            <View style={styles.shipping}>
              <Truck color={colors.textMuted} size={13} />
              <Text style={styles.discountText}>
                |{"  "}
                {shipping > 0 ? (
                  <Text>₱{formatMoney(shipping)}</Text>
                ) : (
                  <Text style={{ fontWeight: 500 }}>FREE</Text>
                )}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.titleActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              placeOrder();
            }}
          >
            <LinearGradient
              colors={colors.gradients.primary}
              style={[styles.checkoutButton]}
            >
              <Text style={{ color: "white" }}>Place Order</Text>
              <Ionicons name="arrow-forward" size={15} color={"#fff"} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CheckoutBottomControls;

// used in topsearch bar
