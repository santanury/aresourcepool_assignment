import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

// constants import
import {icons} from '../constants';

const Foodlistmodal = props => {
  // list data hook
  const [listData, setListData] = useState([]);

  // list data based on search
  const [searchedData, setSearchedData] = useState([]);

  // search key hook
  const [searchKey, setSearchKey] = useState('');

  // api error hook
  const [apiError, setApiError] = useState(false);

  // category id to expand hook
  const [expandCatId, setExpandCatId] = useState(null);

  useEffect(() => {
    fetchListData();
  }, []);

  // function to fetch list data
  const fetchListData = async () => {
    await axios
      .get('https://api.jsonbin.io/b/60e7f4ebf72d2b70bbac2970')
      .then(res => {
        setListData(res.data.data);
      })
      .catch(err => {
        console.log(err);
        setApiError(true);
      });
  };

  // random color generator
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // function to search list data
  const searchListDataHandler = () => {
    const newData = listData.filter(item => {
      const itemData = item.title.toUpperCase();
      const textData = searchKey.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchedData(newData);
  };

  // category item render
  const renderCatItem = item => {
    // sub category item render
    const renderSubCatItem = item => {
      return (
        <View style={styles.subCatItem}>
          <Text style={styles.listItemText}>{item.title}</Text>
        </View>
      );
    };

    return (
      <>
        <TouchableOpacity
          style={styles.catListItem}
          onPress={() =>
            setExpandCatId(expandCatId === item.id ? null : item.id)
          }>
          <View // icon and title container
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View // category item image container
              style={[
                styles.catListItemIconContainer,
                {backgroundColor: randomColor()},
              ]}></View>
            <Text // category item text
              style={[styles.listItemText, {color: randomColor()}]}>
              {item.title}
            </Text>
          </View>
          <Image // collapse expand icon
            source={icons.collapse_expand}
            resizeMode="contain"
            style={[
              styles.catListItemIcon,
              {
                transform:
                  expandCatId === item.id
                    ? [{rotate: '0deg'}]
                    : [{rotate: '180deg'}],
              },
            ]}
          />
        </TouchableOpacity>

        {/* sub-category list */}

        {expandCatId === item.id ? (
          <View style={styles.subCatList}>
            <FlatList
              data={item.data}
              renderItem={({item}) => renderSubCatItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
      </>
    );
  };

  return (
    // container as modal

    <Modal
      animationType="slide"
      transparent
      visible={true}
      style={styles.modal}>
      <TouchableOpacity // close button
        style={{marginTop: 25}}
        onPress={() => {
          props.closeButton();
        }}>
        <Image // close icon
          source={icons.close}
          style={styles.closeIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text // heading
        style={[styles.heading, {color: '#000000'}]}>
        Approved Food List
      </Text>

      <View // search bar
        style={styles.searchBar}>
        <Image // search icon inside searchbox
          source={icons.Search}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput // searh bar input section
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#C4C4C4"
          value={searchKey}
          onChangeText={text => {
            setSearchKey(text);
            searchListDataHandler();
          }}
        />
      </View>

      {/* scrollable list container */}

      {apiError !== true ? (
        <FlatList
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={searchKey.length > 0 ? searchedData : listData}
          renderItem={({item}) => renderCatItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View //no data retrived
          style={styles.noDataContainer}>
          <Image // no data retrived icon
            source={icons.caution}
            style={styles.cautionIcon}
            resizeMode="contain"
          />

          <Text
            style={[styles.heading, {color: '#C4C4C4', marginBottom: '5%'}]}>
            Snap! Something went wrong.
          </Text>
          <TouchableOpacity // retry button
            style={styles.retryButton}
            onPress={() => {
              fetchListData();
            }}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};

export default Foodlistmodal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#EAE9EF',
  },
  closeIcon: {
    height: 20,
    width: 20,
    tintColor: '#000000',
    marginLeft: '5%',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: '5%',
    marginTop: '5%',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#E8EFF7',
    alignItems: 'center',
    width: '90%',
    height: 45,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: '5%',
    marginTop: '5%',
  },
  searchIcon: {
    height: '60%',
    tintColor: '#C4C4C4',
    marginLeft: '1%',
  },
  searchInput: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
    marginLeft: '5%',
  },
  listContainer: {
    paddingBottom: 50,
  },
  catListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '90%',
    height: 55,
    borderRadius: 5,
    marginLeft: '5%',
    marginTop: '5%',
  },
  catListItemIconContainer: {
    opacity: 0.1,
    width: 45,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  listItemText: {
    fontSize: 15,
    fontWeight: '400',
    marginLeft: '10%',
    color: '#C4C4C4',
  },
  catListItemIcon: {
    height: '35%',
    tintColor: '#C4C4C4',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cautionIcon: {
    height: 45,
    tintColor: '#C4C4C4',
  },
  retryButton: {
    backgroundColor: '#E8EFF7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 45,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subCatList: {
    width: '90%',
    borderTopColor: '#C4C4C4',
    borderTopWidth: 1,
    marginLeft: '5%',
  },
  subCatItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: 45,
  },
});
