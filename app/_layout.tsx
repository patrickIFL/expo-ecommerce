import { ThemeProvider } from "@/hooks/useTheme";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";


const queryClient = new QueryClient()

export default function RootLayout() {
  return (

    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <PaperProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    title: "Home"
                  }}
                />
              </Stack>
            </PaperProvider>
          </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  ) 
}
