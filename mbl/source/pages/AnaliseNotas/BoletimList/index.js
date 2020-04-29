import React, { useState } from 'react';
import api from '../../../services/suap';
import user from '../../../services/entity/user';
import configBoletim from '../../../services/config/configBoletim';
import boletim from '../../../services/entity/boletim';
import materia from '../../../services/entity/materia';
import load from '../load';

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

    retrieveConfig();
    async function setConfig(){
        try {
          await AsyncStorage.setItem('configBoletimPeso_1', String(configBoletim.peso_1));
          await AsyncStorage.setItem('configBoletimPeso_2', String(configBoletim.peso_2));
          await AsyncStorage.setItem('configBoletimPeso_3', String(configBoletim.peso_3));
          await AsyncStorage.setItem('configBoletimPeso_4', String(configBoletim.peso_4));
          await AsyncStorage.setItem('configBoletimPeso_B1', String(configBoletim.peso_b_1));
          await AsyncStorage.setItem('configBoletimPeso_B2', String(configBoletim.peso_b_2));
          await AsyncStorage.setItem('configBoletimMb', String(configBoletim.mb));
          await AsyncStorage.setItem('configBoletimMbb', String(configBoletim.mbb));
        } catch (error) {
          console.log(error);
        }
    };

    async function retrieveConfig(){
        try {
          const p1 = await AsyncStorage.getItem('configBoletimPeso_1');
          const p2 = await AsyncStorage.getItem('configBoletimPeso_2');
          const p3 = await AsyncStorage.getItem('configBoletimPeso_3');
          const p4 = await AsyncStorage.getItem('configBoletimPeso_4');
          const b1 = await AsyncStorage.getItem('configBoletimPeso_B1');
          const b2 = await AsyncStorage.getItem('configBoletimPeso_B2');
          const mb = await AsyncStorage.getItem('configBoletimMb');
          const mbb = await AsyncStorage.getItem('configBoletimMbb');

          const values = [p1, p2, p3, p4, b1, b2, mb, mbb];

          for(var i in values){
              if(values[i] == null){
                setConfig();
                return null;
              }
          }

          configBoletim.peso_1 = Number(p1);
          configBoletim.peso_2 = Number(p2);
          configBoletim.peso_3 = Number(p3);
          configBoletim.peso_4 = Number(p4);
          configBoletim.peso_b_1 = Number(b1);
          configBoletim.peso_b_2 = Number(b2);
          configBoletim.mb = Number(mb);
          configBoletim.mbb = Number(mbb);
        } catch (error) {
          console.log(error);
        }
    };

    function navigationToMyProfile(){
        navigation.navigate('MyProfile');
    }

    async function handleStart(ano, periodo){
        setLoading(true);
        setWarning(null);

        const disc = await api.get(`minhas-informacoes/boletim/${ano}/${periodo}/`, {
            headers: {Authorization: user.token}
        });

        boletim.fraquencia = arredondar(calcularPercentual(disc.data), 2);
        
        for(var i in disc.data){
            var x = disc.data[i];
            materia.discipl[i] = coletarInfo(x);
        }

        loadBoletim();
    }

    function arredondar(numeros, casas){
        return +(parseFloat(numeros).toFixed(casas));
    }

    function calcularPercentual(disciplinas){
        var number = 0;
        var total = 0;
        for(var i in disciplinas){
            number += 1;
            total += disciplinas[i].percentual_carga_horaria_frequentada;
        }
        return Number(Number(total)/Number(number));
    }

    function coletarInfo(base){
        delete base.carga_horaria;
        delete base.carga_horaria_cumpridas;
        delete base.media_final_disciplina;
        delete base.carga_horaria;
        delete base.segundo_semestre;

        var n_final = base.nota_avaliacao_final.nota;
        delete base.nota_avaliacao_final;

        var n_1 = base.nota_etapa_1.nota;
        delete base.nota_etapa_1;

        var n_2 = base.nota_etapa_2.nota;
        delete base.nota_etapa_2;

        var n_3 = base.nota_etapa_3.nota;
        delete base.nota_etapa_3;

        var n_4 = base.nota_etapa_4.nota;
        delete base.nota_etapa_4;

        base.n1 = n_1;
        base.n2 = n_2;
        base.n3 = n_3;
        base.n4 = n_4;
        base.nf = n_final;

        base.tin = base.disciplina.split(' - ')[0].split('.')[1];

        base.isSemestral = "Anual";
        if(base.quantidade_avaliacoes != 4){
            base.isSemestral = "Semestral";
        }

        base.state = 0;
        base.color = "#20a83d";
        base.icon = "plussquareo";
        base.bimestreAtual = checarBimestre(base.isSemestral, base.n1, base.n2, base.n3, base.n4);
        base.disciplina = base.disciplina.split(' - ')[1].split('(')[0];

        return base;
    }

    function checarBimestre(semestral, nota_1, nota_2, nota_3, nota_4){
        const vetor = [nota_1, nota_2, nota_3, nota_4];
        for(var i in vetor){
            if(vetor[i] == null){
                if(semestral == "Semestral" && i == 2){
                    return "2º Bimestre";
                }
                return (Number(i) + Number(1) + "º Bimestre");
            }
        }
        return "4º Bimestre";
    }

    async function loadBoletim(){
        for(var i in materia.discipl){
            let vetor = await materia.discipl[i];
            
            var loadResult = await load(vetor.n1, vetor.n2, vetor.n3, vetor.n4, vetor.bimestreAtual, vetor.isSemestral, configBoletim.mb, configBoletim.mbb, configBoletim.peso_1, configBoletim.peso_2, configBoletim.peso_3, configBoletim.peso_4, configBoletim.peso_b_1, configBoletim.peso_b_2);
            materia.discipl[i].minNesce = loadResult[0];
            materia.discipl[i].recomen = loadResult[1];
            materia.discipl[i].max = loadResult[2];

            if(

            ((materia.discipl[i].bimestreAtual == "4º Bimestre" && materia.discipl[i].isSemestral == "Anual") || 
            (materia.discipl[i].bimestreAtual == "2º Bimestre" &&  materia.discipl[i].isSemestral == "Semestral")) && 
            ((materia.discipl[i].n4 != null && materia.discipl[i].isSemestral == "Anual") || 
            (materia.discipl[i].n2 != null && materia.discipl[i].isSemestral == "Semestral")) && 
            ((materia.discipl[i].n4 < materia.discipl[i].minNesce && materia.discipl[i].isSemestral == "Anual") || 
            (materia.discipl[i].n2 < materia.discipl[i].minNesce && materia.discipl[i].isSemestral == "Semestral"))
            
            ){
                materia.discipl[i].bimestreAtual = "Prova Final";
                console.log("Prova Final - " + materia.discipl[i].disciplina + " - " + loadResult);
                loadResult = await load(vetor.n1, vetor.n2, vetor.n3, vetor.n4, vetor.bimestreAtual, vetor.isSemestral, configBoletim.mb, configBoletim.mbb, configBoletim.peso_1, configBoletim.peso_2, configBoletim.peso_3, configBoletim.peso_4, configBoletim.peso_b_1, configBoletim.peso_b_2);
                materia.discipl[i].minNesce = loadResult[0];
                materia.discipl[i].recomen = loadResult[1];
                materia.discipl[i].max = loadResult[2];
            }else if((materia.discipl[i].bimestreAtual == "4º Bimestre" || (materia.discipl[i].bimestreAtual == "2º Bimestre" &&  materia.discipl[i].isSemestral == "Semestral")) && (materia.discipl[i].n4 != null || (materia.discipl[i].n2 != null && materia.discipl[i].isSemestral == "Semestral")) && (materia.discipl[i].n4 >= materia.discipl[i].minNesce || (materia.discipl[i].n2 >= materia.discipl[i].minNesce && materia.discipl[i].isSemestral == "Semestral"))){
                materia.discipl[i].minNesce = "\nSem mais provas";
                materia.discipl[i].recomen = "\nSem mais provas";
                materia.discipl[i].max = materia.discipl[i].media_disciplina;         
            }
            
            if(materia.discipl[i].bimestreAtual == "Prova Final" && materia.discipl[i].nf != null){
                materia.discipl[i].minNesce = "\nSem mais provas";
                materia.discipl[i].recomen = "\nSem mais provas";
                materia.discipl[i].max = materia.discipl[i].media_disciplina;  
            }
        }

        setLoading(false);
        setWarning({
            height: 0, 
            width: 0,
            backgroundColor: 'transparent'
        });

        navigationToMyBoletim();
    }

    async function navigationToMyBoletim(){
        nullToDefault(materia.discipl);
        navigation.navigate('MyBoletim');
    }

    function navigationToMyBoletimConfig(){
        navigation.navigate('MyBoletimConfig');
    }

    function nullToDefault(base){
        for(var i in base){
            if(base[i].n1 == null){
                base[i].n1 = " 1º ";
            }
            if(base[i].n2 == null){
                base[i].n2 = " 2º ";
            }
            if(base[i].n3 == null){
                base[i].n3 = " 3º ";
            }
            if(base[i].n4 == null){
                base[i].n4 = " 4º ";
            }
            if(base[i].nf == null){
                base[i].nf = " PF ";
            }
            if(base[i].media_disciplina == null){
                base[i].media_disciplina = "Indefinida";
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.perfil}>
                    <Image source={{uri: user.foto_url}} defaultSource={require('../../../assets/blank.png')} style={styles.perfilImage}></Image>
                    <Text style={styles.perfilText}>{user.nome}</Text>
                </View>
                <TouchableOpacity disabled={loading} style={styles.voltar} onPress={navigationToMyProfile}>
                    <Text style={styles.voltarText}>Voltar</Text>
                    <AntDesign style={styles.voltarLogo} name="leftsquareo" size={28} color={"#2091a8"}/>              
                </TouchableOpacity>
            </View>
            <View style={styles.configList}>
                <TouchableOpacity disabled={loading} style={styles.config} onPress={navigationToMyBoletimConfig}>
                    <Text style={styles.configText}>Configuração</Text>
                    <AntDesign style={styles.configIcon} name="setting" size={35} color='black'></ AntDesign>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={user.periodos_letivos}
                style={styles.flatList}
                keyExtractor={periodo => String(periodo.ano_letivo)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: periodo }) => (
                    <TouchableOpacity disabled={loading} style={styles.periodo} onPress={e => {handleStart(periodo.ano_letivo, periodo.periodo_letivo)}}>
                        <Text style={styles.periodoText}>Boletim de {periodo.ano_letivo}</Text>
                        <AntDesign style={styles.periodoIcon} name="doubleright" size={35} color='#20a83d'></ AntDesign>
                    </TouchableOpacity>
                )}
            ></FlatList>
            <View style={[styles.warning, warning]}>
                <Text style={styles.warningText}>Aguarde...</Text>       
            </View>
        </View>
    );
}