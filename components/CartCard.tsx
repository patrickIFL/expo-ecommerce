import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartCard = ({item}:{item:any}) => {
    const [editting, setEditting] = useState<boolean>(false);

    const {colors} = useTheme();
  const product = item.product;

  return (
    <View
      key={item.id}
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
          padding: 10,
        }}
      >
        <Image
          source={{ uri: product.image[0] }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
        />
        <View style={{ padding: 10, width: "65%" }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.text, fontWeight: "600" }}
          >
            {product.name}
          </Text>
          <Text style={{ color: colors.textMuted, marginVertical: 5 }}>
            Quantity: {item.quantity}
          </Text>
          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            ₱{formatMoney(product.offerPrice)}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
                setEditting(!editting);
            }}
          >
            <Ionicons name="create" size={15} color={editting ? colors.danger : colors.textMuted}/>
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
