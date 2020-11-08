import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
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

  const handleCreateRepository = async () => {
    const newRepository = {
      title: `Amazing new repo`,
      url: 'https://github.com/LuizPelegrini?tab=repositories',
      techs: [
        'NodeJS', 'ReactJS', 'React Native'
      ]
    }

    const response = await api.post('/repositories', newRepository);
    setRepositories([...repositories, response.data]);
  };

  const handleDeleteRepository = async (id) => {
    const response = await api.delete(`/repositories/${id}`);

    // only update the list if the delete request has completed successfuly
    if(response.status === 204){
      const repos = repositories.filter(repo => repo.id !== id); 
      setRepositories(repos);
    }
  }

  // create a Repository component for every repo coming from server
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.repositoriesList}
          data={repositories}
          // attach the handleDelete function to the repo properties so it can call it back later 
          // when the delete button in the Repository component is called
          renderItem={({ item }) => <Repository repo={item} handleDelete={(id) => handleDeleteRepository(id)}/>}
          keyExtractor={repo => repo.id} />
          <TouchableOpacity
            style={styles.buttonCreate}
            activeOpacity={0.7}
            onPress={()=>{handleCreateRepository()}}>
            <Text style={styles.buttonCreateText}>Create</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoriesList: {
    marginBottom: 30,
    paddingBottom: 5
  },
  buttonCreate: {
    backgroundColor: '#1e1733',
    height: 50,
    marginHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonCreateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
});
