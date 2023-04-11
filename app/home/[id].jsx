import {
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
} from "react-native";
import { useRouter, useSearchParams, Stack } from "expo-router";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import useFetch from "../../hooks/usefetch";
import { SPOONACULAR_API_KEY } from "@env";

const Ingredients = ({ ingredients }) => (
    <View className="w-full flex-row items-center justify-between h-[76] rounded-[10px] bg-[#f1f1f1] px-[16px] py-[12px] mt-[12px]">
        <View className="flex-row items-center gap-2">
            <Image
                source={{
                    uri: `https://spoonacular.com/recipeImages/${ingredients?.image}`,
                }}
                className="w-[56px] h-[56px] rounded-[10px]"
            />
            <Text className="capitalize font-[600] text-[16px] leading-[22.4px]">
                {ingredients?.name}
            </Text>
        </View>
        <Text className="text-[14px] leading-[19.6px] text-right font-[400] text-[#a9a9a9]">
            {ingredients?.measures?.metric?.amount}&nbsp;
            {ingredients?.measures?.metric?.unitShort}
        </Text>
    </View>
);

const RecipeDetails = () => {
    const { current, setCurrent } = useState("ingredients");
    const { id } = useSearchParams();
    const { data, isloading, reFetch, error } = useFetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    const router = useRouter();

    console.log("error", error);
    return (
        <SafeAreaView
            className="flex-1 px-[20] "
            style={{
                marginTop:
                    Platform.OS == "android" ? StatusBar.currentHeight : 0,
            }}
        >
            <View className="flex-row justify-between items-center h-[30px]">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
            {isloading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={"large"} />
                </View>
            ) : error ? (
                <View className="flex-1 items-center justify-center">
                    <Text>Something Went Wrong</Text>
                </View>
            ) : (
                <>
                    <View className="flex-1 ">
                        <Text className="w-[244] mt-[16] font-[600] text-[24px] leading-[28.8px] text-[#303030]">
                            How to make {data?.title}
                        </Text>
                        <View className="w-full h-[200] rounded-[10px] overflow-hidden mt-[12] ">
                            <Image
                                source={{ uri: data?.image }}
                                className="w-full h-full "
                            />
                        </View>
                        <View className="flex-row gap-2 items-center mt-[16]">
                            <AntDesign name="star" size={14} color="#FFB661" />
                            <Text className="font-[600] text-[14px] leading-[19.6px]">
                                Likes
                            </Text>
                            <Text className="text-[14px] leading-[19.6px] text-[#a9a9a9]">
                                ( {data?.aggregateLikes})
                            </Text>
                        </View>
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between mt-[12] mb-4">
                                <Text className="font-[600] text-[20px] leading-[24px]">
                                    Ingredients
                                </Text>
                                <Text className="font-[400] text-[14px] leading-[19.6px] text-[#a9a9a9]">
                                    {data?.extendedIngredients?.length} items
                                </Text>
                            </View>
                            <ScrollView>
                                {data?.extendedIngredients?.map((item) => (
                                    <Ingredients
                                        ingredients={item}
                                        key={item?.id}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default RecipeDetails;
