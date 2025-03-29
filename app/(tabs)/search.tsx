import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies } from "@/services/api";
import Moviecard from "@/components/Moviecard";
import SearchBar from "@/components/SearchBar";
import TopBar from "@/components/TopBar";
import { updateSearchMovieCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetchMovies(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(()=>{
    if(movies?.length > 0 && movies?.[0]){
      updateSearchMovieCount(searchQuery, movies?.[0])
    }
  },[movies])
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
                <SearchBar
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                  placeholder="Search movies..."
                />

                {loading && (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="mt-10 self-center"
                  />
                )}
                {error && (
                  <Text className="text-red-500 text-md my3 px-5">
                    Error: {error?.message}
                  </Text>
                )}

                {!loading &&
                  !error &&
                  searchQuery.trim() &&
                  movies?.length > 0 && (
                    <Text className="text-xl mt-3 text-white font-bold">
                      Search Results for{" "}
                      <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                  )}
              </View>
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim() ? "No movie found" : "Search for a movie"}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </>
  );
};

export default Search;
