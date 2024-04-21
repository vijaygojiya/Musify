import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {Fonts, Layout} from '../../theme';
import SongList from '../../utils/dummydata/song';
import styles from './styles';
import {useAppTheme, useMiniPlayer} from '../../hooks';
import Images from '../../assets/images';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import {BOTTOM_TAB_BAR_HEIGHT, MINI_PLAYER_HEIGHT} from '../../utils/constant';
import Animated, {
  withTiming,
  withSequence,
  useDerivedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

interface ExtraProps {
  onPress?: () => void;
  onMoreIconClick: (title?: string) => void;
  index: number;
}

type SongsListItemProps = Partial<(typeof SongList)[number]> &
  Partial<ExtraProps>;

const SongsListItem = (props: SongsListItemProps) => {
  const track = useActiveTrack();
  const {translateY} = useMiniPlayer();
  const {title, artwork, artist, url, onMoreIconClick, index} = props;
  const isActiveTrack = track?.url === url;

  const activeAnimatedIndex = useDerivedValue(() => {
    return withTiming(isActiveTrack ? '#1dd1a1' : '#000000aa', {
      duration: 80,
    });
  });
  const {Colors} = useAppTheme();

  const animText = useAnimatedStyle(() => {
    return {
      color: activeAnimatedIndex.value,
    };
  }, [isActiveTrack]);
  const playSong = async () => {
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    translateY.value = withSequence(
      withTiming(MINI_PLAYER_HEIGHT + 2),
      withTiming(-BOTTOM_TAB_BAR_HEIGHT),
    );
  };

  return (
    <Pressable
      disabled={isActiveTrack}
      onPress={playSong}
      style={[Layout.rowHCenter, styles.container]}>
      {artwork ? (
        <Image
          source={{uri: artwork}}
          style={[styles.artWorkImg, {backgroundColor: Colors.dark}]}
        />
      ) : null}
      <View style={Layout.fill}>
        <Animated.Text numberOfLines={1} style={[Fonts.textSmall, animText]}>
          {title}
        </Animated.Text>
        <Text
          numberOfLines={1}
          style={[Fonts.textTiny, {color: Colors.secondaryText}]}>
          {artist}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          onMoreIconClick?.(title);
        }}>
        <Image style={[styles.moreIcon]} source={Images.Icons.more} />
      </Pressable>
    </Pressable>
  );
};

export default SongsListItem;
