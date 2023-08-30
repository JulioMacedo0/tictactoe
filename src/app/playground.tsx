import { Card } from "@/components/card";
import { Profile } from "@/components/profile";
import { RoundCounter } from "@/components/round-counter";
import { TicTacToe } from "@/components/tic-tac-toe";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/supabase/init";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, Text, FlatList, Alert } from "react-native";
import { CHANNEL_STATES } from "@/constants/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface User {
  userName: string;
  userId: string;
  userPicture: string;
}

function PlayGround() {
  const { user } = useAuth();
  const { secundary, lightSecundary } = useColors();

  const [channel, setChannel] = useState(
    supabase.channel("lobby", {
      config: {
        presence: {
          key: `${user.id}`,
        },

        broadcast: {
          ack: true,
        },
      },
    })
  );

  const [isGame, setIsGame] = useState(false);
  const [lobbyUsers, setLobbyUsers] = useState([] as User[]);

  const cleanEvents = async () => {
    await untrackPresence();
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

  const sendInivite = async ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    console.log(`sendInivite `);
    const resp = await channel.send({
      type: "broadcast",
      event: userId,
      payload: {
        id: `${user.id}`,
        userName,
      },
    });

    console.log(`send message from ${user.user_metadata.username} : ${resp}`);
  };

  const untrackPresence = async () => {
    const presenceUntrackStatus = await channel.untrack();
    console.log(presenceUntrackStatus);
  };

  const addUser = (userObj: User) => {
    if (user.id == userObj.userId) return;
    console.log(`addUser from ${user.user_metadata.username}`, userObj);
    setLobbyUsers((users) => [...users, userObj]);
  };

  const removeUser = (id: string) => {
    if (user.id == id) return;
    const users = lobbyUsers.filter((user) => user.userId != id);
    console.log(`removeUser from ${user.user_metadata.username}`, users);
    setLobbyUsers(users);
  };

  const updateUser = (syncObj: Object) => {
    const keys = Object.keys(syncObj).filter((key) => key != user.id);
    const users = new Array<User>();
    for (let key of keys) {
      const userObj = {
        userName: syncObj[key][0].userName,
        userId: syncObj[key][0].userId,
        userPicture: syncObj[key][0].userPicture,
      };
      users.push(userObj);
    }
    console.log(`updateUser from ${user.user_metadata.username}`, users);
    setLobbyUsers(users);
  };

  useEffect(() => {
    if (channel.state === CHANNEL_STATES.closed) {
      console.log(`Channel state is : ${channel.state}. Run subscriptions....`);

      const channelResp = channel
        .on("broadcast", { event: `${user.id}` }, ({ payload }) =>
          Alert.alert("Alert Title", "My Alert Msg", [
            {
              text: "Accept",
              onPress: () => console.log("Ask me later pressed"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ])
        )
        .on("presence", { event: "sync" }, () => {
          const newState = channel.presenceState();
          updateUser(newState);
        })
        .on("presence", { event: "join" }, ({ key, newPresences }) => {
          const userObj = {
            userName: newPresences[0].userName,
            userId: newPresences[0].userId,
            userPicture: newPresences[0].userPicture,
          };
          addUser(userObj);
        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
          removeUser(leftPresences[0].userId);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            const presenceTrackStatus = await channel.track({
              userName: `${user.user_metadata.username}`,
              userId: `${user.id}`,
              userPicture: "",
            });
            console.log(
              `presenceTrackStatus from ${user.user_metadata.username} is :${presenceTrackStatus}`
            );
          }
        });
      setChannel(channelResp);

      return () => {
        cleanEvents();
      };
    }
  }, []);

  console.log(`${user.user_metadata.username} render all`, lobbyUsers);

  if (isGame) {
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
        <TicTacToe />
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-background">
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          className="w-full mt-4 "
          data={lobbyUsers}
          renderItem={({ item }) => (
            <View className="flex-1 h-16 w-4/5 bg-white mx-auto rounded-xl overflow-hidden items-center justify-between flex-row">
              <Image
                className="w-1/5 h-16"
                source={"https://github.com/JulioMacedo0.png"}
                contentFit="contain"
                onError={(err) => {
                  console.log(err);
                }}
                onProgress={(event) => {
                  console.log(event);
                }}
                transition={1000}
              />

              <Text className="text-base text-center font-bold text-black mx-auto">
                {item.userName}
              </Text>
              <LinearGradient
                className="w-1/5 h-16 bg-secundary"
                colors={[secundary, lightSecundary]}
              >
                <TouchableOpacity
                  className="h-full w-full items-center "
                  onPress={() =>
                    sendInivite({
                      userId: item.userId,
                      userName: user.user_metadata.username,
                    })
                  }
                >
                  <Text className="text-base text-center font-bold text-white my-auto">
                    Invite
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        />
      </View>
    );
  }
}

export default PlayGround;
