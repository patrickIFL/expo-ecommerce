import { useHomeStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";
import OrdersList from "./OrdersList";

const MyOrders = ({ myOrders }: { myOrders: any }) => {
  const styles = useHomeStyles();
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.titleContainerNotCentered}>
        <Text style={styles.title}>
          My
          <Text style={{ color: colors.primary, fontWeight: 500 }}>
            {" "}
            Orders
          </Text>
        </Text>
      </View>
      <OrdersList orders={myOrders} currency={"₱"} />
    </View>
  );
};

export default MyOrders;
