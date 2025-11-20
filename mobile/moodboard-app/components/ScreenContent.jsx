import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EditScreenInfo } from './EditScreenInfo';

export const ScreenContent = ({ title, path, children }) => {
  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-blue-300 ">
      <Text className="font-bold ">{title}</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </SafeAreaView>
  );
};

const styles = {
  container: `items-center flex-1 justify-center bg-white`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};