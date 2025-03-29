import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Movie, TrendingMovie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

interface Props {
  movie: TrendingMovie;
}
const TopMovie = ({ movie }: Props) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-[150px] relative px-2">
        <Image
          source={{
            uri: movie.poster_url
              ? `${movie.poster_url}`
              : "https://placehold.com/600*400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
        <View className="flex-row items-center justify-between gap-x-1">
          <View className="flex-row gap-x-1 items-center">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(movie.count)}
            </Text>
          </View>
          {/* <Text className="text-xs text-light-300 font-medium mt-1">
            {movie.?.split("-")[0]}
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TopMovie;
