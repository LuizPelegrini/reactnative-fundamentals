import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import api from './services/api';

const Repository = ({ repo, handleDelete }) => {
    // keep track of the repository data copied from the component props
    const [repository, setRepository] = useState({...repo});

    // update repository data
    useEffect(() => {
        setRepository(repo);
    }, [repo])

    // whenever the Like button is pressed, request API to add one like
    const handleLikeRepository = async (id) => {
        const response = await api.post(`/repositories/${id}/like`);

        // update the repository data coming from the response
        setRepository(response.data);
    }

    return (
        <View style={styles.repositoryContainer}>
            <View style={styles.header}>
                <Text style={styles.repository}>{repository.title}</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.deleteButton}
                    onPress={() => handleDelete(repository.id)}>
                <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.techsContainer}>
                {repository.techs.map((tech, index) => <Text key={index} style={styles.tech}>{tech}</Text>)}
            </View>

            <View style={styles.likesContainer}>
                <Text
                    style={styles.likeText}
                    // for testing purposes
                    testID={`repository-likes-${repository.id}`}>
                {repository.likes} curtidas
            </Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // for testing purposes
                testID={`like-button-${repository.id}`}>
                <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    repositoryContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteButton: {
        backgroundColor: '#f54242',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    },
    repository: {
        fontSize: 20,
        fontWeight: "bold",
    },
    techsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    tech: {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 10,
        backgroundColor: "#04d361",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
    },
    likesContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        marginTop: 10,
        marginRight: 200,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
        backgroundColor: "#7159c1",
        padding: 10,
    },
})

export default Repository;