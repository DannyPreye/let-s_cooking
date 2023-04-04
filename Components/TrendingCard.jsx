import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TrendingCard = ({ data }) => {
    return (
        <View>
            <View className="w-[280px] h-[180px] rounded-[10px]">
                <ImageBackground
                    source={data.image}
                    className="flex-1 justify-center "
                ></ImageBackground>
                <View className="flex-row  justify-between items-center">
                    <Text></Text>{" "}
                    <Ionicons
                        name="ios-ellipsis-horizontal"
                        size={24}
                        color="black"
                    />
                </View>
            </View>
        </View>
    );
};

export default TrendingCard;
