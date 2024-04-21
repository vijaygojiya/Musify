import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BottomTabBarHeightCallbackContext,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {TabRoutes} from './routes';
import {Layout} from '../theme';
import {useAppTheme} from '../hooks';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  CommonActions,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import BottomTabItem from './BottomTabBar/BottomTabItem';
import {TabNavParamList} from '../Typings/navigation';
import {getPaddingBottom} from '../utils/helper';

const Tabs = Object.values(TabRoutes);

const TAB_ITEM_WIDTH = Dimensions.get('screen').width / Tabs.length;

const TabBar: React.FC<BottomTabBarProps> = ({
  state,

  navigation,
  insets,
}) => {
  const {index: routeIndex, routes} =
    state as TabNavigationState<TabNavParamList>;

  const onHeightChange = React.useContext(BottomTabBarHeightCallbackContext);

  const barPosition = useDerivedValue(() => {
    return withTiming(routeIndex * TAB_ITEM_WIDTH, {
      duration: 100,
    });
  });

  const {Colors} = useAppTheme();

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: barPosition.value}],
    };
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    onHeightChange?.(height);
  };
  const paddingBottom = getPaddingBottom(insets.bottom);

  const renderTabItem = (route: RouteProp<TabNavParamList>, index: number) => {
    const focused = index === state.index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(route),
          target: state.key,
        });
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };
    return (
      <BottomTabItem
        key={route.key}
        route={route}
        focused={focused}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    );
  };

  return (
    <View
      style={[
        styles.view,
        {backgroundColor: Colors.bottomTabBg},
        {
          paddingBottom,
          paddingHorizontal: Math.max(insets.left, insets.right),
        },
      ]}
      onLayout={handleLayout}>
      <Animated.View
        style={[Layout.absolute, styles.barIndicatorContainer, animStyle]}>
        <View style={styles.barIndicator} />
      </Animated.View>
      <View accessibilityRole="tablist" style={Layout.rowCenter}>
        {routes.map(renderTabItem)}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  view: {
    elevation: 8,
  },
  barIndicatorContainer: {
    width: TAB_ITEM_WIDTH,
    top: 0,
    left: 0,
    zIndex: 2,
  },
  barIndicator: {
    backgroundColor: '#041F1E',
    height: 4,
    marginHorizontal: 10,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
  },
});
