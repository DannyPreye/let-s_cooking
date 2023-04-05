import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";

import { SPOONACULAR_API_KEY } from "@env";
import useFetch from "../../hooks/usefetch";
import { Trending } from "../../Components";

const index = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-1 pt-[50px] items-center">
                <View className="w-[90%]">
                    <Text className="font-[600] text-[24px] leading-[28.8px] w-[207px]">
                        Find best recipes for cooking
                    </Text>
                </View>

                <View className="mt-[20px]">
                    <TextInput
                        placeholder="Search Recipe"
                        className="w-[335px] px-[12px] py-[16px]  border-[1px] rounded-[10px]  border-[#d9d9d9]"
                    />
                </View>

                <Trending />
            </View>
        </ScrollView>
    );
};

export default index;
