import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

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

const OrdersList = ({
  orders,
  currency = "₱",
}: {
  orders: Order[];
  currency?: string;
}) => {
  const renderOrder = ({ item }: { item: Order }) => {
    return (
      <View style={styles.orderCard}>
        {/* Product info */}
        <View style={styles.productSection}>
          <Image
            source={{ uri: item.items[0].product.image[0] }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.productText}>
            <View>
              
              <Text style={styles.productNames}>
                {item.items
                  .map((i) => `${i.product.name} x ${i.quantity}`)
                  .join(", ")}
              </Text>
            <View style={styles.justifiedSection}>
            <Text>Items: {item.items.length}</Text>
          <Text style={styles.amountText}>
            {currency}
            {item.amount}
          </Text>
        </View>
            </View>
            
          </View>
        </View>

        {/* Address */}
        {/* <View style={styles.addressSection}>
          <Text>
            <Text style={styles.addressName}>{item.address?.fullName}</Text>
            {"\n"}
            {item.address?.area}
            {"\n"}
            {`${item.address?.city}, ${item.address?.province}`}
            {"\n"}
            {item.address?.phoneNumber}
          </Text>
        </View> */}

        {/* Amount */}
        

        {/* Payment & Date */}
        {/* <View style={styles.paymentSection}>
          <Text>
            <Text>Method: COD{"\n"}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}{"\n"}</Text>
            <Text>Payment: {item.status || "Pending"}</Text>
          </Text>
        </View> */}
      </View>
    );
  };

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  orderCard: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productSection: {
    flexDirection: "row",
    gap: 10,
    maxWidth: 250,
    marginBottom: 5,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  productText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productNames: {
    fontWeight: "500",
    fontSize: 16,
  },
  addressSection: {
    marginVertical: 5,
  },
  addressName: {
    fontWeight: "500",
  },
  justifiedSection: {
    marginVertical: 5,
    flexDirection:"row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight:15,
  },
  amountText: {
    fontWeight: "500",
    fontSize: 16,
  },
  paymentSection: {
    marginVertical: 5,
  },
});
