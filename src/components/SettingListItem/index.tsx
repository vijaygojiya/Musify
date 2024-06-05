import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {Layout} from '@/theme';
import styles from './styles';
import {useAppTheme} from '@/hooks';
import Images from '@/assets/images';
import {SettingTypes} from '@/utils/constant';

interface SettingListItemProps extends SettingTypes {
  onItemPress?: () => void;
}

const SettingListItem = (props: SettingListItemProps) => {
  const {title, description, icon, onItemPress} = props;
  const {Colors} = useAppTheme();
  return (
    <Pressable
      onPress={onItemPress}
      style={[Layout.rowHCenter, styles.container]}>
      <Image
        source={Images.Settings[icon]}
        style={styles.icon}
        resizeMode="contain"
      />
      <View style={[styles.textContainer]}>
        <Text
          numberOfLines={1}
          style={[styles.titleText, {color: Colors.primaryText}]}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.descriptionText, {color: Colors.primaryText}]}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default SettingListItem;
