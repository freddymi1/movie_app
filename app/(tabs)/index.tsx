import Moviecard from "@/components/Moviecard";
import TopBar from "@/components/TopBar";
import TopMovie from "@/components/TopMovie";
import { images } from "@/constants/images";
import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies } from "@/services/api";
import { fetchTrendingMovies } from "@/services/appwrite";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function Index() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(() => fetchMovies({ query: "" }));
  const {
    data: topMovies,
    loading: trendLoading,
    error: trendError,
  } = useFetchMovies(() => fetchTrendingMovies(), true);

  return (
    <>
      <TopBar logo={""} label="Dashboard" />

      <View className="flex-1 bg-primary">
        <Image
          source={images.bg}
          className="absolute flex-1 w-full z-0"
          resizeMode="cover"
        />

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 10,
          }}
        >
          <View className="mt-3 w-full">
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Popular movies
            </Text>

            {trendLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : trendError ? (
              <Text>Error: {trendError?.message}</Text>
            ) : (
              <FlatList
                data={topMovies}
                horizontal
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item.movie_id.toString()}
                renderItem={({ item }) => <TopMovie movie={item} />}
              />
            )}
          </View>

          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text>Error: {moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest movies
                </Text>

                <FlatList
                  data={movies}
                  renderItem={({ item }) => <Moviecard movie={item} />}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
