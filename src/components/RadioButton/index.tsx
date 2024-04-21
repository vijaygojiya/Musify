/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Layout} from '../../theme';

interface RadioButtonProps {
  isSelected: boolean;
  onSelect: () => void;
}

const RadioButton = ({isSelected, onSelect}: RadioButtonProps) => {
  const scale = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    if (isSelected) {
      scale.value = 2;
    }
    scale.value = withSpring(isSelected ? 1 : 0, {duration: 300});
  }, [isSelected]);

  return (
    <Pressable onPress={onSelect} style={[Layout.center, styles.container]}>
      <Animated.View style={[styles.dot, animStyle]} />
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAFEF1',
    alignSelf: 'flex-start',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#015364',
  },
  dot: {
    backgroundColor: '#026E78',
    height: 8,
    width: 8,
    borderRadius: 4,
  },
});
