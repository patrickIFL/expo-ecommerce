import { useHomeStyles } from "@/assets/styles/styles";
import MyOrders from "@/components/MyOrders";
import TitleHeader from "@/components/TitleHeader";
import UserProfile from "@/components/UserProfile";
import useTheme from "@/hooks/useTheme";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();
  const router = useRouter();

  const { getToken } = useAuth();

  const {
    data: myOrders,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const token = await getToken();

      const res = await fetch(
        "https://next-ecommerce-silk-rho.vercel.app/api/order/fetch",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load orders");
      }

      return data.orders;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{
            paddingVertical: 12,
          }}
        >
          <SignedIn>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefetching}
                  onRefresh={() => {
                    refetch();
                  }}
                  tintColor={colors.primary} // iOS indicator color
                  colors={[colors.primary]} // Android indicator color
                />
              }
            >
              <TitleHeader title="Account" />
              <UserProfile />
              <MyOrders myOrders={myOrders} />
            </ScrollView>
          </SignedIn>
          <SignedOut>
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

              <Text style={styles.emptyText}>Welcome to QuickCart</Text>
              <Text style={styles.emptySubtext}>
                Login or Create your account to experience exclusive deals!
              </Text>

              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/sign-in");
                }}
                style={{
                  marginTop: 20,
                  padding: 12,
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/sign-up");
                }}
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: 12,
                  backgroundColor: colors.textMuted,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Create an Account
                </Text>
              </TouchableOpacity>
            </View>
          </SignedOut>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Account;
