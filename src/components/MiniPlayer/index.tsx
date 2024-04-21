import React, {memo, useEffect} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import TrackPlayer, {
  State,
  useActiveTrack,
  usePlaybackState,
  usePlayWhenReady,
  useProgress,
} from 'react-native-track-player';

import styles from './styles';
import ProgressBar from '../AppProgressBar';
import {useAppTheme, useDebouncedValue, useMiniPlayer} from '../../hooks';
import {screenWidth} from '../../theme/Variables';
import Images from '../../assets/images';
import {Fonts, Layout} from '../../theme';
import MarqueeText from '../MarqueeText';
import IconButton from '../IconButton';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {getColors} from 'react-native-image-colors';

const MiniPlayer = () => {
  const track = useActiveTrack();
  const {Colors} = useAppTheme();
  const {animatedMiniPlayerStyle} = useMiniPlayer();

  const bgColor = useSharedValue(Colors.dark100);
  useEffect(() => {
    if (track?.url) {
      if (track?.artwork) {
        getAndSetColor(track?.artwork);
      }
    }
  }, [track?.url]);

  const getAndSetColor = async (url?: string) => {
    if (!url) {
      return;
    }
    try {
      const _colors = await getColors(url, {
        fallback: Colors.dark100,
        cache: true,
        key: url,
        quality: 'highest',
      });

      bgColor.value = _colors.darkMuted;
    } catch (error) {
      console.log('=====>', error);
    }
  };

  const bgContainerAnimStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(bgColor.value),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: Colors.dark100},
        animatedMiniPlayerStyle,
        bgContainerAnimStyle,
      ]}>
      {track?.url ? (
        <>
          <View style={styles.infoRowContainer}>
            <Image
              source={{uri: track?.artwork}}
              style={styles.artworkImage}
              resizeMode="contain"
            />
            <View style={styles.songDetailContainer}>
              <MarqueeText
                style={[
                  styles.titleTextStyle,
                  Fonts.textFontMedium,
                  {color: Colors.white},
                ]}
                marqueeOnStart={true}
                loop={true}>
                {track?.title}
              </MarqueeText>
              <Text
                numberOfLines={1}
                style={[
                  styles.songArtist,
                  Fonts.textFontRegular,
                  {color: Colors.white},
                ]}>
                {track?.artist}
              </Text>
            </View>
            <PlayPauseUi />
          </View>
          <ProgressUi />
        </>
      ) : null}
    </Animated.View>
  );
};
export default memo(MiniPlayer);

const PlayPauseUi = memo(() => {
  const {state} = usePlaybackState();
  const playWhenReady = usePlayWhenReady();
  const {Colors} = useAppTheme();
  const isLoading = useDebouncedValue(
    state === State.Loading || state === State.Buffering,
    250,
  );
  const isErrored = state === State.Error;
  const isEnded = state === State.Ended;

  const showPause = playWhenReady && !(isErrored || isEnded);
  const showBuffering = playWhenReady && isLoading;

  return (
    <>
      {showBuffering ? (
        <ActivityIndicator style={styles.loader} size={25} color={Colors.sky} />
      ) : showPause ? (
        <IconButton
          iconSource={Images.controls.pause}
          onIconClick={TrackPlayer.pause}
        />
      ) : (
        <IconButton
          iconSource={Images.controls.play}
          onIconClick={TrackPlayer.play}
        />
      )}
    </>
  );
});

const ProgressUi = memo(() => {
  const {Colors} = useAppTheme();
  const {position, duration} = useProgress();

  return (
    <ProgressBar
      height={2}
      style={Layout.selfCenter}
      unfilledColor={Colors.dark100}
      color={Colors.white}
      borderWidth={0}
      progress={duration !== 0 ? position / duration : 0}
      width={screenWidth - 50}
      useNativeDriver={true}
      animationType="timing"
      borderRadius={8}
    />
  );
});
