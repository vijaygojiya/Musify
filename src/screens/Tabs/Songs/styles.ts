import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {},
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    elevation: 5,
  },
});

export default styles;
