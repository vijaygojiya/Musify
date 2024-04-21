import {View} from 'react-native';
import React from 'react';
import {useAppTheme} from '../../../hooks';
import {Layout} from '../../../theme';
import {AppRoutes} from '../../../navigators/routes';

import {AppBar} from '../../../components';

// const getKey = (_: any, index: number) => {
//   return `home-songs-list-${index}`;
// };
// const ITEM_HEIGHT = 60;
// const getSongItemLayout = (_, index: number) => ({
//   length: ITEM_HEIGHT,
//   offset: ITEM_HEIGHT * index,
//   index,
// });

const HomeScreen = ({navigation}) => {
  // const [sognsData, setSongs] = useState([]);
  const {Colors} = useAppTheme();

  // useEffect(() => {
  //   getAllLocalSongs();
  //   const unsub = navigation.addListener('focus', () => {
  //     TrackPlayer.setQueue(sognsData);
  //   });
  //   return unsub;
  // }, [sognsData.length]);

  // const getAllLocalSongs = async () => {
  //   try {
  //     const songs = await getAllSongs();
  //     TrackPlayer.add(songs);
  //     console.log('====>', JSON.stringify(songs, null, 2));
  //     setSongs(songs);
  //   } catch (error) {
  //     console.log('==songs==>', JSON.stringify(error, null, 2));
  //   }
  // };
  const handelOpenSettings = () => {
    navigation.navigate(AppRoutes.Settings);
  };

  // const renderSongItem = ({item, index}) => {
  //   const {id, title, artist, url} = item;

  //   return (
  //     <SongsListItem
  //       title={title}
  //       url={url}
  //       artwork={null}
  //       artist={artist}
  //       index={index}
  //       onMoreIconClick={() => {}}
  //     />
  //   );
  // };

  return (
    <View style={[Layout.fill, {backgroundColor: Colors.backgroundColor}]}>
      <AppBar title="Home" onMoreIconPress={handelOpenSettings} />
      {/* <FlatList
        // ref={ref}
        scrollEventThrottle={16}
        // onScroll={scrollHandler}
        data={sognsData}
        renderItem={renderSongItem}
        keyExtractor={getKey}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={getSongItemLayout}
      /> */}
    </View>
  );
};

export default HomeScreen;
