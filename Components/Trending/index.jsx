import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRef } from "react";

import TrendingCard from "./TrendingCard";
import useFetch from "../../hooks/usefetch";
import React from "react";
import { SPOONACULAR_API_KEY } from "@env";
const Trending = () => {
    const { data, isloading, error } = useFetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=9&tags=vegetarian,vegan,glutenFree,dairyFree`
    );
    const { width } = Dimensions.get("screen");
    const scrollX = useRef(new Animated.Value(0)).current;

    // const inputRange = [
    //     -1,
    //     0,
    //     (width * 0.1 + 15) * index,
    //     (width * 0.1 + 15) * (index + 3),
    // ];

    return (
        <View className="w-[90%] ">
            <View className="flex-row items-center justify-between mt-[12] ">
                <Text className="text-[20px] font-[600] leading-[28px]">
                    Trending now 🔥
                </Text>
                <TouchableOpacity className="flex-row space-x-2 items-center justify-center">
                    <Text className="text-[#E23E3E] font-[600] text-[14px] leading-[19.6px]">
                        See all
                    </Text>
                    <Feather name="arrow-right" size={20} color="#E23E3E" />
                </TouchableOpacity>
            </View>
            <View className="mt-12">
                {isloading ? (
                    <ActivityIndicator size={"large"} color={"#E23E3E"} />
                ) : error ? (
                    <Text>Something Went Wrong</Text>
                ) : (
                    <FlatList
                        data={data.recipes}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) => <TrendingCard data={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: 16 }}
                    />
                )}
            </View>
        </View>
    );
};

export default Trending;
