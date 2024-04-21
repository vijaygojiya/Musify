import React, {useCallback} from 'react';
import {NativeScrollEvent} from 'react-native';
import {
  Easing,
  clamp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useScrollHandler = () => {
  const mode = useSharedValue(0);

  const headerHeight = useSharedValue(0);

  const setMode = React.useCallback(
    (v: boolean) => {
      'worklet';
      mode.value = withTiming(v ? 1 : 0, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    },
    [mode],
  );
  const startDragOffset = useSharedValue<number | null>(null);
  const startMode = useSharedValue<number | null>(null);

  const headerMinimalShellTransform = useAnimatedStyle(() => {
    return {
      pointerEvents: mode.value === 0 ? 'auto' : 'none',
      //   opacity: Math.pow(1 - mode.value, 2),
      transform: [
        {
          translateY: interpolate(mode.value, [0, 1], [0, -headerHeight.value]),
        },
      ],
    };
  });

  const onBeginDrag = useCallback(
    (e: NativeScrollEvent) => {
      'worklet';

      startDragOffset.value = e.contentOffset.y;
      startMode.value = mode.value;
    },
    [mode, startDragOffset, startMode],
  );

  const onEndDrag = useCallback(
    (e: NativeScrollEvent) => {
      'worklet';

      startDragOffset.value = null;
      startMode.value = null;
      if (e.contentOffset.y < headerHeight.value / 2) {
        // If we're close to the top, show the shell.
        setMode(false);
      } else {
        // Snap to whichever state is the closest.
        setMode(Math.round(mode.value) === 1);
      }
    },
    [startDragOffset, startMode, setMode, mode, headerHeight],
  );

  const onScroll = useCallback(
    (e: NativeScrollEvent) => {
      'worklet';

      if (startDragOffset.value === null || startMode.value === null) {
        if (mode.value !== 0 && e.contentOffset.y < headerHeight.value) {
          // If we're close enough to the top, always show the shell.
          // Even if we're not dragging.
          setMode(false);
        }
        return;
      }

      // The "mode" value is always between 0 and 1.
      // Figure out how much to move it based on the current dragged distance.
      const dy = e.contentOffset.y - startDragOffset.value;
      const dProgress = interpolate(
        dy,
        [-headerHeight.value, headerHeight.value],
        [-1, 1],
      );
      const newValue = clamp(startMode.value + dProgress, 0, 1);
      if (newValue !== mode.value) {
        // Manually adjust the value. This won't be (and shouldn't be) animated.
        mode.value = newValue;
      }
    },
    [headerHeight.value, mode, setMode, startDragOffset.value, startMode.value],
  );
  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag,
    onEndDrag,
    onScroll,
  });

  return {scrollHandler, headerMinimalShellTransform, headerHeight};
};

export default useScrollHandler;
