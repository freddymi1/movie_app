import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Movie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

interface Props {
  movie: Movie;
}
const TopMovie = ({ movie }: Props) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[200px] px-2">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
              {Math.round(movie.vote_average / 2)}
            </Text>
          </View>
          <Text className="text-xs text-light-300 font-medium mt-1">
            {movie.release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TopMovie;
