import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import EmptyState from './EmptyState';

const ProductsList = ({products}) => {
    const {colors} = useTheme();
    const styles = useHomeStyles();

  const renderProductItem = ({ item }: { item: any }) => {
    const productImage = item.image?.[0];
    const starCount = 4.5;

    return (
      <LinearGradient 
      colors={colors.gradients.surface}
      style={styles.card}>
        {productImage && (
          <Image
            source={{ uri: productImage }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.productText}>
            <Text 
                style={styles.name}
                numberOfLines={1}
            >{item.name}</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{ color: colors.text, marginRight: 5 }}>{starCount}</Text>
              {Array.from({ length: 5 }).map((_, index) => (
                        <Ionicons
                            key={index}
                            name='star'
                            size={12}
                            color={
                                index < Math.floor(starCount) // star ratings go here
                                    ? colors.primary
                                    : "gray"                            }
                            alt="star_icon"
                        />
                    ))}
            </View>
            <View style={{flexDirection: "row"}}>

            <View style={styles.priceRow}>
            
            {item.offerPrice && (
                <Text style={styles.offerPrice}>₱{item.offerPrice}</Text>
            )}

            {item.price && (
                <Text style={styles.price}>₱{item.price}</Text>
            )}

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
  };

  return (
    <View style={{ flex: 1, marginVertical:20 }}>
        <View style={styles.titleWrapper}>
            <Text style={styles.title} >Our 
                <Text style={{ color: colors.primary, fontWeight:500 }}>{" "}Products</Text>
                </Text>
        </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}                   // 👈 This creates a 2-column grid
        columnWrapperStyle={styles.row}  // spacing between items
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
};

export default ProductsList;

