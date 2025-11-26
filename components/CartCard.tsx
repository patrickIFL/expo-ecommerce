import useTheme from "@/hooks/useTheme";
import { formatMoney } from "@/utils/formatMoney";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartCard = ({ item }: { item: any }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const { getToken } = useAuth();
  const { colors } = useTheme();
  const product = item.product;
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(item.quantity)

  const { mutate: updateCartQuantity } = useMutation({
    mutationFn: async (data: { cartItemId: string; quantity: number }) => {
      const token = await getToken();

      const res = await fetch(`https://next-ecommerce-silk-rho.vercel.app/api/cart/update/${data.cartItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: data.quantity }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

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

          {isEditting ? (
            <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
              
              <Text style={{ color: colors.textMuted, marginVertical: 5 }}>
              Quantity:{" "}
            </Text>
              <TouchableOpacity
              onPress={() => {
                if(quantity > 0){
                  setQuantity(quantity-1);
                }
                if(quantity <= 1){
                  updateCartQuantity({
                    cartItemId: item.id,
                    quantity: 0,
                  })
                }
              }}
            >
              <Ionicons name="chevron-back" size={15} color={colors.primary} />
            </TouchableOpacity>
              <Text style={{ color: colors.text, marginVertical: 5 }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setQuantity(quantity+1);
              }}
            >
              <Ionicons name="chevron-forward" size={15} color={colors.primary} />
            </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ color: colors.textMuted, marginVertical: 5 }}>
              Quantity: {item.quantity}
            </Text>
          )}

          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            ₱{formatMoney(product.offerPrice)}
          </Text>
        </View>

        <View style={{ alignItems: "center", justifyContent: "space-between" }}>
          {isEditting ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  //quantity changed: update database
                  if(quantity !== item.quantity){
                    updateCartQuantity({
                      cartItemId: item.id,
                      quantity,
                    })
                  }
                  setIsEditting(!isEditting);
                }
                  }
              >
                <Ionicons
                  name="checkbox-sharp"
                  size={15}
                  color={colors.success}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  updateCartQuantity({
                    cartItemId: item.id,
                    quantity: 0,
                  })
                }
              >
                <Ionicons name="trash" size={15} color={colors.danger} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsEditting(!isEditting);
              }}
            >
              <Ionicons name="create" size={15} color={colors.warning} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CartCard;
