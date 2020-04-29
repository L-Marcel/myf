import React, { useState } from 'react';
import user from '../../services/entity/user';
import configBoletim from '../../services/config/configBoletim';
import globalServices from '../../services/config/globalServices';
import boletim from '../../services/entity/boletim';
import materia from '../../services/entity/materia';
import { View, TouchableOpacity, Text, FlatList, Image, AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Profile() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState({
        height: 0, 
        width: 0,
        backgroundColor: 'transparent'
    });

    function handleStart(route){
        setLoading(false);
        setWarning({
            height: 0, 
            width: 0,
            backgroundColor: 'transparent'
        });
        navigationToService(route);
    };

    function navigationToLogin(){
        navigation.navigate('Login');
    }

    function logout(){
        if(warning != null){
            user.token = '';
            materia.discipl = [];
            boletim.fraquencia = 0;
            user.token = '';
            user.name = 'Desconhecido';
            user.foto_url = '';
            user.periodos_letivos = [],
            user.qtd_periodos = 0,
            navigationToLogin();
        }
        console.log(warning);
    }

    function navigationToService(serv){
        navigation.navigate(serv);
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.perfil}>
                    <Image source={{uri: user.foto_url}} defaultSource={require('../../assets/blank.png')} style={styles.perfilImage}></Image>
                    <Text style={styles.perfilText}>{user.nome}</Text>
                </View>
                <TouchableOpacity disabled={loading} style={styles.logout} onPress={logout}>
                    <Text style={styles.logoutText}>Sair</Text>
                    <AntDesign style={styles.logoutLogo} name="closesquareo" size={28} color={"#e65c5c"}/>              
                </TouchableOpacity>
            </View>
            <FlatList 
                data={globalServices.services}
                style={styles.serviceList}
                keyExtractor={service => String(service.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: service }) => (
                <TouchableOpacity style={styles.service} onPress={() => {
                    setLoading(true);
                    setWarning({});
                    handleStart(service.route);
                    }}>
                    <Text style={styles.serviceText}>{service.title}</Text>
                    <AntDesign style={styles.serviceIcon} name={service.icon}size={35} color='#20a83d'></ AntDesign>
                </TouchableOpacity>
                )}>
            </FlatList>
            <View style={[styles.warning, warning]}>
                <Text style={styles.warningText}>Aguarde...</Text>       
            </View>
        </View>
    );
}