import { useHomeStyles } from "@/assets/styles/styles";
import AddAddressIcon from "@/components/AddAddressIcon";
import TitleHeader from "@/components/TitleHeader";
import useTheme from "@/hooks/useTheme";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface AddressForm {
  fullName: string;
  phoneNumber: string;
  zipcode: string;
  area: string;
  city: string;
  province: string;
}
const AddShippingAddress = () => {
  const { colors } = useTheme();
  const homestyles = useHomeStyles();
  const [focus, setFocus] = useState("none");
  const {getToken} = useAuth();

  const [address, setAddress] = useState<AddressForm>({
    fullName: "",
    phoneNumber: "",
    zipcode: "",
    area: "",
    city: "",
    province: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullName", address.fullName);
    formData.append("phoneNumber", address.phoneNumber);
    formData.append("zipcode", address.zipcode);
    formData.append("area", address.area);
    formData.append("city", address.city);
    formData.append("province", address.province);

    try {
      const token = await getToken();
      setLoading(true);
      const { data } = await axios.post("https://next-ecommerce-silk-rho.vercel.app/api/user/add-address", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setLoading(false);
        Alert.alert("Added!")
        setAddress({
          fullName: "",
          phoneNumber: "",
          zipcode: "",
          area: "",
          city: "",
          province: "",
        });
      } else {
        Alert.alert(data.message)
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  };
  // Base input style
  const baseInput = {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.text,
    },

    input: {
      ...baseInput,
      borderColor: "#ccc",
      width: "100%",
    },
    inputFocused: {
      ...baseInput,
      borderColor: colors.primary,
      width: "100%",
    },
    spanTwo: {
      ...baseInput,
      borderColor: "#ccc",
      flex:1
    },
    spanTwoFocused: {
      ...baseInput,
      borderColor: colors.primary,
      flex:1
    },

    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      marginBottom: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    signInContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    signInText: {
      color: colors.primary,
      fontWeight: "bold",
    },
  });

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homestyles.container}
    >
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={homestyles.safeArea}>
        <TitleHeader title="Addresses" />
        <ScrollView>
          <View style={homestyles.addressContainer}>
            {/* SignIn SignUp Page */}
            <AddAddressIcon size={250} />

  <Text style={homestyles.title}>
            Add Shipping <Text style={{ color: colors.primary, fontWeight: 500 }}>Address</Text>
          </Text>          <Text style={homestyles.emptySubtext}>
              Enter your address so we can deliver straight to your door!
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <TextInput
              style={focus === "fullName" ? styles.inputFocused : styles.input}
              autoCapitalize="none"
              // value={emailAddress}
              placeholder="Full name"
              placeholderTextColor="#999"
              onFocus={() => setFocus("fullName")}
              // onChangeText={setEmailAddress}
            />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={focus === "email" ? styles.spanTwoFocused : styles.spanTwo}
                autoCapitalize="phoneNumber"
                // value={emailAddress}
                placeholder="Phone number"
                placeholderTextColor="#999"
                onFocus={() => setFocus("phoneNumber")}
                // onChangeText={setEmailAddress}
              />
              {/* // */}
              <TextInput
                style={focus === "email" ? styles.spanTwoFocused : styles.spanTwo}
                autoCapitalize="none"
                // value={emailAddress}
                placeholder="Zip code"
                placeholderTextColor="#999"
                onFocus={() => setFocus("zipCode")}
                // onChangeText={setEmailAddress}
              />

            </View>
            <TextInput
              style={focus === "email" ? styles.inputFocused : styles.input}
              autoCapitalize="area"
              // value={emailAddress}
              placeholder="Address (Area and Street)"
              placeholderTextColor="#999"
              onFocus={() => setFocus("area")}
              // onChangeText={setEmailAddress}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={focus === "city" ? styles.spanTwoFocused : styles.spanTwo}
                autoCapitalize="none"
                // value={emailAddress}
                placeholder="City/District/Town"
                placeholderTextColor="#999"
                onFocus={() => setFocus("city")}
                // onChangeText={setEmailAddress}
              />
              <TextInput
                style={focus === "province" ? styles.spanTwoFocused : styles.spanTwo}
                autoCapitalize="none"
                // value={emailAddress}
                placeholder="Province"
                placeholderTextColor="#999"
                onFocus={() => setFocus("province")}
                // onChangeText={setEmailAddress}
              />

            </View>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Text style={styles.buttonText}>SAVE ADDRESS</Text>
                      </TouchableOpacity>


          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddShippingAddress;
