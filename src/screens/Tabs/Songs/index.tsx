import {ListRenderItem, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
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
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  clamp,
  interpolateColor,
} from 'react-native-reanimated';
import styles from './styles';
import {useScrollToTop} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

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
  const ref = React.useRef(null);
  useEffect(() => {
    TrackPlayer.setQueue(SongList);
  }, []);

  useScrollToTop(ref);
  const {Colors} = useAppTheme();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event, ctx) => {
    let {y} = event.contentOffset;
    if (y < 0) {
      y = 0;
    }
    const dy = y - (ctx?.prevY ?? 0);
    scrollY.value = clamp(scrollY.value + dy, 0, HEADER_BAR_HEIGHT);
    ctx.prevY = y;
  });

  const hStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_BAR_HEIGHT],
      [0, -HEADER_BAR_HEIGHT],
      {extrapolateRight: Extrapolation.CLAMP},
    );

    return {
      transform: [{translateY}],
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, HEADER_BAR_HEIGHT],
        [Colors.backgroundColor, Colors.grey50],
      ),
    };
  });

  useEffect(() => {}, []);
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

  return (
    <View style={(Layout.fill, {backgroundColor: Colors.backgroundColor})}>
      <Animated.View
        style={[
          styles.headerContainer,
          {backgroundColor: Colors.backgroundColor},
          hStyle,
        ]}>
        <AppBar title="Songs" />
      </Animated.View>
      <Animated.FlatList
        ref={ref}
        scrollEventThrottle={16}
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