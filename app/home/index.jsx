import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TextInput,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

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

                <>
                    <View className="flex-row items-center w-[90%] justify-between mt-[12]">
                        <Text className="text-[20px] font-[600] leading-[28px]">
                            Trending now 🔥
                        </Text>
                        <TouchableOpacity className="flex-row space-x-3 items-center justify-center">
                            <Text className="text-[#E23E3E] font-[600] text-[14px] leading-[19.6px]">
                                Show all
                            </Text>
                            <Feather
                                name="arrow-right"
                                size={16}
                                color="#E23E3E"
                            />
                        </TouchableOpacity>
                    </View>
                </>
            </View>
        </ScrollView>
    );
};

export default index;
