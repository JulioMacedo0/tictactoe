import { Card } from "@/components/card";
import { Profile } from "@/components/profile";
import { RoundCounter } from "@/components/round-counter";
import { TicTacToe } from "@/components/tic-tac-toe";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/supabase/init";
import { useEffect, useState } from "react";

import { View, Text, FlatList } from "react-native";

interface User {
  userName: string;
  userId: string;
  userPicture: string;
}

function PlayGround() {
  const { user } = useAuth();
  console.log("PlayGround render");
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

  const sendInivite = async () => {
    console.log(`sendInivite `);
    const resp = await channel.send({
      type: "broadcast",
      event: "invite",
      payload: {
        id: `${user.id}`,
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
    setLobbyUsers((users) => [...users, userObj]);
  };

  const removeUser = (id: string) => {
    if (user.id == id) return;
    const users = lobbyUsers.filter((user) => user.userId != id);
    setLobbyUsers(users);
  };

  const updateUser = (syncObj: Object) => {
    const keys = Object.keys(syncObj).filter((key) => key != user.id);

    const users = new Array<User>();

    for (let key of keys) {
      console.log(`userSync UnitObjt`, syncObj[key][0]);
      const userObj = {
        userName: syncObj[key][0].userName,
        userId: syncObj[key][0].userId,
        userPicture: syncObj[key][0].userPicture,
      };
      users.push(userObj);
    }
    setLobbyUsers(users);
  };

  useEffect(() => {
    console.log("useEffect runs");

    const channelResp = channel
      .on("broadcast", { event: `${user.id}` }, ({ payload }) =>
        alert(`${payload.user} inivite you for a game`)
      )
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        console.log(`event sync from ${user.user_metadata.username}`, newState);
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
  }, []);

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
        <Card text="Send msg" variant="gold" onPress={() => sendMsg()} />
        <Card
          text="Send inivite"
          variant="gold"
          onPress={() => sendInivite()}
        />
        <TicTacToe />
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-background">
        <FlatList
          data={lobbyUsers}
          renderItem={({ item }) => <Text>{item.userName}</Text>}
        />
      </View>
    );
  }
}

export default PlayGround;
