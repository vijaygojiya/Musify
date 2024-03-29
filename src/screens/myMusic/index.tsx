// import { StyleSheet, View } from 'react-native';
// import React, { ReactNode, useEffect, useState } from 'react';
// import colors from '../../utils/colors';

// import CommonGradientBg from '../../component/custom/commonGradientBg';
// import { TabView, TabBar, NavigationState, SceneRendererProps } from 'react-native-tab-view';
// import styleConfig from '../../utils/styleConfig';
// import CommonToolbar from '../../component/custom/commontoolbar';

// import { RNAndroidAudioStore } from 'react-native-get-music-files';
// import TrackPlayer from 'react-native-track-player';
// import SongList from '../../utils/dummydata/song';
// import Songstab from './tabs/songstab';
// import ArtistsTab from './tabs/artiststab';
// import AlbumsTab from './tabs/albumstab';
// import FoldersTab from './tabs/folderstab';

// const options = {
//   title: true,
//   artist: true,
//   album: true,
//   duration: true,
//   cover: true,
//   blured: true,
// };
// interface routeType {
//   key: string;
//   title: string;
// }

// const MyMusicScreen = () => {
//   const [index, setIndex] = useState(0);
//   const [isLoading, setLoading] = useState(false);

//   const [songIndex, setSongIndex] = useState(-1);
//   const [songs, setSongs] = useState([]);
//   const [musicFolders, setMusicFolders] = useState([]);

//   useEffect(() => {
//     // checkLocationPermission(fetchAllSongs);
//   }, []);

//   const routes = [
//     { key: 'Songs', title: 'Songs' },
//     { key: 'Artists', title: 'Artists' },
//     { key: 'Albums', title: 'Albmus' },
//     { key: 'Folders', title: 'Folders' },
//   ];
//   const handleIndexChange = (_index: number) => {
//     setIndex(_index);
//   };

//   const fetchAllSongs = async () => {
//     // const coverFolder = RNFetchBlob.fs.dirs.DocumentDir + '/.soundspice';
//     try {
//       setLoading(true);
//       const tempFolders: string[] = [];
//       const results = await RNAndroidAudioStore.getAll({ options });
//       setLoading(false);
//       const data = results.map((i) => {
//         const subText = i.path.split('/');
//         tempFolders.push(subText[subText.length - 2]);
//         return { ...i, url: i.path };
//       });
//       const uniq = [...new Set(tempFolders)];
//       setMusicFolders(uniq);
//       setSongs(data);
//     } catch (error) {
//       setLoading(false);
//     }
//   };

//   const renderTabBar = (
//     props: SceneRendererProps & {
//       navigationState: NavigationState<routeType>;
//     }
//   ) => {
//     return (
//       <TabBar
//         {...props}
//         scrollEnabled={true}
//         indicatorStyle={styles.indicator}
//         style={styles.tabbar}
//         tabStyle={styles.tab}
//         labelStyle={styles.label}
//         activeColor={colors.white}
//         inactiveColor={colors.darkGrey}
//       />
//     );
//   };

//   const handleSongClick = (index: number) => {
//     setSongIndex(index);
//     TrackPlayer.reset();
//     TrackPlayer.add(SongList);
//     TrackPlayer.play();
//   };

//   const renderScene = ({
//     route,
//   }: SceneRendererProps & {
//     route: routeType;
//   }): ReactNode => {
//     switch (route.key) {
//       case 'Songs':
//         return (
//           <Songstab
//             isLoading={isLoading}
//             songsData={songs}
//             selectedIndex={songIndex}
//             handleSongClick={handleSongClick}
//           />
//         );
//       case 'Artists':
//         return <ArtistsTab />;
//       case 'Albums':
//         return <AlbumsTab />;
//       case 'Folders':
//         return <FoldersTab musicFolders={musicFolders} />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <View style={styles.screenContainer}>
//       <CommonToolbar title="MyMusic" />
//       <TabView
//         lazy={true}
//         swipeEnabled={true}
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         renderTabBar={renderTabBar}
//         onIndexChange={handleIndexChange}
//       />
//     </View>
//   );
// };

// export default MyMusicScreen;

// const styles = StyleSheet.create({
//   screenContainer: {
//     flex: 1,
//     backgroundColor: colors.dark_blue,
//   },
//   tTabTitle: {
//     color: colors.white,
//     fontSize: styleConfig.countPixelRatio(16),
//   },
//   tabbar: {
//     backgroundColor: colors.transparent,
//   },
//   tab: {
//     width: styleConfig.width / 4,
//   },
//   indicator: {
//     backgroundColor: colors.secondary,
//     width: styleConfig.width / 4 - styleConfig.smartWidthScale(40),
//     marginStart: styleConfig.smartWidthScale(20),
//   },
//   label: {
//     color: colors.white,
//     fontSize: styleConfig.countPixelRatio(16),
//     textTransform: 'none',
//   },
// });

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GS from '../../utils/styles';
import colors from '../../utils/colors';

const MyMusicScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={[GS.text_white_regular]}>My MusicScreen Screen</Text>
    </View>
  );
};

export default MyMusicScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark_blue,
  },
});
