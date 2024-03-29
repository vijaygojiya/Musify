import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import CS from '../../../utils/styles';
import styles from './styles';

const CommonToolbar: React.FC<{
  containerStyle?: ViewStyle;
  title?: string;
  textStyle?: TextStyle;
  isRightButton?: boolean;
  isLeftButton?: boolean;
  leftIcon?: ImageSourcePropType;

  rightIcon?: ImageSourcePropType;
  onLeftClickListener?: () => void;
  onRightClickListener?: () => void;
  rightIconStyle?: ImageStyle;
  leftIconStyle?: ImageStyle;
}> = props => {
  const {
    containerStyle,
    title,
    textStyle,
    isRightButton,
    isLeftButton,
    leftIcon,
    rightIcon,
    onLeftClickListener,
    onRightClickListener,
    rightIconStyle,
    leftIconStyle,
  } = props;
  return (
    <SafeAreaView
      forceInset={{top: 'always', bottom: 'never'}}
      style={styles.saContainer}>
      <View style={[styles.vToolbarContainer, containerStyle]}>
        <Pressable
          style={styles.pIconContainer}
          onPress={isLeftButton ? onLeftClickListener : null}>
          {isLeftButton ? (
            <Image
              source={leftIcon}
              style={[styles.iconStyle, leftIconStyle && leftIconStyle]}
            />
          ) : null}
        </Pressable>
        <Text
          numberOfLines={1}
          style={[CS.text_white_medium, styles.tTitle, textStyle]}>
          {title}
        </Text>
        <Pressable
          style={styles.pIconContainer}
          onPress={isRightButton ? onRightClickListener : null}>
          {isRightButton ? (
            <Image
              source={rightIcon}
              style={[styles.iconStyle, rightIconStyle && rightIconStyle]}
            />
          ) : null}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CommonToolbar;
