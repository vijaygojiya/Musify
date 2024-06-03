import React, {createContext, useMemo} from 'react';
import {
  AnimatedStyle,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {MINI_PLAYER_HEIGHT} from '../utils/constant';

interface ContextProps {
  translateY: SharedValue<number>;
  animatedMiniPlayerStyle: AnimatedStyle;
}

export const MiniPlayerContext = createContext<ContextProps | null>(null);
export function MiniPlayerProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const translateY = useSharedValue(MINI_PLAYER_HEIGHT);
  const animatedMiniPlayerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const values = useMemo(() => {
    return {translateY, animatedMiniPlayerStyle};
  }, [animatedMiniPlayerStyle, translateY]);

  return (
    <MiniPlayerContext.Provider value={values}>
      {children}
    </MiniPlayerContext.Provider>
  );
}
