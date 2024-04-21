import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {useAppTheme} from '../../../hooks';
import {Layout} from '../../../theme';

const Playlists = () => {
  const {Colors} = useAppTheme();

  return (
    <View
      style={[
        Layout.fill,
        Layout.center,
        {backgroundColor: Colors.backgroundColor},
      ]}>
      <Text style={[styles.title, {color: Colors.typography}]}>Playlists</Text>
    </View>
  );
};

export default Playlists;
