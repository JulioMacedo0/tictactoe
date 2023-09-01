import { Card } from "@/components/card";
import { Profile } from "@/components/profile";
import { RoundCounter } from "@/components/round-counter";
import { TicTacToe } from "@/components/tic-tac-toe";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/supabase/init";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, Text, FlatList, Alert } from "react-native";
import {
  BATTLE_EVENTS,
  CHANNEL_STATES,
  RESPONSE_INVITE,
} from "@/constants/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/use-colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RealtimeChannel } from "@supabase/supabase-js";
import { getPlayer } from "@/helpers/get-player";
import { BoardValue, Game } from "@/@types/game";
import { getDraw, getWinner } from "@/helpers/get-winner";

interface User {
  userName: string;
  userId: string;
  userPicture: string;
}

function PlayGround() {
  const { user } = useAuth();
  const { secundary, lightSecundary } = useColors();
  const [battleChannel, setBattleChannel] = useState<RealtimeChannel | null>(
    null
  );
  const [channel, setChannel] = useState(
    supabase.channel("lobby", {
      config: {
        presence: {
          key: `${user?.id}`,
        },

        broadcast: {
          ack: true,
        },
      },
    })
  );

  const [game, setGame] = useState<Game>({
    rounds: 1,
    turn: "X",
    board: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    },
  });

  const resetGame = () => {
    setGame((prev) => ({
      rounds: prev.rounds + 1,
      turn: "X",
      board: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
      },
    }));
  };

  const [opponent, setOpponent] = useState<User | null>(null);

  const isGame = !!battleChannel;
  const [lobbyUsers, setLobbyUsers] = useState([] as User[]);

  const cleanEvents = async () => {
    await untrackPresence();
    const respLobby = await channel.unsubscribe();
    const respBattle = await battleChannel?.unsubscribe();
    console.log(`${user.user_metadata.username} exit lobby is: ${respLobby}`);
    console.log(`${user.user_metadata.username} exit battle is: ${respBattle}`);
  };

  const initBattleRoom = async (userId: string) => {
    const respChannel = await supabase.channel(userId, {
      config: {
        broadcast: {
          ack: true,
        },
      },
    });
    respChannel
      .on("broadcast", { event: "tic-tac" }, ({ payload }) => {
        if (payload.event === BATTLE_EVENTS.move) {
          const position = payload.position;
          const value = payload.value;
          const turn = payload.turn;
          setGame((prev) => ({
            ...prev,
            board: { ...prev.board, [position]: value },
            turn,
          }));
        } else if (payload.event === BATTLE_EVENTS.rematch) {
          Alert.alert(
            "Rematch Inivite",
            `${payload.userName} inivite you for a rematch`,
            [
              {
                text: "Accept",
                onPress: () => sendResolveRematchEvent(respChannel),
              },
              {
                text: "Cancel",
                onPress: () =>
                  sendRejectRematchEvent(
                    respChannel,
                    user.user_metadata.username
                  ),
                style: "cancel",
              },
            ]
          );
        } else if (payload.event === BATTLE_EVENTS.rematch_reject) {
          alert(`${payload.userName} reject your rematch`);
        } else if (payload.event === BATTLE_EVENTS.rematch_resolve) {
          resetGame();
        }
      })
      .subscribe();

    setBattleChannel(respChannel);
  };

  const sendGameValue = async (
    position: number,
    value: BoardValue,
    turn: BoardValue
  ) => {
    const resp = await battleChannel.send({
      type: "broadcast",
      event: "tic-tac",
      payload: {
        event: BATTLE_EVENTS.move,
        turn,
        position,
        value,
      },
    });
  };
  const sendRematchEvent = async (userName: string) => {
    const resp = await battleChannel.send({
      type: "broadcast",
      event: "tic-tac",
      payload: {
        event: BATTLE_EVENTS.rematch,
        userName,
      },
    });
  };

  const sendRejectRematchEvent = async (
    channel: RealtimeChannel,
    userName: string
  ) => {
    const resp = await channel.send({
      type: "broadcast",
      event: "tic-tac",
      payload: {
        event: BATTLE_EVENTS.rematch_reject,
        userName,
      },
    });
  };
  const sendResolveRematchEvent = async (channel: RealtimeChannel) => {
    const resp = await channel.send({
      type: "broadcast",
      event: "tic-tac",
      payload: {
        event: BATTLE_EVENTS.rematch_resolve,
      },
    });
    if (resp == "ok") {
      resetGame();
    }
  };

  const rejectInvite = async (userId: string) => {
    const resp = await channel.send({
      type: "broadcast",
      event: userId,
      payload: {
        invite: RESPONSE_INVITE.reject,
        id: `${user.id}`,
        userName: user.user_metadata.username,
      },
    });
    console.log(
      `rejectInvite from ${user.user_metadata.username} is : ${resp}`
    );
  };
  const resolveInvite = async (userId: string, userOppenet: User) => {
    const resp = await channel.send({
      type: "broadcast",
      event: userId,
      payload: {
        invite: RESPONSE_INVITE.resolve,
        id: `${user.id}`,
        userName: user.user_metadata.username,
        userPicture: user.user_metadata.userPicture,
      },
    });
    if (resp === "ok") {
      initBattleRoom(userId);
      setOpponent(userOppenet);
    }
  };
  const sendInivite = async ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    const resp = await channel.send({
      type: "broadcast",
      event: userId,
      payload: {
        invite: RESPONSE_INVITE.invitation,
        id: `${user.id}`,
        userName,
        userPicture: user.app_metadata.userPicture,
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
        .on("broadcast", { event: `${user.id}` }, ({ payload }) => {
          console.log(`====================>`, payload.id);
          if (payload.invite == RESPONSE_INVITE.reject) {
            Alert.alert(
              "Invite Rejected",
              `${payload.userName} reject your invite`
            );
          }

          if (payload.invite == RESPONSE_INVITE.invitation) {
            Alert.alert(
              "Invite to battle",
              `${payload.userName} inivite you for a battle`,
              [
                {
                  text: "Accept",
                  onPress: () =>
                    resolveInvite(payload.id, {
                      userId: payload.id,
                      userName: payload.userName,
                      userPicture: payload.userPicture,
                    }),
                },
                {
                  text: "Cancel",
                  onPress: () => rejectInvite(payload.id),
                  style: "cancel",
                },
              ]
            );
          }

          if (payload.invite == RESPONSE_INVITE.resolve) {
            initBattleRoom(user.id);
            setOpponent({
              userId: payload.userId,
              userName: payload.userName,
              userPicture: payload.userPicture,
            });
          }
        })
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

  if (isGame) {
    const playerWinner = getWinner(game.board);
    const winner = !!playerWinner;
    const playWith = getPlayer(battleChannel.topic, user.id);
    const draw = getDraw(game.board);
    return (
      <View className="flex-1 bg-background">
        <View className="flex-row px-6 justify-between  mt-4">
          <Profile
            imageUrl="https://github.com/JulioMacedo0.png"
            userName={`${user?.user_metadata.username}`}
            cardClasName="w-[120px] h-[135px]"
            playWith={playWith}
          />
          <RoundCounter roundCount={game.rounds} />
          <Profile
            imageUrl="https://github.com/wendelfreitas.png"
            userName={opponent?.userName}
            cardClasName="w-[120px] h-[135px]"
            playWith={getPlayer(battleChannel.topic, opponent.userId)}
          />
        </View>
        {winner && (
          <Text className="text-base font-bold mx-auto">
            Winner is{" "}
            {playWith === playerWinner
              ? user?.user_metadata.username
              : opponent.userName}
          </Text>
        )}
        <TicTacToe
          playWith={playWith}
          game={game}
          setGame={setGame}
          sendGameValues={sendGameValue}
          winner={winner}
        />
        {(winner || draw) && (
          <Card
            text="Play again"
            variant="rose"
            style="mt-8 mx-auto"
            onPress={() => sendRematchEvent(user?.user_metadata.username)}
          />
        )}
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-background">
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          className="w-full mt-4"
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
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
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
