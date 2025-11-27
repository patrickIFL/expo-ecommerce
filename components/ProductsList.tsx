import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { Text, View } from 'react-native';
import EmptyState from './EmptyState';
import ProductCard from './ProductCard';

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
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 10 }}>
        {products.map((item:any, i:number) => (
          <ProductCard key={i} item={item}/>
        ))}
      </View>
    </View>
  );
};

export default ProductsList;
