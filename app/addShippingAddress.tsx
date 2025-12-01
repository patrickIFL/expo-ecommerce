import { useHomeStyles } from "@/assets/styles/styles";
import AddAddressIcon from "@/components/AddAddressIcon";
import TitleHeader from "@/components/TitleHeader";
import useTheme from "@/hooks/useTheme";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const { getToken } = useAuth();

  const [address, setAddress] = useState<AddressForm>({
    fullName: "",
    phoneNumber: "",
    zipcode: "",
    area: "",
    city: "",
    province: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert("You are not signed in.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        zipcode: address.zipcode,
        area: address.area,
        city: address.city,
        province: address.province,
      };

      const { data } = await axios.post(
        "https://next-ecommerce-silk-rho.vercel.app/api/user/add-address",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        Alert.alert("Added!");
        setAddress({
          fullName: "",
          phoneNumber: "",
          zipcode: "",
          area: "",
          city: "",
          province: "",
        });
      } else {
        Alert.alert(data.message);
      }
    } catch (error: any) {
      console.log("RN Axios Error:", error);
      Alert.alert("Network Error", error.message);
    } finally {
      setLoading(false);
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
    color: colors.text,
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
      flex: 1,
    },
    spanTwoFocused: {
      ...baseInput,
      borderColor: colors.primary,
      flex: 1,
    },

    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      marginBottom: 20,
    },

    buttonDisabled: {
      backgroundColor: "#bbb", // lighter gray
      opacity: 0.6, // faded look
    },

    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },

    buttonTextDisabled: {
      color: "#eee", // lighter text
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
            <AddAddressIcon size={250} />
            
            <Text style={homestyles.title}>
              Add Shipping{" "}
              <Text style={{ color: colors.primary, fontWeight: "600" }}>
                Address
              </Text>
            </Text>

            <Text style={homestyles.emptySubtext}>
              Enter your address so we can deliver straight to your door!
            </Text>
          </View>
          <View style={{ padding: 10, marginBottom: 300 }}>
            <TextInput
              style={focus === "fullName" ? styles.inputFocused : styles.input}
              autoCapitalize="words"
              value={address.fullName}
              placeholder="Full name"
              placeholderTextColor="#999"
              onFocus={() => setFocus("fullName")}
              onChangeText={(text) =>
                setAddress({ ...address, fullName: text })
              }
            />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={
                  focus === "phoneNumber"
                    ? styles.spanTwoFocused
                    : styles.spanTwo
                }
                autoCapitalize="none"
                value={address.phoneNumber}
                placeholder="Phone number"
                placeholderTextColor="#999"
                onFocus={() => setFocus("phoneNumber")}
                onChangeText={(text) =>
                  setAddress({ ...address, phoneNumber: text })
                }
              />
              <TextInput
                style={
                  focus === "zipcode" ? styles.spanTwoFocused : styles.spanTwo
                }
                autoCapitalize="none"
                value={address.zipcode}
                placeholder="Zip code"
                placeholderTextColor="#999"
                onFocus={() => setFocus("zipcode")}
                onChangeText={(text) =>
                  setAddress({ ...address, zipcode: text })
                }
              />
            </View>
            <TextInput
              style={focus === "area" ? styles.inputFocused : styles.input}
              autoCapitalize="words"
              value={address.area}
              placeholder="Address (Area and Street)"
              placeholderTextColor="#999"
              onFocus={() => setFocus("area")}
              onChangeText={(text) => setAddress({ ...address, area: text })}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={
                  focus === "city" ? styles.spanTwoFocused : styles.spanTwo
                }
                autoCapitalize="words"
                value={address.city}
                placeholder="City/District/Town"
                placeholderTextColor="#999"
                onFocus={() => setFocus("city")}
                onChangeText={(text) => setAddress({ ...address, city: text })}
              />
              <TextInput
                style={
                  focus === "province" ? styles.spanTwoFocused : styles.spanTwo
                }
                autoCapitalize="words"
                value={address.province}
                placeholder="Province"
                placeholderTextColor="#999"
                onFocus={() => setFocus("province")}
                onChangeText={(text) =>
                  setAddress({ ...address, province: text })
                }
              />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled, // apply disabled style when loading
              ]}
              onPress={onSubmitHandler}
              disabled={loading} // disable only when loading
            >
              <Text
                style={[
                  styles.buttonText,
                  loading && styles.buttonTextDisabled,
                ]}
              >
                {loading ? "LOADING..." : "ADD ADDRESS"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddShippingAddress;
