import useTheme from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  FlatList,
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
  address: {
    fullName: string;
    phoneNumber: string;
    area: string;
    city: string;
    province: string;
  };
  amount: number;
  date: number;
  status?: string;
};

const OrdersList = ({ orders, currency = "₱" }: { orders: Order[]; currency?: string }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const {colors} = useTheme();

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  const renderOrder = ({ item }: { item: Order }) => {
    return (
      <TouchableOpacity
        style={[styles.orderCard, { borderBottomColor: colors.textMuted }]}
        onPress={() => openOrderDetails(item)}
      >
        <View style={styles.productSection}>
          <Image
            source={{ uri: item.items[0].product.image[0] }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <View style={{ flex: 1 }}>
            <Text style={[styles.productNames, { color: colors.text }]}>
              {item.items.map((i) => `${i.product.name} x ${i.quantity}`).join(", ")}
            </Text>

            <View style={styles.justifiedSection}>
              <Text style={{ color: colors.text }}>
                Items: {item.items.length}
              </Text>

              <Text style={[styles.amountText, { color: colors.primary }]}>
                {currency}
                {item.amount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
      />

      {/* Modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={[
            styles.paperModal,
          ]}
        >
          {selectedOrder && (
            <Card
              style={[
                styles.card,
                { backgroundColor: colors.surface },
              ]}
            >
              <Card.Title
                title="Order Details"
                titleStyle={{ fontSize: 20, color: colors.text }}
              />

              <Card.Content>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Items */}
                  <Text
                    style={[
                      styles.sectionHeader,
                      { color: colors.text }
                    ]}
                  >
                    Items
                  </Text>

                  {selectedOrder.items.map((i, index) => (
                    <Text
                      key={index}
                      style={[styles.itemText, { color: colors.text }]}
                    >
                      • {i.product.name} x {i.quantity}
                    </Text>
                  ))}

                  <Divider style={{ marginVertical: 15 }} />

                  {/* Address */}
                  <Text
                    style={[
                      styles.sectionHeader,
                      { color: colors.text }
                    ]}
                  >
                    Shipping Address
                  </Text>

                  <Text style={[styles.text, { color: colors.text }]}>
                    <Text style={styles.bold}>
                      {selectedOrder.address.fullName}
                    </Text>
                    {"\n"}
                    {selectedOrder.address.area}
                    {"\n"}
                    {selectedOrder.address.city}, {selectedOrder.address.province}
                    {"\n"}
                    {selectedOrder.address.phoneNumber}
                  </Text>

                  <Divider style={{ marginVertical: 15 }} />

                  {/* Payment */}
                  <Text
                    style={[
                      styles.sectionHeader,
                      { color: colors.text }
                    ]}
                  >
                    Payment & Status
                  </Text>

                  <Text style={[styles.text, { color: colors.text }]}>
                    Method: COD{"\n"}
                    Date: {new Date(selectedOrder.date).toLocaleDateString()}
                    {"\n"}
                    Payment: {selectedOrder.status || "Pending"}
                  </Text>

                  <Divider style={{ marginVertical: 15 }} />

                  {/* Amount */}
                  <Text
                    style={[
                      styles.sectionHeader,
                      { color: colors.text }
                    ]}
                  >
                    Total Amount
                  </Text>

                  <Text
                    style={[
                      styles.amountText,
                      { color: colors.primary }
                    ]}
                  >
                    {currency}
                    {selectedOrder.amount}
                  </Text>
                </ScrollView>
              </Card.Content>

              <Card.Actions style={{ justifyContent: "center", marginTop: 10 }}>
                <Button mode="contained" onPress={() => setVisible(false)} style={{backgroundColor: colors.primary}}>
                  <Text style={{color: "white"}}>Close</Text>
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

  paperModal: {
    padding: 30,
  },

  card: {
    borderRadius: 16,
    elevation: 0,          // remove Android shadow
    shadowColor: "transparent", // remove iOS shadow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
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
