import {ListRenderItem, NativeScrollEvent, StatusBar, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppTheme} from '../../../hooks';
import {Layout} from '../../../theme';
import SongList from '../../../utils/dummydata/song';
import SongsListItem from '../../../components/SongListItem';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {AppBar, SongsMoreOptionSheet} from '../../../components';
import {HEADER_BAR_HEIGHT} from '../../../utils/constant';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import styles from './styles';
import {useScrollToTop} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
function clamp(num: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(num, min), max);
}
const renderSheetBackDrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.34}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );
};

const renderMoreOptions = ({data}: {data: {title: string}}) => {
  return <SongsMoreOptionSheet title={data.title} />;
};

const getKey = (_: any, index: number) => {
  return `songs-list-${index}`;
};
const ITEM_HEIGHT = 60;
const getSongItemLayout = (_, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const SongsScreen = ({navigation}) => {
  const [headerBarHeight, setHeaderBarHeight] = useState(0);
  const headerHeight = useSharedValue(0);
  const mode = useSharedValue(0);

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

  const ref = React.useRef(null);
  useEffect(() => {
    TrackPlayer.setQueue(SongList);
  }, []);

  useScrollToTop(ref);
  const {Colors} = useAppTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenMoreOptionSheet = (title?: string) => {
    bottomSheetModalRef.current?.present({title});
  };

  const renderSongItem: ListRenderItem<(typeof SongList)[number]> = ({
    item,
    index,
  }) => {
    const {title, artwork, artist, url} = item;

    return (
      <SongsListItem
        title={title}
        url={url}
        artwork={artwork}
        artist={artist}
        index={index}
        onMoreIconClick={handleOpenMoreOptionSheet}
      />
    );
  };
  const headerMinimalShellTransform = useAnimatedStyle(() => {
    return {
      pointerEvents: mode.value === 0 ? 'auto' : 'none',
      opacity: Math.pow(1 - mode.value, 2),
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
      // let {y} = event.contentOffset;
      // if (y < 0) {
      //   y = 0;
      // }
      // const dy = y - (ctx?.prevY ?? 0);
      // scrollY.value = clamp(scrollY.value + dy, 0, HEADER_BAR_HEIGHT);
      // ctx.prevY = y;

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
    [headerHeight, mode, setMode, startDragOffset],
  );
  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag,
    onEndDrag,
    onScroll,
  });

  return (
    <View style={(Layout.fill, {backgroundColor: Colors.backgroundColor})}>
      <StatusBar backgroundColor={Colors.white} />
      <Animated.View
        onLayout={e => {
          headerHeight.value = e.nativeEvent.layout.height;
          setHeaderBarHeight(e.nativeEvent.layout.height);
        }}
        style={[
          styles.headerContainer,
          {backgroundColor: Colors.white},
          headerMinimalShellTransform,
        ]}>
        <AppBar title="Songs" />
      </Animated.View>
      <Animated.FlatList
        ref={ref}
        contentOffset={{x: 0, y: headerBarHeight * -1}}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        data={SongList}
        renderItem={renderSongItem}
        keyExtractor={getKey}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={getSongItemLayout}
        contentContainerStyle={{paddingVertical: HEADER_BAR_HEIGHT}}
      />
      <BottomSheetModal
        handleComponent={() => null}
        children={renderMoreOptions}
        ref={bottomSheetModalRef}
        backdropComponent={renderSheetBackDrop}
        enableDynamicSizing={true}
      />
    </View>
  );
};

export default SongsScreen;
