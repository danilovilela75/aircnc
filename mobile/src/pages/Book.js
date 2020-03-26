import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, AsyncStorage, TextInput, TouchableOpacity, Alert } from 'react-native';

import api from '../services/api';

export default function Book({navigation}) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/booking`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada!');

        navigation.navigate('List');


    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.buttonConf} onPress={handleSubmit}>
                <Text style={styles.textButton}>Solicitar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonConf, styles.buttonCancel]} onPress={handleCancel}>
                <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    container: {
        marginTop: 50,
        paddingHorizontal: 30,
    },

    titulo: {
        fontWeight: 'bold',
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    buttonConf: {
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f05a5b',
        borderRadius: 2,
        marginBottom: 10,
    },

    buttonCancel: {
        backgroundColor: '#ccc',
    },

    textButton: {
        fontWeight: 'bold',
        color: '#fff',
    },

});