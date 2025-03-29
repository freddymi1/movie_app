import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import TopBar from "@/components/TopBar";

const Saved = () => {
  return (
    <>
      <TopBar logo={""} label="Saved" />
      <View className="flex-1 bg-primary px-5">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.save} className="size-10" tintColor={"#FFF"} />
          <Text className="font-bold text-white text-2xl">Saved</Text>
        </View>
      </View>
    </>
  );
};

export default Saved;
