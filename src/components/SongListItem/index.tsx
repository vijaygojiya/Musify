import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {Fonts, Layout} from '@/theme';
import SongList from '@/utils/dummydata/song';
import styles from './styles';
import {useAppTheme} from '@/hooks';
import Images from '@/assets/images';
import {useActiveTrack} from 'react-native-track-player';
import Animated, {
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ExtraProps {
  onMoreIconClick: (title?: string) => void;
  index: number;
  playlistId: string;
  onPress: (playlistId: string, index: number) => Promise<void>;
}

type SongsListItemProps = Partial<(typeof SongList)[number]> & ExtraProps;

const SongsListItem = (props: SongsListItemProps) => {
  const track = useActiveTrack();
  const {
    title,
    artwork,
    artist,
    url,
    onMoreIconClick,
    index,
    playlistId,
    onPress,
  } = props;
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

  return (
    <Pressable
      disabled={isActiveTrack}
      onPress={() => {
        onPress(playlistId, index);
      }}
      style={[Layout.rowHCenter, styles.container]}>
      <Image
        source={{uri: artwork}}
        defaultSource={Images.controls.play}
        style={[styles.artWorkImg, {backgroundColor: Colors.secondaryText}]}
      />

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
