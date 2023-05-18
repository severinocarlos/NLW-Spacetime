import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className='bg-gray-700 flex-1 items-center justify-center'>
      <Text className='text-zinc-50 font-bold text-5xl'>SpaceTime</Text>
      <StatusBar style="light" />
    </View>
  );
}

