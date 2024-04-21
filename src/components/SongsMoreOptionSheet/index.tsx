import {Pressable, Text, View} from 'react-native';
import React from 'react';
import SongList from '../../utils/dummydata/song';
import styles from './styles';
import {Fonts} from '../../theme';
import {useAppTheme} from '../../hooks';
import {BottomSheetView} from '@gorhom/bottom-sheet';

const More_Options = [
  'Play later',
  'Add to queue',
  'Add to playlist',
  'Delete',
  'Share',
];

interface ExtraProps {
  onPress?: () => void;
  onMoreIconClick: () => void;
}

type SongsListItemProps = Partial<(typeof SongList)[number]> &
  Partial<ExtraProps>;

const SongsMoreOptionSheet = (props: SongsListItemProps) => {
  const {title} = props;
  const {Colors} = useAppTheme();

  return (
    <BottomSheetView style={[styles.container]}>
      <Text
        style={[
          Fonts.textRegular,
          Fonts.textFontSemibold,
          styles.titleText,
          {color: Colors.titleText, borderBottomColor: Colors.grey50},
        ]}>
        {title}
      </Text>
      {More_Options.map((item, index) => {
        return (
          <Pressable
            key={`more-options-${index}`}
            style={styles.optionContainer}>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textFontRegular,
                {color: Colors.titleText},
              ]}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </BottomSheetView>
  );
};

export default SongsMoreOptionSheet;
