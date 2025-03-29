import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies } from "@/services/api";
import Moviecard from "@/components/Moviecard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import TopBar from "@/components/TopBar";

const Search = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(() => fetchMovies({ query: "iron man" }));
  return (
    <>
      <TopBar logo={""} label="Search page" />
      <View className="flex-1 bg-primary">
        <Image
          source={images.bg}
          className="absolute flex-1 w-full z-0"
          resizeMode="cover"
        />

        <FlatList
          data={movies}
          renderItem={({ item }) => <Moviecard movie={item} />}
          keyExtractor={(item) => item.id?.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 16,
            // paddingRight: 5,
            marginVertical: 16,
          }}
          className="px-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="my-5">
                <SearchBar placeholder="Search movies..." onPress={() => {}} />

                {moviesLoading && (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-10 self-center"
                  />
                )}
                {moviesError && <Text className="text-red-500 text-md my3 px-5">Error: {moviesError?.message}</Text>}
              </View>
            </>
          }
        />
      </View>
    </>
  );
};

export default Search;
