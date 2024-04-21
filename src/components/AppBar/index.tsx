import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '../../hooks';
import {Fonts, Layout} from '../../theme';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from '../../assets/images';

interface AppBarTitle {
  title: string;
  onSearchiconPress?: () => void;
  onMoreIconPress?: () => void;
}

const AppBar = ({title, onSearchiconPress, onMoreIconPress}: AppBarTitle) => {
  const {Colors} = useAppTheme();
  return (
    <SafeAreaView>
      <View style={[Layout.rowHCenter, styles.container]}>
        <Text
          style={[
            styles.title,
            Layout.fill,
            Fonts.textHeading,
            {color: Colors.headingText},
          ]}>
          {title}
        </Text>
        <Pressable onPress={onSearchiconPress}>
          <Image
            source={Images.Icons.search}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable onPress={onMoreIconPress}>
          <Image
            source={Images.Icons.more}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AppBar;
