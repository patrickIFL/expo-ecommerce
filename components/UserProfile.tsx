import useSignOut from "@/hooks/useSignOut";
import useTheme from "@/hooks/useTheme";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LocationPin from "./LocationPin";

const UserProfile = () => {
  const { handleSignOut } = useSignOut();
  const { user } = useUser();
  const router =useRouter();
  // todo: handle edit Profile.

  const userData = {
    id: user?.id,
    name: user?.fullName,
    email: user?.emailAddresses[0].emailAddress ,
    imageUrl: user?.imageUrl
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    profileSection: {
      padding: 10,
      marginTop: 10,
    },
    profileWrapper: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },

    detailsWrapper: {
      flexDirection: "row",
      alignItems: "flex-start",
    },

    image: {
      width: 70,
      height: 70,
      borderRadius: 50,
    },
    textWrapper: {
      marginLeft: 10,
    },
    name: {
      fontSize: 25,
      fontWeight: "600",
      color: colors.text,
    },
    email: {
      fontSize: 14,
      color: colors.textMuted,
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.profileSection}>
      <View style={styles.profileWrapper}>
        <View style={styles.detailsWrapper}>
          <Image
            source={{ uri: userData.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textWrapper}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "87%",
              }}
            >
              <Text style={styles.name}>{userData.name}</Text>
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => {
                  router.push('/addShippingAddress')
                }}
              >
                <View style={[styles.addButton]}>
                  <LocationPin color={colors.primary} size={24}/>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "87%",
              }}
            >
              <Text style={styles.email}>{userData.email}</Text>
              <TouchableOpacity onPress={handleSignOut} activeOpacity={0.8}>
                <View style={[styles.addButton]}>
                  <Ionicons name="log-out-sharp" size={20} color={"red"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
