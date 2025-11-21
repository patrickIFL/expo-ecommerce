// import { Link } from "expo-router";
import { useHomeStyles } from "@/assets/styles/styles";
import HeaderSlider from "@/components/HeaderSlider";
import ProductsList from "@/components/ProductsList";
import TopSearchBar from "@/components/TopSearchBar";
// import LoadingSpinner from "@/components/LoadingSpinner";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const styles = useHomeStyles();

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <TopSearchBar />
        <HeaderSlider />
        <ProductsList />
      </SafeAreaView>
    </LinearGradient>
  );
}




