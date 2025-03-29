import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  logo: any;
  label: string;
}
const TopBar = ({ logo, label }: Props) => {
  return (
    <View className="w-full fixed p-4 bg-dark-200">
      <View className="mt-12 flex-row items-center justify-between">
        <Text className="text-white">{label}</Text>
        <View className="text-white">
          <View className="relative">
            <Image
              source={icons.notif}
              className="size-7"
              tintColor="#FFFFFF"
            />
            <View className="absolute -top-2 -right-2 w-[20px] h-[20px] bg-red-700  rounded-full flex items-center justify-center">
                <Text className="text-white text-xs" numberOfLines={1}>10</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopBar;
