import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View } from 'react-native';

const AppStack = createStackNavigator();

//Login
import Login from './pages/Login';
import LoginResp from './pages/LoginResp';

//Profile
import Profile from './pages/Profile';

//Analise de Notas
import BoletimList from './pages/AnaliseNotas/BoletimList';
import BoletimConfig from './pages/AnaliseNotas/BoletimConfig';
import Boletim from './pages/AnaliseNotas/BoletimAnual';

export default function Routes(){
    return(
        <NavigationContainer>
            <StatusBar backgroundColor="#7ae35d" barStyle={'light-content'}></StatusBar>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                
                <AppStack.Screen name="Login" component={Login}></AppStack.Screen>
                <AppStack.Screen name="LoginResp" component={LoginResp}></AppStack.Screen>

                <AppStack.Screen name="MyProfile" component={Profile}></AppStack.Screen>
                
                <AppStack.Screen name="MyBoletimList" component={BoletimList}></AppStack.Screen>
                <AppStack.Screen name="MyBoletimConfig" component={BoletimConfig}></AppStack.Screen>
                <AppStack.Screen name="MyBoletim" component={Boletim}></AppStack.Screen>

            </AppStack.Navigator>
        </NavigationContainer>
    );
}