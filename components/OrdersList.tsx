import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Divider, Modal, Portal } from "react-native-paper";

type OrderItem = {
  product: { name: string; image: string[] };
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    phoneNumber: string;
    area: string;
    city: string;
    province: string;
  };
  amount: number;
  orderDate: number;
  status?: string;
};

const OrdersList = ({
  orders = [],
  currency = "₱",
}: {
  orders: Order[];
  currency?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { colors } = useTheme();

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  return (
    <>
      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.emptyImage}
            resizeMode="contain"
            source={require("../assets/images/empty.png")}
          />

          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Orders Yet
          </Text>

          <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
            Your orders will appear here once you make a purchase.
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/")}
            style={{
              marginTop: 18,
              backgroundColor: colors.primary,
              borderRadius: 50,
              paddingHorizontal: 15,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: "white" }}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* MAIN LIST */}
      {orders.length > 0 && (
        <ScrollView contentContainerStyle={styles.container}>
          {orders.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.orderCard,
                { borderBottomColor: colors.textMuted },
              ]}
              onPress={() => openOrderDetails(item)}
            >
              <View style={styles.productSection}>
                <Image
                  source={{ uri: item.items[0].product.image[0] }}
                  style={styles.productImage}
                  resizeMode="cover"
                />

                <View style={{ flex: 1 }}>
                  <View>
                      <Text
                        style={[styles.productNames, { color: colors.text }]}
                      >
                        {item.items[0].product.name} × {item.items[0].quantity}
                      </Text>
                  </View>

                  <View style={styles.justifiedSection}>
                    <Text style={{ color: colors.text }}>
                      Items: {item.items.length}
                    </Text>

                    <Text
                      style={[styles.amountText, { color: colors.primary }]}
                    >
                      {currency}
                      {formatMoney(item.amount)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* MODAL */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={[styles.paperModal]}
        >
          {selectedOrder && (
            <Card style={[styles.card, { backgroundColor: colors.surface }]}>
              <Card.Title
                title="Order Details"
                titleStyle={{
                  fontSize: 20,
                  color: colors.text,
                  fontWeight: "700",
                }}
              />

              <Card.Content>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* ITEMS */}
                  <Text style={[styles.sectionHeader, { color: colors.text }]}>
                    Items
                  </Text>

                  {selectedOrder.items.map((i, index) => (
                    <View key={index} style={{ marginBottom: 6 }}>
                      <Text style={[styles.itemText, { color: colors.text }]}>
                        • {i.product.name} × {i.quantity}
                      </Text>
                    </View>
                  ))}

                  <Divider style={{ marginVertical: 15 }} />

                  {/* ADDRESS */}
                  <Text style={[styles.sectionHeader, { color: colors.text }]}>
                    Shipping Address
                  </Text>

                  <Text style={[styles.text, { color: colors.text }]}>
                    <Text style={styles.bold}>
                      {selectedOrder.shippingAddress?.fullName}
                    </Text>
                    {"\n"}
                    {selectedOrder.shippingAddress?.area}
                    {"\n"}
                    {selectedOrder.shippingAddress?.city},{" "}
                    {selectedOrder.shippingAddress?.province}
                    {"\n"}
                    {selectedOrder.shippingAddress?.phoneNumber}
                  </Text>

                  <Divider style={{ marginVertical: 15 }} />

                  {/* PAYMENT / STATUS */}
                  <Text style={[styles.sectionHeader, { color: colors.text }]}>
                    Payment & Status
                  </Text>

                  <Text style={[styles.text, { color: colors.text }]}>
                    Method: Cash on Delivery{"\n"}
                    Date:{" "}
                    {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    {"\n"}
                    Status: {selectedOrder.status || "Pending"}
                  </Text>

                  <Divider style={{ marginVertical: 15 }} />

                  {/* TOTAL */}
                  <Text style={[styles.sectionHeader, { color: colors.text }]}>
                    Total Amount
                  </Text>

                  <Text style={[styles.amountText, { color: colors.primary }]}>
                    {currency}
                    {formatMoney(selectedOrder.amount)}
                  </Text>
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
          )}
        </Modal>
      </Portal>
    </>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  orderCard: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
  },

  productSection: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  productImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },

  productNames: {
    fontWeight: "600",
    fontSize: 16,
  },

  justifiedSection: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // EMPTY STATE
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
    paddingHorizontal: 20,
  },

  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity: 0.85,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    maxWidth: 240,
    lineHeight: 20,
  },

  paperModal: {
    padding: 30,
  },

  card: {
    borderRadius: 16,
    elevation: 0,
    shadowColor: "transparent",
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

  itemText: {
    fontSize: 15,
    marginBottom: 4,
  },

  amountText: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 5,
  },

  bold: {
    fontWeight: "700",
  },
});
