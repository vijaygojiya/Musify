import {StyleSheet} from 'react-native';
import {screenWidth} from '../../theme/Variables';

const styles = StyleSheet.create({
  container: {
    width: (screenWidth - 54) / 3,
  },
  imageContainer: {
    elevation: 6,
    marginBottom: 20,
  },
  artWorkImg: {
    width: (screenWidth - 54) / 3,
    aspectRatio: 1,
    borderRadius: (screenWidth - 54) / 3,
  },
});
export default styles;
