import React, { useState } from 'react';
import api from '../../services/suap';
import user from '../../services/entity/user';
import config from '../../services/config/configLogin';
import { View, TouchableOpacity, Text, Switch, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            await AsyncStorage.setItem('configLoginDefRemember', `${switchOption}`);
            if(switchOption){
                await AsyncStorage.setItem('configLoginDefUser', `${username}`);
            }else{
                await AsyncStorage.setItem('configLoginDefUser', '');
            }
        } catch (error) {
          console.log(error);
        }
    };

    async function retrieveConfig(){
        try {
            config.def_remember = await AsyncStorage.getItem('configLoginDefRemember');
            var us = await AsyncStorage.getItem('configLoginDefUser');
            if(config.def_remember == "true" && config.def_remember != null && us != null){        
                config.def_user = us;
                setRemember(true);      
                if(username == ''){
                    setUsername(config.def_user);
                }else{
                    setConfig();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    function navigationToLoginResp(){
    navigation.navigate('LoginResp');
    }

    function navigationToMyProfile(){
    navigation.navigate('MyProfile');
    }

    async function handleLogin(){
        setConfig();
        try {
            const response = await api.post('autenticacao/token/', { username, password });
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
                    <Text style={styles.identText}>Aluno |</Text>
                    <TouchableOpacity style={styles.link} onPress={navigationToLoginResp}>
                        <AntDesign style={styles.linkLogo} name="rightsquareo" size={28} color={"white"}/>
                        <Text style={styles.linkText}>Responsável</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewInput}>
                    <AntDesign style={styles.inputLogo} name="idcard" size={28} color={"white"}/>
                    <TextInput placeholder={"Matricula"} value={username} underlineColor={'transparent'} theme={{colors: {primary: 'transparent'}}} style={styles.input} selectionColor={"#c3ebcb"} keyboardType={"numeric"} maxLength={ 14 } onChangeText={username =>
                        setUsername(username)
                    }></TextInput>
                </View>
                <View style={styles.viewInput}>
                    <Ionicons style={styles.inputLogo} name="md-key" size={28} color={"white"}/>
                    <TextInput placeholder={"Senha do Suap"} value={password}  underlineColor={'transparent'} theme={{colors: {primary: 'transparent'}}} style={styles.input} selectionColor={"#c3ebcb"} secureTextEntry={true} onChangeText={password =>
                        setPassword(password)
                    }></TextInput>               
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

