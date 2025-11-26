import { useHomeStyles } from "@/assets/styles/styles";
import HeaderSlider from "@/components/HeaderSlider";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductsList from "@/components/ProductsList";
import TopSearchBar from "@/components/TopSearchBar";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const styles = useHomeStyles();

  const {
    data: products = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://next-ecommerce-silk-rho.vercel.app/api/product/list`
      );
      if (!data.success) throw new Error(data.message || 'Failed to fetch product');
      return data.products;
    },
  });

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
              tintColor={colors.primary}       // iOS indicator color
              colors={[colors.primary]}         // Android indicator color
            />
          }
        >
          <TopSearchBar />
          
          <HeaderSlider />

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <Text style={{ color: 'red' }}>{(error as Error).message}</Text>
          ) : (
            <ProductsList products={products} />
          )}
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  );
}
