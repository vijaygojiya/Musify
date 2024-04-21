import {FlatList, ListRenderItem, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppTheme} from '../../../hooks';
import {Layout} from '../../../theme';
import {AlbumListItem, AppBar} from '../../../components';
import {albumsData} from '../../../utils/dummydata/saavn';
import styles from './styles';

const ITEM_HEIGHT = 237.4;

const getKey = (_: any, index: number) => {
  return `albums-list-${index}`;
};

const getItemLayout = (_: any, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const AlbumsScreen = () => {
  const {Colors} = useAppTheme();

  useEffect(() => {
    fetchAllAlbums();
  }, []);

  const fetchAllAlbums = async () => {
    try {
    } catch (error) {
      console.log('===>', error);
    }
  };

  const renderAlbums: ListRenderItem<(typeof albumsData)[number]> = ({
    item,
  }) => {
    return <AlbumListItem name={item.name} image={item.image} />;
  };

  return (
    <View style={[Layout.fill, {backgroundColor: Colors.backgroundColor}]}>
      <AppBar title="Albums" />
      <FlatList
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.flContainerStyle}
        numColumns={2}
        data={albumsData}
        renderItem={renderAlbums}
        showsVerticalScrollIndicator={false}
        keyExtractor={getKey}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default AlbumsScreen;
