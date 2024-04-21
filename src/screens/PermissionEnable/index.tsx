import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Layout} from '../../theme';
import Images from '../../assets/images';
import { openSettings } from 'react-native-permissions';

const PermissionEnable = ({navigation}) => {
  const handleRetryPress = () => {
 openSettings()
  };

  return (
    <View style={styles.container}>
      <Image source={Images.Icons.search} style={styles.image} />
      <Text style={styles.title}>Permission Denied</Text>
      <Text style={styles.text}>
        To enjoy music, grant the app permission to access media.
      </Text>
      <Pressable style={styles.retryButton} onPress={handleRetryPress}>
        <Text style={styles.retryButtonText}>Allow Access</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PermissionEnable;
