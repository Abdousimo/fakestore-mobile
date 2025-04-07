import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full px-4">
        <View className="items-center mb-8">
          <Image source={require('../assets/images/logo.png')}/>
        </View>
        <TouchableOpacity className="mb-4">
          <Link href="/signup" className="w-full text-center bg-secondary p-4 rounded-lg border-border border-2">
            <Text className="font-bold text-primary">Create an account</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/login" className="w-full text-center bg-primary p-4 rounded-lg">
            <Text className="font-bold text-secondary">Login</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
