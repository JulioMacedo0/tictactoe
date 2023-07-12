import { useCorlos } from '@/hooks/useColors';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Button,
  Pressable,
} from 'react-native';

export const TicTacToe = () => {
  return (
    <View className="h-[40%] w-[90%] mx-auto mt-8">
      <View
        className="flex-1 bg-white p-1 overflow-hidden"
        style={styles.border}
      >
        <View className="flex-1 p-4 bg-secundary rounded-2xl overflow-hidden divide-y-2 divide-dashed divide-white">
          <View className="flex-1 flex-row divide-x-2 divide-dashed divide-white">
            <TouchableOpacity
              className="flex-1 bg-secundary "
              onPress={() => console.log('tapped 1')}
            />
            <TouchableOpacity className="flex-1 bg-secundary " />
            <TouchableOpacity className="flex-1 bg-secundary " />
          </View>

          <View className="flex-1  flex-row divide-x-2 divide-dashed divide-white">
            <TouchableOpacity className="flex-1 bg-secundary " />
            <TouchableOpacity className="flex-1 bg-secundary " />
            <TouchableOpacity className="flex-1 bg-secundary " />
          </View>

          <View className="flex-1 flex-row divide-x-2 divide-dashed divide-white">
            <TouchableOpacity className="flex-1 bg-secundary " />
            <TouchableOpacity className="flex-1 bg-secundary " />
            <TouchableOpacity className="flex-1 bg-secundary " />
          </View>
        </View>
      </View>
    </View>
  );
};
const { secundary } = useCorlos();
const styles = StyleSheet.create({
  border: {
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: secundary,
  },
});
