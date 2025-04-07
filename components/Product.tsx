import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ProductType } from '@/entities'
import { Link} from 'expo-router'
 
type ProductProps = {
    product: ProductType
}

export default function Product({product}: ProductProps) {
  return (
    <View className='w-full border-border p-4 border-2 mb-4 rounded-md'>
        <Text className='font-bold text-lg mb-4'>{product.title}</Text>
        <View>
           <Image 
              source={{ uri : product?.image}}  
              style= {{ height:100, width: '100%' , resizeMode : 'contain'}}
           />
        </View>
        <View className='w-full flex-row justify-between  mt-8'>
            <View>
                <Text className='font-bold'>{product.category}</Text>
            </View>
            <View>
                <Text className='font-bold'>{product.price} $</Text>
            </View>
        </View>
        <View className='pt-6 flex-row justify-between'>
            <TouchableOpacity className='bg-primary p-2 rounded-md '>
                <Link href={`/products/${product?.id}`}>
                    <Text className='text-secondary'>Details</Text>
                </Link> 
            </TouchableOpacity>
            <TouchableOpacity className='bg-primary p-2 rounded-md '>
                <Link href={`/products/${product?.id}`}>
                    <Text className='text-secondary'>Update</Text>
                </Link> 
            </TouchableOpacity>
            <TouchableOpacity className='bg-red-500 p-2 rounded-md '>
                <Link href={`/products/${product?.id}`}>
                    <Text className='text-secondary'>Remove</Text>
                </Link> 
            </TouchableOpacity>
        </View>
    </View>
  )
}