import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';


import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { api } from '../src/lib/api';


export default function App() {
  const router = useRouter()

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/02a7b57d61c4075cb7af',
  };

 

  const [, response, SignInWithGithub] = useAuthRequest(
    {
      clientId: '02a7b57d61c4075cb7af',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );
  
  useEffect(() => {
    console.log(response)

    console.log(makeRedirectUri({
      scheme: 'nlwspacetime'
    }))

    async function handleGithubOAuthCode(code: string) {
        const response = await api.post('register', {
            code,
        })
        
        const { token } = response.data

        await SecureStore.setItemAsync('token', token)

        console.log('aqui')
        router.push('/memories')
    }

    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOAuthCode(code)
    }
  }, [response]);

  

  return (
    <View className=' flex-1 items-center px-8 py-10'>
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        
        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>
            Sua cápsula do tempo
          </Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) 
            com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className='rounded-full bg-green-500 px-5 py-3'
          onPress={() => SignInWithGithub()}
        >
          <Text className='font-alt text-sm uppercase text-black'>
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>
        Feito com 💜 no NLW da Rocketseat
      </Text>

    </View>
  );
}

