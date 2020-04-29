import React, { useState } from 'react';
import user from '../../../services/entity/user';
import configBoletim from '../../../services/config/configBoletim';
import { View, TouchableOpacity, Text, FlatList, TextInput, ScrollView, AsyncStorage} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

import styles from './styles';

export default function Profile() {
    console.log(configBoletim);
    const navigation = useNavigation();
    const [data, setData] = useState([
        { id: 0, max: 3, def: configBoletim.mb, value: configBoletim.mb, title: "Média Anual", color: "black", bg: "#7be892", bc: "#7be892"},
        { id: 1, max: 2, def: configBoletim.peso_1, value: configBoletim.peso_1, title: "  — Peso 1º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
        { id: 2, max: 2, def: configBoletim.peso_2, value: configBoletim.peso_2, title: "  — Peso 2º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
        { id: 3, max: 2, def: configBoletim.peso_3, value: configBoletim.peso_3, title: "  — Peso 3º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
        { id: 4, max: 2, def: configBoletim.peso_4, value: configBoletim.peso_4, title: "  — Peso 4º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"}, 
        { id: 5, max: 3, def: configBoletim.mbb, value: configBoletim.mbb, title: "Média Semestral", color: "black", bg: "#7be892", bc: "#7be892"},
        { id: 6, max: 2, def: configBoletim.peso_b_1, value: configBoletim.peso_b_1, title: "  — Peso 1º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
        { id: 7, max: 2, def: configBoletim.peso_b_2, value: configBoletim.peso_b_2, title: "  — Peso 2º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
    ]);

    const [dataRecovery, setDataRecovery] = useState(data);
    
    const [mb, setMb] = useState(data[0].value);
    const [p1, setP1] = useState(data[1].value);
    const [p2, setP2] = useState(data[2].value);
    const [p3, setP3] = useState(data[3].value);
    const [p4, setP4] = useState(data[4].value);
    const [mbb, setMbb] = useState(data[5].value);
    const [b1, setB1] = useState(data[6].value);
    const [b2, setB2] = useState(data[7].value);
    
    function navigationToMyProfile(){
        setDataRecovery(data);
        setConfig();
        navigation.navigate('MyBoletimList');
    }

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

    async function reset(){
        configBoletim.mb = dataRecovery[0].value;
        configBoletim.peso_1 = dataRecovery[1].value;
        configBoletim.peso_2 = dataRecovery[2].value;
        configBoletim.peso_3 = dataRecovery[3].value;
        configBoletim.peso_4 = dataRecovery[4].value;
        configBoletim.mbb = dataRecovery[5].value;
        configBoletim.peso_b_1 = dataRecovery[6].value;
        configBoletim.peso_b_2 = dataRecovery[7].value;
        setData(dataRecovery);
        navigationToMyProfile();
    }

    function setValue(x, id){
        if(x != NaN){
        switch (id) {
            case 0:
                if(x > 100){
                    x = 100;
                }
                configBoletim.mb = x;
                setMb(x);
                break;
            case 1:
                if(x > 10){
                    x = 10;
                }
                configBoletim.peso_1 = x;
                setP1(x);
                break;  
            case 2:
                if(x > 10){
                    x = 10;
                }
                configBoletim.peso_2 = x;
                setP2(x);
                break; 
            case 3:
                if(x > 10){
                    x = 10;
                }
                configBoletim.peso_3 = x;
                setP3(x);
                break; 
            case 4:
                if(x > 10){
                    x = 10;
                }
                configBoletim.peso_4 = x;
                setP4(x);
                break;
            case 5:
                if(x > 100){
                    x = 100;
                }
                configBoletim.mbb = x;
                setMbb(x);
                break;
            case 6:
                if(x > 10){
                    x = 10;
                }
                configBoletim.peso_b_1 = x;
                setB1(x);
                break;
            case 7:
                if(x > 10){
                    x = 10;
                }
                configBoletim.peso_b_2 = x;
                setB2(x);
                break;
            default:
                break;
        }

        setData([
            { id: 0, max: 3, def: configBoletim.mb, value: configBoletim.mb, title: "Média Anual", color: "black", bg: "#7be892", bc: "#7be892"},
            { id: 1, max: 2, def: configBoletim.peso_1, value: configBoletim.peso_1, title: "  — Peso 1º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
            { id: 2, max: 2, def: configBoletim.peso_2, value: configBoletim.peso_2, title: "  — Peso 2º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
            { id: 3, max: 2, def: configBoletim.peso_3, value: configBoletim.peso_3, title: "  — Peso 3º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
            { id: 4, max: 2, def: configBoletim.peso_4, value: configBoletim.peso_4, title: "  — Peso 4º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"}, 
            { id: 5, max: 3, def: configBoletim.mbb, value: configBoletim.mbb, title: "Média Semestral", color: "black", bg: "#7be892", bc: "#7be892"},
            { id: 6, max: 2, def: configBoletim.peso_b_1, value: configBoletim.peso_b_1, title: "  — Peso 1º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
            { id: 7, max: 2, def: configBoletim.peso_b_2, value: configBoletim.peso_b_2, title: "  — Peso 2º Bimestre", color: "#20a83d", bg: "white", bc: "#ebebeb"},
        ]);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.cancelar} onPress={reset}>
                    <Text style={styles.cancelarText}>Cancelar</Text>
                    <AntDesign style={styles.cancelarLogo} name="closesquareo" size={28} color={"#e65c5c"}/>              
                </TouchableOpacity>
                <TouchableOpacity style={styles.voltar} onPress={navigationToMyProfile}>
                    <Text style={styles.voltarText}>Salvar e Voltar</Text>
                    <AntDesign style={styles.voltarLogo} name="leftsquareo" size={28} color={"#2091a8"}/>              
                </TouchableOpacity>
            </View>    
            <ScrollView keyboardDismissMode='on-drag' style={[{flex: 1, backgroundColor: 'white'}]}>
            <FlatList 
                keyboardDismissMode="none"
                data={data}
                style={styles.configList}
                keyExtractor={i => String(i.id)}
                showsVerticalScrollIndicator={true}
                renderItem={({ item: i }) => (
                        <View style={[styles.config, {backgroundColor: i.bg, borderColor: i.bc}]}>
                            <Text style={[styles.configText, {color: i.color}]}>{i.title}</Text>
                            <View style={styles.inputView}>
                                <Text style={[styles.configTextSec, {color: i.color}]}>{i.max == 2? "0 ~ 10":"0 ~ 100"}</Text>
                                <TextInput
                                placeholder={`${i.def}`}
                                value={`${i.value}`}
                                onChangeText={placeholder => {setValue(Number(placeholder), Number(i.id))}} 
                                underlineColor={'transparent'} 
                                theme={{colors: {primary: 'transparent'}}} 
                                style={styles.input} 
                                selectionColor={"#c3ebcb"} 
                                maxLength={i.max} 
                                keyboardType={"numeric"}>
                                </TextInput>
                            </View>
                        </View>
                )}
            ></FlatList>
            </ScrollView>
        </View>
    );
}