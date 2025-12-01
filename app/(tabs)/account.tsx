"use client"
import { useHomeStyles } from "@/assets/styles/styles";
import MyOrders from "@/components/MyOrders";
import TitleHeader from "@/components/TitleHeader";
import UserProfile from "@/components/UserProfile";
import useTheme from "@/hooks/useTheme";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInPage from "../(auth)/sign-in";
import SignUpPage from "../(auth)/sign-up";

const Account = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");


  const { getToken, isLoaded, isSignedIn } = useAuth();

  const {
    data: myOrders,
    isRefetching,
    refetch,
  } = useQuery({
    enabled: isLoaded && isSignedIn,
    queryKey: ["myOrders"],
    queryFn: async () => {
      const token = await getToken();

      const res = await fetch(
        "https://next-ecommerce-silk-rho.vercel.app/api/order/fetch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <>
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
              <View
                style={{
                  ...styles.emptyContainer,
                  paddingHorizontal: 30,
                  height: "100%",
                }}
              >
                {/* SignIn SignUp Page */}
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    marginBottom: 20,
                    opacity: 0.85,
                  }}
                  resizeMode="contain"
                  source={require("@/assets/images/shopping-cart.png")}
                />

                <Text style={styles.emptyText}>Welcome to QuickCart</Text>
                <Text style={styles.emptySubtext}>
                  Login or Create your account to experience exclusive deals!
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    // router.push("/(auth)/sign-in");
                    setSelected("login");
                    setVisible(true);
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
                    // router.push("/(auth)/sign-in");
                    setSelected("signup");
                    setVisible(true);
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

      <Portal>
  <Modal
    visible={visible}
    onDismiss={() => setVisible(false)}
    contentContainerStyle={{
      backgroundColor: colors.surface,
      padding: 24,
      marginHorizontal: 10,
      borderRadius: 16,
    }}
  >
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "100%" }}>
        {selected === "login" 
        ? (<SignInPage setVisible={setVisible} setSelected={setSelected} />)
        : (<SignUpPage setVisible={setVisible} setSelected={setSelected} />)
        }
      </View>
      
                    <TouchableOpacity onPress={() => {setVisible(false)}} style={{justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop:10, gap: 5}}>
                      <Ionicons name="arrow-back" color={colors.textMuted}/>
                      <Text style={{color: colors.textMuted}}>Back</Text>
                    </TouchableOpacity>
    </View>
  </Modal>
</Portal>

    </>
  );
};

export default Account;
