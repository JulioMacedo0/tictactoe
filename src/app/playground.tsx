import { Profile } from "@/components/profile";
import { RoundCounter } from "@/components/round-counter";
import { TicTacToe } from "@/components/tic-tac-toe";


import { View } from "react-native";

function PlayGround() {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row px-6 justify-between  mt-4">
        <Profile
          imageUrl="https://github.com/JulioMacedo0.png"
          userName="Julio Macedo"
          cardClasName="w-[120px] h-[135px]"
          playWith="X"
        />
        <RoundCounter roundCount={1}/>
        <Profile
          imageUrl="https://github.com/wendelfreitas.png"
          userName="Wendel Freitas"
          cardClasName="w-[120px] h-[135px]"
          playWith="O"
        />
      </View>

      <TicTacToe />
      
    </View>
  );
}

export default PlayGround;
