import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import React from "react";
import { Image, Text, View } from "react-native";

const CheckoutCard = ({ item }: { item: any }) => {
  const { colors } = useTheme();
  const product = item.product;

  return (
    <View
      style={{
        width: "100%",
        marginBottom: 15,
        backgroundColor: colors.surface,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 1, paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: product.image[0] }}
          style={{ width: 50, height: 50, borderRadius: 35 }}
          resizeMode="cover"
        />

        <View style={{ paddingVertical: 15, paddingLeft: 25, flex: 1}}>
          <View style={{  flexDirection: "row", justifyContent: "space-between"}}>

            <Text
                numberOfLines={1}
                style={{ color: colors.text, fontWeight: "600" }}
            >
                {product.name}
            </Text>

            <Text
                numberOfLines={1}
                style={{ color: colors.textMuted, fontWeight: "500" }}
            >
                × {item.quantity}
            </Text>
            
          </View>
          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            ₱{formatMoney(product.offerPrice)}
          </Text>
        </View>

            
            

        
      </View>
    </View>
  );
};

export default CheckoutCard;
