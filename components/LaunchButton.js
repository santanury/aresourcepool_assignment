import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

// constants import
import {icons} from '../constants';

const LaunchButton = props => {
  return (
    // container as button
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.action();
      }}>
      <Image // rocket icon
        source={icons.launch}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.text}>LAUNCH</Text>
    </TouchableOpacity>
  );
};

export default LaunchButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#FC2986',
    alignItems: 'center',
    width: '45%',
    height: '7%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  image: {
    height: '80%',
    tintColor: '#fff',
    transform: [{rotate: '45deg'}],
    marginLeft: '5%',
  },

  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '400',
    marginLeft: '5%',
  },
});
