import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';

// component imports
import LaunchButton from './components/LaunchButton';
import FoodlistModal from './components/FoodlistModal';

const App = () => {
  // boolean state for modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    // container
    <SafeAreaView style={styles.container}>
      {modalVisible ? (
        <FoodlistModal closeButton={() => setModalVisible(false)} />
      ) : (
        <LaunchButton action={() => setModalVisible(true)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE9EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
