import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Truck from "./Truck";

const BottomControls = ({
  cartAmount,
  cartCount,
  shipping,
}: {
  cartAmount: number;
  cartCount: number;
  shipping: number;
}) => {
  const { colors } = useTheme();
  // const styles = useHomeStyles();
  const router = useRouter();

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
          <View style={styles.shipping}>
            <Truck color={colors.textMuted} size={15} />
            <Text style={styles.subtitle}>
              | {shipping > 0 ? `₱${formatMoney(shipping)}` : "Free"}
            </Text>
          </View>
        </View>

        <View style={styles.titleActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (cartCount === 0) {
                Alert.alert(
                  "Your Cart is Empty!", // Title
                  "What will you pay if you don't have something to buy?", // Message
                  [{ text: "OK" }]
                );
                return;
              }
              router.push("/checkout");
            }}
          >
            <LinearGradient
              colors={colors.gradients.primary}
              style={[styles.checkoutButton]}
            >
              <Text style={{ color: "white" }}>
                Check Out {`(${cartCount})`}
              </Text>
              <Ionicons name="arrow-forward" size={15} color={"#fff"} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default BottomControls;

// used in topsearch bar
