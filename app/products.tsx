import { View, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api'
import Product from '@/components/Product';

export default function products() {

  const { data:products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='px-4'>
        {products?.map((product) => (
          <Product product={product} key={product?.id}/>
        ))}
      </View> 
    </ScrollView>
  )
}