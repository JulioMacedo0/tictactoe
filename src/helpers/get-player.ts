export const getPlayer = (roomName: string, id: string) => {
  const room = roomName.replace("realtime:", "");

  if (room == id) {
    return "X";
  } else {
    return "O";
  }
};
