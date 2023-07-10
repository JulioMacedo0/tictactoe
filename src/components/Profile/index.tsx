import { View, Text } from "react-native";
import { Image } from "expo-image";

interface ProfileProps {
  imageUrl: string;
}

export const Profile = ({ imageUrl }: ProfileProps) => {
  return (
    <View className="bg-white w-[180px] h-[80px] justify-end items-center pb-4 rounded-3xl  mt-[60px] ">
      <View className="bg-white rounded-full overflow-hidden border-4 border-white w-[70px] h-[70px] self-center absolute -top-[35px]">
        <Image
          className="w-full h-full"
          source={imageUrl}
          contentFit="contain"
          onError={(err) => {
            console.log(err);
          }}
          onProgress={(event) => {
            console.log(event);
          }}
          transition={1000}
        />
      </View>
      <Text className="text-base font-bold">Julio Macedo</Text>
    </View>
  );
};
