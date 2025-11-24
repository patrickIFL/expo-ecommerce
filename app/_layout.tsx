import { ThemeProvider } from "@/hooks/useTheme";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (

    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="(tabs)"
                options={{
                  title: "Home"
                }}
              />
            </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  ) 
}
