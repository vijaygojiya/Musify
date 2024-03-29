import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import styleConfig from '../../utils/styleConfig';
import GS from '../../utils/styles';

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: styleConfig.width,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: styleConfig.smartScale(15),
    marginBottom: styleConfig.smartScale(43),
    ...GS.shadowEffect,
  },
  infoRowContainer: {
    flexDirection: 'row',
    marginVertical: styleConfig.smartScale(8),
    marginHorizontal: styleConfig.smartWidthScale(12),
  },
  artworkImage: {
    height: styleConfig.countPixelRatio(48),
    width: styleConfig.countPixelRatio(48),
    borderRadius: styleConfig.countPixelRatio(5),
    backgroundColor: colors.darkGrey,
  },
  songDetailContainer: {
    flex: 1,
    marginHorizontal: styleConfig.smartWidthScale(10),
  },
  titleTextStyle: {
    fontSize: styleConfig.countPixelRatio(12),
  },
  songArtist: {
    opacity: 0.7,
    fontSize: styleConfig.countPixelRatio(12),
  },
  // borderStyle: { borderRadius: styleConfig.countPixelRatio(8) },
  progressBarContainer: {alignSelf: 'center'},
});

export default styles;
