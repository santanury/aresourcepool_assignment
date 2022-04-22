import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

// constants import
import {icons} from '../constants';

const Foodlistmodal = props => {
  // random color generator
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // list data hook
  const [listData, setListData] = useState([]);

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
      });
  };

  // category item render
  const renderCatItem = item => {
    return (
      <TouchableOpacity style={styles.catListItem}>
        <View // category item image container
          style={[
            styles.catListItemIconContainer,
            {backgroundColor: randomColor()},
          ]}></View>
        <Text // category item text
          style={[styles.catListItemText, {color: randomColor()}]}>
          {item.title}
        </Text>
      </TouchableOpacity>
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
        style={styles.heading}>
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
        />
      </View>

      {/* scrollable list container */}

      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={listData}
        renderItem={({item}) => renderCatItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
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
    color: '#000000',
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
  scrollableList: {
    flex: 1,
  },
  catListItem: {
    flexDirection: 'row',
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
  catListItemText: {
    fontSize: 15,
    fontWeight: '400',
    marginLeft: '5%',
  },
});
