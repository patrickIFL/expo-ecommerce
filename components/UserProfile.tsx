import useSignOut from "@/hooks/useSignOut";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserProfile = ({ email }) => {
  const { handleSignOut } = useSignOut();

  const userDummyData = {
    _id: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Patrick Perez",
    email,
    imageUrl:
      "https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.webp?a=1&b=1&s=612x612&w=0&k=20&c=2BRV7hQGz5K3wBj47U8VdlFUB44iDiUshJ4IZw5zmLk=",
    cartItems: {},
    __v: 0,
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
            source={{ uri: userDummyData.imageUrl }}
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
              <Text style={styles.name}>{userDummyData.name}</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <View style={[styles.addButton]}>
                  <Ionicons name="create-sharp" size={20} color={colors.primary} />
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
              <Text style={styles.email}>{userDummyData.email}</Text>
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
