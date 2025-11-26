import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import { formatMoney } from '@/utils/formatMoney';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({item}:{item:any}) => {
  const {colors} = useTheme();
  const styles = useHomeStyles();
  const productImage = item.image?.[0];
  const router = useRouter();
  const {getToken} = useAuth();
          const starCount = 4.5;
          const handleAddToCart = async (productId:string) => {
      try {
          const token = await getToken();

          const res = await fetch("https://next-ecommerce-silk-rho.vercel.app/api/cart/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                  productId: productId,
                  quantity: 1
              }),
          });
          const data = await res.json();

          if (!res.ok) {
              console.error("Add to cart error:", data);
              return;
          }

          router.push("/cart");

      } catch (err) {
          console.error("Add to cart failed:", err);
      }
  };

          return (
            <LinearGradient
              key={item.id}
              colors={colors.gradients.surface}
              style={[styles.card, { width: "48%" }]} // keep 2 columns
            >
              {productImage && (
                <Image
                  source={{ uri: productImage }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}

              <View style={styles.productText}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>

                {/* Stars */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: colors.text, marginRight: 5 }}>{starCount}</Text>

                  {Array.from({ length: 5 }).map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={12}
                      color={index < Math.floor(starCount) ? colors.primary : "gray"}
                    />
                  ))}
                </View>

                {/* Price + Button */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                  <View style={styles.priceRow}>
                    {item.offerPrice && <Text style={styles.offerPrice}>₱{formatMoney(item.offerPrice)}</Text>}
                    {item.price && <Text style={styles.price}>₱{formatMoney(item.price)}</Text>}
                  </View>

                  <TouchableOpacity
                    onPress={() => {handleAddToCart(item.id)}}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      borderWidth: 1,
                      borderColor: colors.text,
                      borderRadius: 50,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: colors.text }}>Buy now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          );
}

export default ProductCard