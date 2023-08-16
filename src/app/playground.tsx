import { Card } from "@/components/card";
import { Profile } from "@/components/profile";
import { RoundCounter } from "@/components/round-counter";
import { TicTacToe } from "@/components/tic-tac-toe";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/supabase/init";
import { useEffect, useState } from "react";

import { View } from "react-native";

function PlayGround() {
  const { user } = useAuth();
  console.log("PlayGround render");
  const [channel, setChannel] = useState(
    supabase.channel("lobby", {
      config: {
        broadcast: {
          ack: true,
        },
      },
    })
  );

  const cleanSubscribe = async () => {
    console.log(`cleanSubscribe channel state: ${channel.state}`);
    const resp = await channel.unsubscribe();
    console.log(`${user.user_metadata.username} exit subscribe is: ${resp}`);
  };

  const sendMsg = async () => {
    console.log(`sendMsg channel state: ${channel.state}`);
    const resp = await channel.send({
      type: "broadcast",
      event: "tic-tac",
      payload: {
        message: "hello, world",
      },
    });

    console.log(`send message from ${user.user_metadata.username} : ${resp}`);
  };

  useEffect(() => {
    console.log("useEffect runs");

    const channelResp = channel
      .on("broadcast", { event: "tic-tac" }, ({ payload }) =>
        alert(payload.message)
      )
      .subscribe((status) =>
        console.log(
          `${user.user_metadata.username} subscribe channel => ${status}`
        )
      );
    setChannel(channelResp);

    return () => {
      cleanSubscribe();
    };
  }, []);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row px-6 justify-between  mt-4">
        <Profile
          imageUrl="https://github.com/JulioMacedo0.png"
          userName={`${user.user_metadata.username}`}
          cardClasName="w-[120px] h-[135px]"
          playWith="X"
        />
        <RoundCounter roundCount={1} />
        <Profile
          imageUrl="https://github.com/wendelfreitas.png"
          userName="Wendel Freitas"
          cardClasName="w-[120px] h-[135px]"
          playWith="O"
        />
      </View>
      <Card text="Send msg" variant="gold" onPress={() => sendMsg()} />
      <TicTacToe />
    </View>
  );
}

export default PlayGround;
