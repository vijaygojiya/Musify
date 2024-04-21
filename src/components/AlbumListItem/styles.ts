import {StyleSheet} from 'react-native';
import {screenWidth} from '../../theme/Variables';

const styles = StyleSheet.create({
  container: {
    width: (screenWidth - 60) / 2,
  },
  imageContainer: {
    elevation: 6,
    marginBottom: 20,
  },
  artWorkImg: {
    width: (screenWidth - 60) / 2,
    aspectRatio: 158 / 180,
    borderRadius: 15,
  },
});
export default styles;
