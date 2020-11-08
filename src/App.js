import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList
} from "react-native";

import Repository from './Repository';

import api from './services/api';

export default function App() {
  // keep track of a list of repositories
  const [repositories, setRepositories] = useState([]);

  // as soon as the App component is loaded, request API to populate list with the result
  useEffect(()=> {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    }).catch(err => console.error('Error on retrieving repositories'))
  }, []);

  // create a Repository component for every repo coming from server
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          renderItem={({ item }) => <Repository repo={item}/>}
          keyExtractor={repo => repo.id} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
});
