import React, { useState } from 'react';
import api from '../../services/suap';
import user from '../../services/entity/user';
import config from '../../services/config/configLogin';
import { View, TouchableOpacity, Text, Switch, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function LoginResp() {
    const [matricula, setMatricula] = useState('');
    const [chave, setChave] = useState('');
    const [remember, setRemember] = useState(false);
    const navigation = useNavigation();
    var switchOption = remember;

    retrieveConfig();

    async function updateRemember(){
        switchOption = !switchOption;
        setRemember(switchOption);
        setConfig();
    }

    async function setConfig(){
        try {
            await AsyncStorage.setItem('configLoginDefRememberResp', `${switchOption}`);
            if(switchOption){
                await AsyncStorage.setItem('configLoginDefMatriResp', `${matricula}`);
            }else{
                await AsyncStorage.setItem('configLoginDefMatriResp', '');
            }
        } catch (error) {
          console.log(error);
        }
    };

    async function retrieveConfig(){
        try {
            config.def_remember_resp = await AsyncStorage.getItem('configLoginDefRememberResp');
            var us = await AsyncStorage.getItem('configLoginDefMatriResp');
            if(config.def_remember_resp == "true" && config.def_remember_resp != null && us != null){       
                config.def_user_resp = us;
                setRemember(true);      
                if(matricula == ''){
                    setMatricula(config.def_user_resp);
                }else{
                    setConfig();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    function navigationToLogin(){
    navigation.navigate('Login');
    }

    function navigationToMyProfile(){
    navigation.navigate('MyProfile');
    }

    async function handleLogin(){
        try {
            const response = await api.post('autenticacao/acesso_responsaveis/', { matricula, chave });
            user.token = 'JWT ' + response.data.token;
            const dados = await api.get('minhas-informacoes/meus-dados/', {
                headers: {Authorization: user.token}
            });
            if(dados.data.tipo_vinculo == `Aluno`){
                user.nome = dados.data.nome_usual;
                user.foto_url = `https://suap.ifrn.edu.br/` + dados.data.url_foto_75x100;
                const boletim = await api.get('minhas-informacoes/meus-periodos-letivos/', {
                    headers: {Authorization: user.token}
                });
                user.periodos_letivos = boletim.data;
                user.qtd_periodos = boletim.data.length;
                navigationToMyProfile();
            }else{
                alert('Esse aplicativo atualmente só oferece serviço a Alunos e Responsáveis.');
            }
        } catch(Err) {
            alert(`Encontramos um erro nos dados informados.`);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.ident}>
                    <Text style={styles.identText}>Responsável |</Text>
                    <TouchableOpacity style={styles.link} onPress={navigationToLogin}>   
                        <AntDesign style={styles.linkLogo} name="leftsquareo" size={28} color={"white"}/>              
                        <Text style={styles.linkText}>Aluno</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.viewInput}>
                    <AntDesign style={styles.inputLogo} name="idcard" size={28} color={"white"}/>
                    <TextInput placeholder={"Matricula do Aluno"} value={matricula} underlineColor={'transparent'} theme={{colors: {primary: 'transparent'}}} style={styles.input} selectionColor={"#c3ebcb"} keyboardType={"numeric"} maxLength={ 14 } value={matricula} onChangeText={matricula => setMatricula(matricula)}></TextInput>
                </View>
                <View style={styles.viewInput}>
                    <Ionicons style={styles.inputLogo} name="md-key" size={28} color={"white"}/>
                    <TextInput placeholder={"Chave do Responsável"} value={chave} underlineColor={'transparent'} theme={{colors: {primary: 'transparent'}}} style={styles.input} selectionColor={"#c3ebcb"} secureTextEntry={true} value={chave} onChangeText={chave => setChave(chave)}></TextInput>               
                </View>
                <View style={styles.switch}>
                <Switch
                ios_backgroundColor={'#03821e'}
                trackColor={{false: '#03821e', true: '#7ae35d'}}
                thumbColor={"white"}
                style={styles.switchButton}
                onChangeValue={switchOption}
                onChange={updateRemember}
                value={remember}
                /><Text style={styles.switchText}>Usar sempre essa matricula? {switchOption? "Sim.":"Não."}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.textButton}>Entrar</Text></TouchableOpacity>
            </View>
        </View>
    );
}

