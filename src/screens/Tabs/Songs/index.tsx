import {ListRenderItem, View} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import Animated, {withSequence, withTiming} from 'react-native-reanimated';
import styles from './styles';
import {useScrollToTop} from '@react-navigation/native';
import useGlobal from '@/hooks/useGlobal';
import TrackPlayer from 'react-native-track-player';
import {SongsMoreOptionSheet, AppBar} from '@/components';
import SongsListItem from '@/components/SongListItem';
import {useAppTheme, useMiniPlayer, useScrollHandler} from '@/hooks';
import {
  MINI_PLAYER_HEIGHT,
  BOTTOM_TAB_BAR_HEIGHT,
  HEADER_BAR_HEIGHT,
} from '@/utils/constant';
import SongList from '@/utils/dummydata/song';
import {Layout} from '@/theme';
import {useHeaderHeight} from '@react-navigation/elements';
import {MainTabScreenProps} from '@/Typings/navigation';

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

const SongsScreen = ({navigation}: MainTabScreenProps<'Songs'>) => {
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
      <Animated.FlatList
        ref={ref}
        scrollEventThrottle={1}
        data={SongList}
        renderItem={renderSongItem}
        keyExtractor={getKey}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={getSongItemLayout}
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
