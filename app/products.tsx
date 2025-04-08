import { View, ScrollView, TextInput, Text, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api'
import Product from '@/components/Product';
import { Link } from 'expo-router';

export default function products() {

  const { data:products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return (
    <>
      <View className='fixed top-0 left-0 w-full h-20 bg-primary flex-row items-center justify-between p-4'>
          <Image 
            source={require("../assets/images/logo.png")}
            style={{ width: 100, height: 50, resizeMode: 'contain' }}
          />
          <Link href={"/"} className='bg-secondary text-primary font-bold py-2 px-6 rounded-md'>
            <Text className='text-primary'>Logout</Text>
          </Link>
        </View>
      <ScrollView className='flex-1 bg-white'>
        <View className='px-4'>
          <TextInput 
          placeholder='Search'
          className='border-border border-2 p-4 rounded-md my-4'
          />
          <TouchableOpacity
            className='bg-primary p-4 rounded-md mb-4 text-center text-lg'
            onPress={() => {}}
          >
            <Text className='text-secondary text-center'>Filter</Text>
          </TouchableOpacity>
        </View>
        <View className='px-4'>
          {products?.map((product) => (
            <Product product={product} key={product?.id}/>
          ))}
        </View> 
      </ScrollView>
    </>
  )
}