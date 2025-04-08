import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ProductType } from '@/entities'
import { Link} from 'expo-router'
 import { useMutation } from '@tanstack/react-query'
import { deleteProductById } from '@/api'
import Toast from 'react-native-toast-message'

type ProductProps = {
    product: ProductType
}




export default function Product({product}: ProductProps) {

    const deleteMutation = useMutation({
        mutationFn: deleteProductById,
        onSuccess: () => {
         Toast.show({
            type: 'success',
            text1: 'Product deleted successfully',
            position: 'top',    
        });
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Error deleting product',
            position: 'top',
          });
        },
      });
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
                <Link href={`/details/${product?.id}`}>
                    <Text className='text-secondary'>Details</Text>
                </Link> 
            </TouchableOpacity>
            <TouchableOpacity className='bg-primary p-2 rounded-md '>
                <Link href={`/update/${product?.id}`}>
                    <Text className='text-secondary'>Update</Text>
                </Link> 
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => deleteMutation.mutate(product?.id)}
                className='bg-red-500 p-2 rounded-md'
            >
                <Text className='text-secondary'>Remove</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}