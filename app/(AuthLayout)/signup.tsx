import { View, Text , TextInput, Button, Touchable, TouchableOpacity, Image} from 'react-native'
import { z } from 'zod'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { useState } from 'react'
import { signupValidationSchema } from '@/validation'
import { Link, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query'
import { signup } from '@/api';
import Toast from 'react-native-toast-message';


type formValidationType = z.infer<typeof signupValidationSchema>;


const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<formValidationType>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formValidationType>({
    resolver: zodResolver(signupValidationSchema),
  });

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Account created successfully',
      text2: 'You can now login to your account',
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setIsSubmitted(true);
      showToast();
      reset();
    },
    onError: (error) => {
      if (error instanceof Error) {
        form.setError("root", {
          message: error.message,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<formValidationType> = (data: formValidationType) => {
    mutate(data);
  };


  return (
    <View className='flex-1 items-center justify-center px-4'>
      <View className="items-center mb-8">
        <Image source={require('../../assets/images/logo.png')}/>
      </View>
      <View className='w-full border-border border-2 rounded-md p-4'>
        <Text className='text-center font-bold text-xl'>Signup</Text>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View>
                <TextInput
                  className='my-4 border-[1px] border-border rounded-lg p-2'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Username"
                />
              </View>
            )}
            name="username"
          />
        {errors.username && (
          <Text style={{ color: "#ff8566" }}>{errors.username.message}</Text>
        )}

        <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View>
                <TextInput
                  className='my-4 border-[1px] border-border rounded-lg p-2'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                />
              </View>
            )}
            name="email"
          />
        {errors.email && (
          <Text style={{ color: "#ff8566" }}>{errors.email.message}</Text>
        )}

        <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View>
                <TextInput
                  className='my-4 border-[1px] border-border rounded-lg p-2'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType='password'
                  placeholder="Password"
                />
              </View>
            )}
            name="password"
          />
        {errors.password && (
          <Text style={{ color: "#ff8566" }}>{errors.password.message}</Text>
        )}

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View className='bg-primary rounded-lg p-2'>
            <Text className='text-white text-center'>Create an account</Text>
          </View>
        </TouchableOpacity>

        <View className="my-4 text-center text-muted-foreground text-sm flex flex-row gap-1">
            <Text>Already have an account?{" "}</Text>
            <Link className="underline" href="/login">
              login
            </Link>
          </View>
      </View>
      
    </View>
  )
}

export default Signup