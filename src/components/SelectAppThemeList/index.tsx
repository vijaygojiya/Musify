import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {Layout} from '../../theme';
import styles from './styles';
import {useAppTheme} from '../../hooks';
import {TypeOfAppTheme} from '../../utils/enum';
import RadioButton from '../RadioButton';

const ThemeOptions = Object.values(TypeOfAppTheme);

const SelectAppThemeList = () => {
  const [selectedTheme, setSelectedTheme] = useState(-1);
  const {Colors, changeAppTheme} = useAppTheme();

  const renderOption = (item: (typeof ThemeOptions)[number], index: number) => {
    return (
      <View key={`themOptions=--${index}`} style={[Layout.row, {margin: 10}]}>
        <RadioButton
          isSelected={selectedTheme === index}
          onSelect={() => {
            setSelectedTheme(index);
            changeAppTheme(item);
          }}
        />
        <Text style={{marginHorizontal: 10, color: Colors.primaryText}}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={[Layout.fill, styles.container]}>
      {ThemeOptions.map(renderOption)}
    </View>
  );
};

export default SelectAppThemeList;
