import { View, Text , TextInput, Button, Touchable, TouchableOpacity, Image} from 'react-native'
import { z } from 'zod'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { useState } from 'react'
import { loginValidationSchema } from '@/validation'
import { Link } from 'expo-router';
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router';
import { login } from '@/api';

type formValidationType = z.infer<typeof loginValidationSchema>;


const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const form = useForm<formValidationType>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<formValidationType>({
    resolver: zodResolver(loginValidationSchema),
  });


  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => { 
    router.push("/product/[id]")
    },
    onError: (error) => {
    if (error instanceof Error) {
        setError("root", {
        message: "Invalid username or password",
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
        <Text className='text-center font-bold text-xl'>Login</Text>
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

      {errors.root && errors.root.message && (
        <Text className="text-red-500 text-center mb-2">
          {errors.root?.message}
        </Text>
      )}

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View className='bg-primary rounded-lg p-2'>
            <Text className='text-white text-center'>login</Text>
          </View>
        </TouchableOpacity>

        <View className="my-4 text-center text-muted-foreground text-sm flex flex-row gap-1">
            <Text>Already have an account?{" "}</Text>
            <Link className="underline" href="/signup">
              signup
            </Link>
          </View>
      </View>
      
    </View>
  )
}

export default Login