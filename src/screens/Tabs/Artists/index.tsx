import {ListRenderItem, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {useAppTheme} from '../../../hooks';
import {Layout} from '../../../theme';
import {AppBar, ArtistListItem} from '../../../components';
import {FlatList} from 'react-native-gesture-handler';
import ArtistsList from '../../../utils/dummydata/artists';

const ArtistsScreen = () => {
  const {Colors} = useAppTheme();

  const renderArtists: ListRenderItem<(typeof ArtistsList)[number]> = ({
    item,
  }) => {
    const {singer_url, singer} = item;
    return <ArtistListItem image={singer_url} name={singer} />;
  };

  return (
    <View style={[Layout.fill, {backgroundColor: Colors.backgroundColor}]}>
      <AppBar title="Artists" />
      <FlatList
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.flContainerStyle}
        numColumns={3}
        data={ArtistsList}
        renderItem={renderArtists}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ArtistsScreen;
