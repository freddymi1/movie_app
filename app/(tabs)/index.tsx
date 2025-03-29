import Moviecard from "@/components/Moviecard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
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
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(() => fetchMovies({ query: "iron man" }));

  return (
    <>
      <StatusBar
        translucent={true} // Rend la barre transparente (Android)
        backgroundColor="transparent" // Couleur de fond transparente
        barStyle="light-content" // Texte blanc (ou "dark-content")
      />
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 10,
          }}
        >
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

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
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search movie title, actor, genre..."
              />

              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest movies
                </Text>

                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <Moviecard movie={item}/>
                  )}
                  keyExtractor={(item)=>item.id}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent:'flex-start',
                    gap:20,
                    paddingRight: 5,
                    marginBottom: 10
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
