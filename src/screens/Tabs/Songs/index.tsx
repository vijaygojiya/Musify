import {ListRenderItem, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useAppTheme, useMiniPlayer, useScrollHandler} from '../../../hooks';
import {Layout} from '../../../theme';
import SongList from '../../../utils/dummydata/song';
import SongsListItem from '../../../components/SongListItem';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {AppBar, SongsMoreOptionSheet} from '../../../components';
import {
  BOTTOM_TAB_BAR_HEIGHT,
  HEADER_BAR_HEIGHT,
  MINI_PLAYER_HEIGHT,
} from '../../../utils/constant';
import Animated, {withSequence, withTiming} from 'react-native-reanimated';
import styles from './styles';
import {useScrollToTop} from '@react-navigation/native';
import useGlobal from '@/hooks/useGlobal';
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

const SongsScreen = () => {
  const [headerBarHeight, setHeaderBarHeight] = useState(0);

  const {headerMinimalShellTransform, headerHeight, scrollHandler} =
    useScrollHandler();

  const ref = React.useRef(null);

  useScrollToTop(ref);
  const {Colors} = useAppTheme();
  const {getCurrentPlaylistId, setCurrentPlaylistId} = useGlobal();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenMoreOptionSheet = (title?: string) => {
    bottomSheetModalRef.current?.present({title});
  };
  const {translateY} = useMiniPlayer();

  const playSong = async (playlistId: string, index: number) => {
    if (playlistId !== getCurrentPlaylistId()) {
      setCurrentPlaylistId(playlistId);
      await TrackPlayer.setQueue(SongList);
    }

    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    translateY.value = withSequence(
      withTiming(MINI_PLAYER_HEIGHT + 2),
      withTiming(-BOTTOM_TAB_BAR_HEIGHT),
    );
  };
  const renderSongItem: ListRenderItem<(typeof SongList)[number]> = ({
    item,
    index,
  }) => {
    const {title, artwork, artist, url} = item;

    return (
      <SongsListItem
        playlistId="songsListScreen"
        title={title}
        url={url}
        artwork={artwork}
        artist={artist}
        index={index}
        onMoreIconClick={handleOpenMoreOptionSheet}
        onPress={playSong}
      />
    );
  };

  return (
    <View style={(Layout.fill, {backgroundColor: Colors.backgroundColor})}>
      {/* <StatusBar backgroundColor={Colors.backgroundColorwhite} /> */}
      <Animated.View
        onLayout={e => {
          headerHeight.value = e.nativeEvent.layout.height;
          setHeaderBarHeight(e.nativeEvent.layout.height);
        }}
        style={[
          styles.headerContainer,
          {
            backgroundColor: Colors.backgroundColor,
            borderBottomColor: Colors.border,
          },
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
