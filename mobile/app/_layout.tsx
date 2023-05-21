import blurBg from '../src/assets/luz.png'
import Stripes from '../src/assets/stripes.svg'

import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'
  
import {
BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

  import * as SecureStore from 'expo-secure-store';
import { ImageBackground } from 'react-native'
import { styled } from "nativewind"
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

const StyleStripes = styled(Stripes)

export default function layout() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold
    })

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            setIsUserAuthenticated(!!token)
        })
        
    }, [])


    if (!hasLoadedFonts) {
        return <SplashScreen />
    }

    return (
        <ImageBackground
            source={blurBg} 
            className='relative bg-gray-900 flex flex-1'
            imageStyle={{ position: 'absolute', left: '-100%'}}
        >
     
            <StyleStripes className='absolute left-2' />
            <StatusBar style="light" translucent/>

            <Stack 
                screenOptions={{ 
                    headerShown : false, 
                    contentStyle: {backgroundColor: 'transparent'} 
                }}
            >
                <Stack.Screen name="index" redirect={isUserAuthenticated}/>
                <Stack.Screen name="memories"/>
                <Stack.Screen name="new"/>
                
            </Stack>

        </ ImageBackground>
    )
}