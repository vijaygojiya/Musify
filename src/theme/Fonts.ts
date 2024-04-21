/**
 * This file contains all application's style relative to fonts
 */
import {StyleSheet} from 'react-native';
import {Colors, FontSize} from './Variables';
import APP_FONTS from '../assets/fonts';

const Fonts = StyleSheet.create({
  textTiny: {
    fontSize: FontSize.tiny,
    fontFamily: APP_FONTS.MONTSERRAT_REGULAR,
  },
  textSmall: {
    fontSize: FontSize.small,
    fontFamily: APP_FONTS.MONTSERRAT_MEDIUM,
  },
  textRegular: {
    fontSize: FontSize.regular,
    color: Colors.textGray400,
  },
  textHeading: {
    fontSize: FontSize.heading,
    fontFamily: APP_FONTS.MONTSERRAT_SEMIBOLD,
  },
  textLarge: {
    fontSize: FontSize.large,
    color: Colors.textGray400,
  },
  textFontBold: {
    fontFamily: APP_FONTS.MONTSERRAT_BOLD,
  },
  textFontRegular: {
    fontFamily: APP_FONTS.MONTSERRAT_REGULAR,
  },
  textFontMedium: {
    fontFamily: APP_FONTS.MONTSERRAT_MEDIUM,
  },
  textFontSemibold: {
    fontFamily: APP_FONTS.MONTSERRAT_SEMIBOLD,
  },

  textUppercase: {
    textTransform: 'uppercase',
  },
  titleSmall: {
    fontSize: FontSize.small * 1.5,
    color: Colors.textGray800,
  },
  titleRegular: {
    fontSize: FontSize.regular * 2,
    fontWeight: 'bold',
    color: Colors.textGray800,
  },
  titleLarge: {
    fontSize: FontSize.large * 2,
    fontWeight: 'bold',
    color: Colors.textGray800,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textError: {
    color: Colors.error,
  },
  textSuccess: {
    color: Colors.success,
  },
  textPrimary: {
    color: Colors.primary,
  },
  textLight: {
    color: Colors.textGray200,
  },
});

export default Fonts;
