import Moviecard from "@/components/Moviecard";
import SearchBar from "@/components/SearchBar";
import TopBar from "@/components/TopBar";
import TopMovie from "@/components/TopMovie";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies, fetchTopMovies } from "@/services/api";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(() => fetchMovies({ query: "" }));
  const {
    data: topMovies,
  } = useFetchMovies(() => fetchTopMovies());

  return (
    <>
      <TopBar logo={""} label="Dashboard" />
      <StatusBar
        translucent={true} // Rend la barre transparente (Android)
        backgroundColor="transparent" // Couleur de fond transparente
        barStyle="light-content" // Texte blanc (ou "dark-content")
      />

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
          {/* <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" /> */}

          <View className="mt-3 w-full">
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Popular movies
            </Text>
            <FlatList
              data={topMovies}
              horizontal
              // pagingEnabled
              showsHorizontalScrollIndicator={true}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <TopMovie movie={item}/>}
            />
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
