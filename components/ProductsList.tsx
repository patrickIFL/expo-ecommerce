import { productsDummyData } from '@/assets/assets.js';
import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import EmptyState from './EmptyState';

const ProductsList = () => {
    const {colors} = useTheme();
    const styles = useHomeStyles();

  const renderProductItem = ({ item }: { item: any }) => {
    const productImage = item.image?.[0];

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
            <View style={styles.priceRow}>
            
            {item.offerPrice && (
                <Text style={styles.offerPrice}>₱{item.offerPrice}</Text>
            )}

            {item.price && (
                <Text style={styles.price}>₱{item.price}</Text>
            )}

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
        data={productsDummyData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        numColumns={2}                   // 👈 This creates a 2-column grid
        columnWrapperStyle={styles.row}  // spacing between items
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
};

export default ProductsList;

