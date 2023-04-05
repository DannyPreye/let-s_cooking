import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TrendingCard = ({ data }) => {
    return (
        <TouchableOpacity>
            <View className="w-[280px] h-[180px] rounded-[10px] overflow-hidden">
                <Image
                    source={{ uri: data.image }}
                    className="flex-1 justify-center "
                />
            </View>
            <View className="flex-row  justify-between items-center mt-[12]">
                <Text
                    numberOfLines={1}
                    className="font-[600] text-[16px] leading-[140%] w-[225px]"
                >
                    {data.title}
                </Text>
                <Ionicons
                    name="ios-ellipsis-horizontal"
                    size={20}
                    color="black"
                />
            </View>
        </TouchableOpacity>
    );
};

export default TrendingCard;
