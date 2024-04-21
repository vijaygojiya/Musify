import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/Variables';

const styles = StyleSheet.create({
  container: {
    bottom: 2,
    left: 0,
    right: 0,
    position: 'absolute',
    overflow: 'hidden',
    marginHorizontal: 12,
    borderRadius: 8,
  },
  infoRowContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  artworkImage: {
    height: 48,
    width: 48,
    borderRadius: 5,
    backgroundColor: Colors.darkGrey,
  },
  songDetailContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  titleTextStyle: {
    fontSize: 12,
  },
  songArtist: {
    opacity: 0.7,
    fontSize: 12,
  },
  // borderStyle: { borderRadius: (8) },
  progressBarContainer: {alignSelf: 'center'},
  loader: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default styles;
