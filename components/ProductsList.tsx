import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import EmptyState from './EmptyState';

const ProductsList = ({ products }:{ products:any }) => {
  const { colors } = useTheme();
  const styles = useHomeStyles();

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={{ flex: 1, marginVertical: 20 }}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          Our <Text style={{ color: colors.primary, fontWeight: 500 }}>Products</Text>
        </Text>
      </View>

      {/* GRID */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 15 }}>
        {products.map((item:any) => {
          const productImage = item.image?.[0];
          const starCount = 4.5;

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
                    {item.offerPrice && <Text style={styles.offerPrice}>₱{item.offerPrice}</Text>}
                    {item.price && <Text style={styles.price}>₱{item.price}</Text>}
                  </View>

                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      borderWidth: 1,
                      borderColor: colors.text,
                      borderRadius: 50,
                    }}
                    onPress={() => console.log("Buy now")}
                  >
                    <Text style={{ fontSize: 12, color: colors.text }}>Buy now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          );
        })}
      </View>
    </View>
  );
};

export default ProductsList;
