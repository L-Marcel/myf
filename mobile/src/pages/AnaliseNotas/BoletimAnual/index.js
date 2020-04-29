import React, { useState, useEffect } from 'react';
import boletim from '../../../services/entity/boletim';
import materia from '../../../services/entity/materia';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Profile() {

    const navigation = useNavigation();
    const [count, setCount] = useState(0);

    function navigationToMyBoletimList(){
        navigation.navigate('MyBoletimList');
    }

    async function chargeState(ind){
        setCount(count+1);
        if(ind.icon == "minussquareo" && ind.color == "#2091a8"){
            ind.icon = "plussquareo";
            ind.color = "#20a83d";
            ind.state = 0;
        }else if(ind.icon == "plussquareo" && ind.color == "#20a83d"){
            ind.icon = "minussquareo";
            ind.color = "#2091a8";
            ind.state = null;
        }
        setCount(count+1);
    }

    useEffect(() => {
        setCount(count+1);
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.frequencia}>
                    <Text style={styles.frequenciaText}>Frequência: {boletim.fraquencia}%</Text>
                </View>
                <TouchableOpacity style={styles.voltar} onPress={navigationToMyBoletimList}>
                    <Text style={styles.voltarText}>Voltar</Text>
                    <AntDesign style={styles.voltarLogo} name="leftsquareo" size={28} color={"#2091a8"}/>              
                </TouchableOpacity>
            </View>
            <FlatList 
                data={materia.discipl}
                style={styles.flatList}
                keyExtractor={discipl => String(materia.discipl.indexOf(discipl))}
                showsVerticalScrollIndicator={true}
                renderItem={({ item: discipl }) => (
                    <View>
                        <View style={styles.materia}>
                        <TouchableOpacity style={styles.materiaButton} onPress={e => {
                            chargeState(discipl);
                        }}>
                            <AntDesign style={styles.materiaIcon} name={discipl.icon} size={35} color={discipl.color}></AntDesign>
                        </TouchableOpacity>
                        <Text style={[styles.materiaText, {color: discipl.color}]}>{discipl.disciplina}</Text>
                        </View>
                        <View style={[styles.box, { height: discipl.state, width: discipl.state, opacity: discipl.state}]}>
                            <Text style={styles.boxText}>Disciplina {discipl.isSemestral} - {discipl.bimestreAtual}</Text>
                            <Text style={styles.boxText}>Total de faltas: {discipl.numero_faltas}</Text>
                            <View style={styles.boxTextContainer}>
                                <Text style={styles.boxTextContainerItem}>Notas:</Text>
                                <Text style={styles.boxTextContainerItem}>{discipl.n1}</Text>
                                <Text style={styles.boxTextContainerItem}>{discipl.n2}</Text>
                                <Text style={styles.boxTextContainerItem}>{discipl.n3}</Text>
                                <Text style={styles.boxTextContainerItem}>{discipl.n4}</Text>
                                <Text style={styles.boxTextContainerItem}>{discipl.nf}</Text>
                            </View>
                            <View style={styles.boxViewContainer}>
                                <AntDesign style={styles.boxViewIcon} name='exclamationcircle' size={15} color={'#d6601c'}></ AntDesign>
                                <Text style={styles.boxViewText}>Nota nescessária na proxima prova: {discipl.minNesce}</Text>
                            </View>
                            <View style={styles.boxViewContainer}>
                                <AntDesign style={styles.boxViewIcon} name='exclamationcircle' size={15} color={'#20a83d'}></ AntDesign>
                                <Text style={styles.boxViewText}>Nota recomendada na proxima prova: {discipl.recomen}</Text>
                            </View>
                            <View style={styles.boxViewContainer}>
                                <AntDesign style={styles.boxViewIcon} name='star' size={15} color={'#d6d01c'}></ AntDesign>
                                <Text style={styles.boxViewText}>Média máxima a ser obitida: {discipl.max}</Text>
                            </View>
                            <View style={styles.boxViewContainer}>
                                <AntDesign style={styles.boxViewIcon} name='barschart' size={15} color={'#1cd6d0'}></AntDesign>
                                <Text style={styles.boxViewText}>Média: {discipl.media_disciplina}</Text>
                            </View>
                            <View style={styles.boxViewContainer}>
                                <AntDesign style={styles.boxViewIcon} name='solution1' size={15} color={'black'}></AntDesign>
                                <Text style={styles.boxViewText}>Status: {discipl.situacao}</Text>
                            </View>
                            
                        </View>
                    </View>
                )}
            ></FlatList>
        </View>
    );
}