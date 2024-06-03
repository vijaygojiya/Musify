import {FlatList, ListRenderItem, View} from 'react-native';
import React from 'react';
import {useAppTheme, useMiniPlayer} from '../../../hooks';
import {Layout} from '../../../theme';
import {AppRoutes} from '../../../navigators/routes';

import {AppBar} from '../../../components';
import SongsListItem from '@/components/SongListItem';
import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from 'react-native-get-music-files';
import {useQuery} from '@tanstack/react-query';
import {MainTabScreenProps} from '@/Typings/navigation';
import useGlobal from '@/hooks/useGlobal';
import TrackPlayer, {Track} from 'react-native-track-player';
import {BOTTOM_TAB_BAR_HEIGHT, MINI_PLAYER_HEIGHT} from '@/utils/constant';
import {withSequence, withTiming} from 'react-native-reanimated';
const getKey = (_: any, index: number) => {
  return `home-songs-list-${index}`;
};
const ITEM_HEIGHT = 60;
const getSongItemLayout = (_, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const HomeScreen = ({navigation}: MainTabScreenProps<'Home'>) => {
  const {data} = useQuery({
    queryFn: () => {
      return getAll({
        limit: 10,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 1000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC,
      });
    },
    select: result =>
      typeof result === 'string'
        ? []
        : result.map(song => {
            return {
              url: song.url,
              title: song.title,
              album: song.album,
              artist: song.artist,
              duration: song.duration,
              artwork: song.cover,
              genre: song.genre,
            };
          }),
    queryKey: ['localAllSongs'],
  });

  const {Colors} = useAppTheme();

  const {getCurrentPlaylistId, setCurrentPlaylistId} = useGlobal();

  const handelOpenSettings = () => {
    navigation.navigate(AppRoutes.Settings);
  };
  const {translateY} = useMiniPlayer();

  const playSong = async (playlistId: string, index: number) => {
    try {
      if (!data) {
        return;
      }

      if (playlistId !== getCurrentPlaylistId()) {
        setCurrentPlaylistId(playlistId);
        await TrackPlayer.setQueue(data);
      }

      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      translateY.value = withSequence(
        withTiming(MINI_PLAYER_HEIGHT + 2),
        withTiming(-BOTTOM_TAB_BAR_HEIGHT),
      );
    } catch (error) {
      console.log('error while playing song or setting queue', error);
    }
  };
  const renderSongItem: ListRenderItem<Track> = ({item, index}) => {
    const {url, title, artist, artwork} = item;

    return (
      <SongsListItem
        playlistId="homeScreenSongs"
        title={title}
        url={url}
        artwork={artwork}
        artist={artist}
        index={index}
        onMoreIconClick={() => {}}
        onPress={playSong}
      />
    );
  };

  return (
    <View style={[Layout.fill, {backgroundColor: Colors.backgroundColor}]}>
      <AppBar title="Home" onMoreIconPress={handelOpenSettings} />
      <FlatList
        // ref={ref}
        scrollEventThrottle={16}
        // onScroll={scrollHandler}
        data={data}
        renderItem={renderSongItem}
        keyExtractor={getKey}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={getSongItemLayout}
      />
    </View>
  );
};

export default HomeScreen;
