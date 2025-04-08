import { View, Text , TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { getProductById, updateProductById } from '@/api';
import { useQuery } from '@tanstack/react-query'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProductValidationSchema } from '@/validation';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message';
import { truncateText } from '@/lib/utils';

type formValidationType = z.infer<typeof updateProductValidationSchema>;

export default function UpdateProduct() {
  const {id} = useLocalSearchParams()
  const { data:product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
      } = useForm<formValidationType>({
        resolver: zodResolver(updateProductValidationSchema),
        defaultValues: {
          title: product?.title,
          description: product?.description,
          price: product?.price,
          category: product?.category,
        },
      });

      const updateMutation = useMutation({
        mutationFn: updateProductById,
        onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Product updated successfully',
          position: 'top',
        });
          
        },
        onError: (error) => {
         Toast.show({
          type: 'error',
          text1: 'Error updating product',
          position: 'top',
        });
        },
      });

      const onSubmit:SubmitHandler<formValidationType> = async (data: formValidationType) => {
        updateMutation.mutate({
            ...data ,
            id: Number(product?.id)});
      };
  return (
    <View className='flex-1 bg-white items-center justify-center px-4'>
          <Link href={"/products"} className='bg-primary text-secondary mb-10 font-bold py-2 px-6'>
            <Text className='text-lg'>Back</Text>
          </Link>
          <View className='w-full'>
            <Controller
              control={control}
              render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
              }) => (
                <View className='w-full'>
                  <TextInput
                    className='w-full my-4 border-[1px] border-border rounded-lg p-2'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={product?.title}
                  />
                </View>
              )}
              name="title"
            />
            {errors.title && (
              <Text style={{ color: "#ff8566" }}>{errors.title.message}</Text>
            )}
              
          </View>
          <View>
            <Controller
              control={control}
              render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
              }) => (
                <View className='min-w-full'>
                  <TextInput
                    className='min-w-full my-4 border-[1px] border-border rounded-lg p-2'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={truncateText(product?.description, 30)}
                  />
                </View>
              )}
              name="description"
            />
            {errors.description && (
              <Text style={{ color: "#ff8566" }}>{errors.description.message}</Text>
            )}
              
          </View>
          <View>
            <Controller
              control={control}
              render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
              }) => (
                <View className='min-w-full'>
                  <TextInput
                    className='min-w-full my-4 border-[1px] border-border rounded-lg p-2'
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, '');
                      onChange(numeric === '' ? 0 : parseInt(numeric, 10));
                    }}
                    value={value?.toString()}
                    keyboardType='numeric'
                    placeholder={product?.price?.toString()}
                  />
                </View>
              )}
              name="price"
            />
            {errors.category && (
              <Text style={{ color: "#ff8566" }}>{errors.category.message}</Text>
            )}
              
          </View>
          <View className='w-full'>
            <Controller
              control={control}
              render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    className='w-full my-4 border-[1px] border-border rounded-lg p-2'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={product?.category}
                  />
                </View>
              )}
              name="category"
            />
            {errors.category && (
              <Text style={{ color: "#ff8566" }}>{errors.category.message}</Text>
            )}

            <TouchableOpacity onPress={handleSubmit(onSubmit)} className='w-full'>
                <View className='bg-primary rounded-lg p-2'>
                  <Text className='text-white text-center'>Submit</Text>
                </View>
            </TouchableOpacity>
              
          </View>
        </View>
  )
}