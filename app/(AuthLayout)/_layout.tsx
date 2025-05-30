import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen 
            name="login" 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="signup" 
            options={{ headerShown: false }} 
        />
    </Stack>
  )
}