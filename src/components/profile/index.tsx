import { View, Text } from "react-native";
import { Image } from "expo-image";
import { X } from "@components/x";
import { O } from "../o";
import { PlayWithCard } from "../playWithCard";
import LottieView from "lottie-react-native";
interface ProfileProps {
  imageUrl: string;
  userName: string;
  cardClasName?: string;
  imgClassName?: string;
  playWith?: "X" | "O";
}

export const Profile = ({
  imageUrl,
  userName,
  cardClasName,
  imgClassName,
  playWith,
}: ProfileProps) => {
  return (
    <View
      className={`bg-white items-center pb-4 rounded-3xl w-[180px] h-[80px] mt-[35px] ${cardClasName} `}
    >
      <View
        className={`bg-white rounded-full overflow-hidden border-4 border-white w-[70px] h-[70px]  absolute -top-[35px] ${imgClassName}`}
      >
        {imageUrl ? (
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
        ) : (
          <View className="w-full h-full">
            <LottieView
              autoPlay
              source={require("@lotties/picture-loading.json")}
            />
          </View>
        )}
      </View>
      {userName ? (
        <Text className="text-base font-bold mt-[35px] ">{userName}</Text>
      ) : (
        <View className="mt-[35px]  w-full h-11">
          <LottieView autoPlay source={require("@lotties/text-loading.json")} />
        </View>
      )}

      {playWith ? <PlayWithCard size={45} type={playWith} /> : null}
    </View>
  );
};
