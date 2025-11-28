import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Card, Divider, Modal, Portal } from "react-native-paper";

interface propAddress {
  id: string | null;
  text: string;
}

interface CheckoutSummaryProps {
  cartCount: number;
  cartAmount: number;
  tax: number;
  taxPercentage: number;
  total: number;
  shipping: number;

  selectedAddress: propAddress;
  setSelectedAddress: (address: propAddress) => void;
}

interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  region: string;
  province: string;
  city: string;
  area: string;
  zipcode: string;
}

const OrderSummary: React.FC<CheckoutSummaryProps> = ({
  cartCount,
  cartAmount,
  tax,
  taxPercentage,
  total,
  shipping,
  selectedAddress,
  setSelectedAddress
}) => {
  const [promoCode, setPromoCode] = useState("");
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const { getToken } = useAuth();
  

  

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    divider: {
      height: 1,
      backgroundColor: colors.textMuted,
      marginVertical: 20,
    },
    section: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      textTransform: "uppercase",
      marginBottom: 8,
      color: colors.textMuted,
    },
    addressBox: {
      padding: 15,
      borderWidth: 1,
      borderColor: colors.textMuted,
      borderRadius: 8,
    },
    promoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.textMuted,
      borderRadius: 6,
      color: colors.text,
    },
    applyButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    applyButtonText: {
      color: colors.primary,
      fontWeight: "600",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textMuted,
    },
    rowValue: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    grayText: {
      color: colors.textMuted,
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: colors.textMuted,
      paddingTop: 10,
      marginTop: 10,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.primary,
    },
    card: {
      borderRadius: 16,
      elevation: 0, // remove Android shadow
      shadowColor: "transparent", // remove iOS shadow
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    paperModal: {
      padding: 30,
    },
    sectionHeader: {
      fontWeight: "700",
      fontSize: 16,
      marginBottom: 6,
    },
    text: {
      fontSize: 15,
      lineHeight: 20,
    },
    bold: {
      fontWeight: "700",
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const token = await getToken();

      const { data } = await axios.get(
        "https://next-ecommerce-silk-rho.vercel.app/api/user/get-address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.addresses as Address[];
    },
  });

  

  return (
    <>
      {/* Content */}
      <View style={styles.container}>
        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          {/* Replace with your custom AddressComboBox */}
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
          >
            <View style={styles.addressBox}>
              <Text
                style={{ color: colors.text }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedAddress.text || "Choose Address"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.label}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter promo code"
              placeholderTextColor="#999"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton} onPress={() => {}}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Items {cartCount}</Text>
            <Text style={styles.rowValue}>₱{formatMoney(cartAmount)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.rowLabel, styles.grayText]}>Shipping Fee</Text>
            <Text style={styles.rowValue}>
              {shipping > 0 ? shipping : "Free"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.rowLabel, styles.grayText]}>
              Tax ({taxPercentage * 100}%)
            </Text>
            <Text style={styles.rowValue}>₱{formatMoney(Math.floor(tax))}</Text>
          </View>

          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₱{formatMoney(Math.floor(total))}
            </Text>
          </View>
        </View>
      </View>

      {/* Modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={[styles.paperModal]}
        >
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Title
              title="Select Shipping Address"
              titleStyle={{ fontSize: 20, color: colors.text }}
            />

            <Card.Content>
              <Divider
                style={{ marginBottom: 15, backgroundColor: colors.textMuted }}
              />

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Items */}
                {addresses?.map((address) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedAddress({
                          id: address.id,
                          text: `${address.area}, ${address.city}, ${address.province}`,
                        });
                        setVisible(false);
                      }}
                      key={address.id}
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: colors.text,
                          }}
                        >
                          {address.fullName} |{" "}
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "400",
                              color: colors.textMuted,
                            }}
                          >
                            {address.phoneNumber}
                          </Text>
                        </Text>

                        <Text style={{ fontSize: 12, color: colors.textMuted }}>
                          {address.area}
                        </Text>

                        <Text style={{ fontSize: 12, color: colors.textMuted }}>
                          {address.city}, {address.province}, {address.zipcode}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Divider
                      style={{
                        marginVertical: 15,
                        backgroundColor: colors.textMuted,
                      }}
                    />
                  </>
                ))}
              </ScrollView>
            </Card.Content>

            <Card.Actions style={{ justifyContent: "center", marginTop: 10 }}>
              <Button
                mode="contained"
                onPress={() => setVisible(false)}
                style={{ backgroundColor: colors.primary }}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </>
  );
};

export default OrderSummary;
