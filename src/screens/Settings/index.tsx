import {View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {Layout} from '../../theme';
import {useAppTheme} from '../../hooks';
import {SETTINGS_LIST, SettingTypes} from '../../utils/constant';
import {SelectAppThemeList, SettingListItem} from '../../components';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {SettingsScreenProps} from '../../Typings/navigation';

const snapPoints = ['32%'];

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const {Colors} = useAppTheme();
  const selectThemeBottomSheet = useRef<BottomSheet>(null);

  const renderSettingItem = (item: SettingTypes, index: number) => {
    return (
      <SettingListItem
        key={`setting-list-item-${index}`}
        {...item}
        onItemPress={handleOpenThemeChangeSheet}
      />
    );
  };

  const handleOpenThemeChangeSheet = useCallback(() => {
    selectThemeBottomSheet.current?.expand();
  }, []);

  const renderBackdrop = (props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.2}
        style={[props.style, {backgroundColor: Colors.primaryText}]}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  };
  return (
    <View style={[Layout.fill, {backgroundColor: Colors.backgroundColor}]}>
      {SETTINGS_LIST.map(renderSettingItem)}
      <BottomSheet
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        handleIndicatorStyle={{backgroundColor: Colors.primaryText}}
        backgroundStyle={{backgroundColor: Colors.backgroundColor}}
        backdropComponent={renderBackdrop}
        ref={selectThemeBottomSheet}>
        <SelectAppThemeList />
      </BottomSheet>
    </View>
  );
};

export default SettingsScreen;
