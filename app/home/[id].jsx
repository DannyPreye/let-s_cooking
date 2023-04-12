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
    SectionList,
} from "react-native";
import { useRouter, useSearchParams, Stack } from "expo-router";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

import useFetch from "../../hooks/usefetch";
import { SPOONACULAR_API_KEY } from "@env";

const Ingredient = ({ ingredient }) => (
    <View className="w-full flex-row items-center justify-between h-[76] rounded-[10px] bg-[#f1f1f1] px-[16px] py-[12px] mt-[12px]">
        <View className="flex-row items-center gap-2">
            <Image
                source={{
                    uri: `https://spoonacular.com/recipeImages/${ingredient?.image}`,
                }}
                className="w-[56px] h-[56px] rounded-[10px]"
            />
            <Text className="capitalize w-[50%] font-[600] text-[16px] leading-[22.4px]">
                {ingredient?.name}
            </Text>
        </View>
        <Text className="text-[14px] leading-[19.6px] text-right font-[400] text-[#a9a9a9]">
            {ingredient?.measures?.metric?.amount}&nbsp;
            {ingredient?.measures?.metric?.unitShort}
        </Text>
    </View>
);
const menu = ["Description", "Ingredients", "Instructions"];

const MenuOption = ({ handlePress, currentMenu, item }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            className={`px-4 py-2 rounded-full ${
                currentMenu == item ? "bg-[#E23E3E]" : "bg-[#a9a9a9]"
            }`}
        >
            <Text
                className={`${
                    currentMenu == item ? "text-white" : "text-[#313030]"
                } font-[600] text-[14px]`}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
};

const RecipeDetails = () => {
    const [currentMenu, setCurrentMenu] = useState("Description");
    const { id } = useSearchParams();
    const { data, isloading, reFetch, error } = useFetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    const router = useRouter();

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
                            <View className="mt-[16px]">
                                <FlatList
                                    data={menu}
                                    renderItem={({ item, index }) => (
                                        <MenuOption
                                            item={item}
                                            handlePress={() =>
                                                setCurrentMenu(item)
                                            }
                                            currentMenu={currentMenu}
                                        />
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ columnGap: 4 }}
                                />
                            </View>
                            {currentMenu == "Ingredients" ? (
                                <Ingredients data={data} />
                            ) : currentMenu == "Description" ? (
                                <Description textBody={data?.summary} />
                            ) : (
                                <Instructions
                                    instructions={
                                        data?.analyzedInstructions[0]?.steps
                                    }
                                />
                            )}
                        </View>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default RecipeDetails;

function Ingredients({ data }) {
    return (
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
                    <Ingredient ingredient={item} key={item?.id} />
                ))}
            </ScrollView>
        </View>
    );
}
const Description = ({ textBody }) => (
    <View className="flex-1 mt-[16px]">
        <WebView
            allowsLinkPreview
            originWhitelist={["*"]}
            source={{
                html: `
                <style> a{color:black; text-decoration:none;}</style>
                <div style="font-size:16px; font-weight:600; margin-top:12px;">${textBody} </div>`,
            }}
            t
            style={{ fontSize: 14 }}
        />
    </View>
);

const Instructions = ({ instructions }) => {
    const sectionType = instructions.reduce((newData, item, index, data) => {
        newData.push({
            title: `Step ${item.number.toString()}`,
            data: data,
        });
        return newData;
    }, []);

    return (
        <View className="flex-1 mt-[16px]">
            <SectionList
                sections={sectionType}
                // key={(item, index) => `instruction${index}`}
                renderItem={({ item, index, section }) => {
                    console.log(item);
                    return (
                        <View className="mt-2" key={index}>
                            <Text className="text-justify">{item?.step}</Text>
                        </View>
                    );
                }}
                renderSectionHeader={({ section }) => (
                    <Text className="font-[600] text-[16px]">
                        {section.title}
                    </Text>
                )}
            />
        </View>
    );
};
