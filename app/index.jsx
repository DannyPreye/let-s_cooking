import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { background } from "../assets";
import { AntDesign, Foundation } from "@expo/vector-icons";

const index = () => {
    const router = useRouter();
    return (
        <>
            <View className=" flex-1 ">
                <ImageBackground
                    source={background}
                    className="flex-1 justify-center"
                >
                    <View className="flex-1 justify-between items-center  px-[73px] py-[68px]">
                        <View className="flex-row items-center justify-center">
                            {/* <Foundation name="star" size={16} color="white" /> */}
                            <Text className="text-white mt-[30] font-[400] text-[16px] leading-[22.4px]">
                                60k+ premium recipes
                            </Text>
                        </View>
                        <View>
                            <Text className="font-[600] text-[56px] leading-[67.2px] text-center  text-white">
                                Let&apos;s Cooking
                            </Text>
                            <Text className="text-center leading-[22.4px] text-[16px] text-white font-[400]">
                                Find best recipes for cooking
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push("/home")}
                                className="mt-[40px] w-[206px] space-x-3 flex-row bg-[#e23e3e] justify-center items-center rounded-[10px] h-[54px] "
                            >
                                <Text className="font-[600] text-[16px] leading-[22.4px] text-white">
                                    Start Cooking
                                </Text>
                                <AntDesign
                                    name="arrowright"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};

export default index;
