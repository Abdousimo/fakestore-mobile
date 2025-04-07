import { Stack } from "expo-router";
import './globals.css';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryProvider } from "@/providers";
import Toast from "react-native-toast-message";


export default function RootLayout() {
  return (
    <>
      <QueryProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="(AuthLayout)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="products" 
            options={{ headerShown: false }} 
          />
        </Stack>
      </QueryProvider>
      <Toast/>
    </>
  )
}
