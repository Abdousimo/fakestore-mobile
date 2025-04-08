import { View, Text , Image} from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { getProductById } from '@/api';
import { useQuery } from '@tanstack/react-query'

export default function Details() {
  const {id} = useLocalSearchParams()
  const { data:product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });
  return (
    <View className='flex-1 bg-white items-center justify-center px-4'>
        <Link href={"/products"} className='bg-primary text-secondary mb-10 font-bold py-2 px-6'>
          <Text className='text-lg'>Back</Text>
        </Link>
        <View>
          <Text className='font-bold text-lg mb-4'>{product?.title}</Text>
          <View className='mb-4'>
              <Image 
                source={{ uri : product?.image}}  
                style= {{ height:100, width: '100%' , resizeMode : 'contain'}}
              />
          </View>
          <Text className='text-sm mt-4'>{product?.description}</Text>
          <View className='w-full flex-row justify-between  mt-8'>
              <View>
                  <Text className='font-bold'>{product?.category}</Text>
              </View>
              <View>
                  <Text className='font-bold'>{product?.price} $</Text>
              </View>
          </View>
          <View className='w-full flex-row justify-between  mt-8'>
              <View>
                  <Text className='font-bold'>rate:{product?.rating?.rate}</Text>
              </View>
              <View>
                <Text className='font-bold'>count:{product?.rating?.count}</Text>
              </View>
          </View>
        </View>
    </View>
  )
}