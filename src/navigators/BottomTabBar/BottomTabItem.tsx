import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {screenWidth} from '../../theme/Variables';
import {Layout} from '../../theme';
import {useAppTheme} from '../../hooks';
import Images from '../../assets/images';
import {TabNavParamList} from '../../Typings/navigation';
import {RouteProp} from '@react-navigation/native';

interface ItemTabProps {
  /**
   * The route object which should be specified by the tab.
   */
  route: RouteProp<TabNavParamList>;
  /**
   * The `href` to use for the anchor tag on web
   */
  href?: string;
  /**
   * Whether the tab is focused.
   */
  focused: boolean;
  /**
   * Function to execute on press in React Native.
   * On the web, this will use onClick.
   */
  onPress: (
    e: React.MouseEvent<HTMLElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  /**
   * Function to execute on long press.
   */
  onLongPress: (e: GestureResponderEvent) => void;
}

const BottomTabItem: React.FC<ItemTabProps> = ({
  route,
  focused,
  onPress,
  onLongPress,
}) => {
  const {Colors} = useAppTheme();
  const bounceValue = useSharedValue(1);
  const bounce = () => {
    bounceValue.value = 0.9;
    bounceValue.value = withSpring(1);
  };
  const progress = useDerivedValue(() => {
    return withTiming(focused ? 1 : 0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const tintColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.inActiveTab, Colors.activeTab],
    );
    return {
      tintColor: tintColor,
      transform: [
        {
          scale: bounceValue.value,
        },
      ],
    };
  });

  const handleOnPress = (e: GestureResponderEvent) => {
    bounce();
    onPress(e);
  };

  return (
    <Pressable
      accessibilityLabel={`Tab-${route.name}`}
      style={[Layout.center, styles.toTabContainer]}
      onPress={handleOnPress}
      onLongPress={onLongPress}>
      <Animated.Image
        style={[styles.iIcon, {tintColor: Colors.fog}, animatedStyle]}
        source={Images.TabIcons[route.name]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toTabContainer: {
    width: screenWidth / 5,
    paddingVertical: 12,
  },
  iIcon: {
    width: 24,
    height: 24,
  },
});
export default BottomTabItem;
