import { View, Text } from 'react-native'
import React from 'react'

interface Props{
    label: string,
    value?: string | number | null
}
const MovieInfo = ({label, value}:Props) => {
  return (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-light-200 font-normal text-sm'>{label}</Text>
      <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
    </View>
  )
}

export default MovieInfo