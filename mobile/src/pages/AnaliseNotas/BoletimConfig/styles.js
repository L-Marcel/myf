import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#2bc44c',
        flex: 1,
        paddingHorizontal: 0,
    },

    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    perfil: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    perfilImage: {
        resizeMode: 'cover',
        width: 50,
        height: 50,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'white',
        margin: 10
    },

    perfilText: {
        fontSize: 25,
        color: 'white',
        paddingVertical: 15,
    },

    warning:{
        alignContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#ace6b8',
        bottom: 25,
        marginHorizontal: 120,
        padding: 5,
        borderRadius: 5,
        zIndex: 2,
    },

    warningText:{
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 5
    },
    
    voltar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 15,
        marginRight: 20,
        marginBottom: 15,
        padding: 5,
        borderRadius: 5
    },

    voltarText: {
        fontSize: 20,
        color: '#2091a8',
        paddingHorizontal: 5
    },

    cancelar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 15,
        padding: 5,
        borderRadius: 5
    },

    cancelarText: {
        fontSize: 20,
        color: '#e65c5c',
        paddingHorizontal: 5
    },

    configList: {
        backgroundColor: 'white',
    },

    config: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#7be892'
    },

    configText: {
        fontSize: 22,
        color: 'black',
        marginTop: 12,
        marginLeft: 12
    },

    configTextSec: {
        fontSize: 18,
        color: 'black',
        marginTop: 16,
        marginRight: 10
    },

    input: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 12,
        marginRight: 10,
        borderColor: 'black',
        borderWidth: 1,
        height: 35,
        width: 35,
        justifyContent: 'center',
        textAlign: 'center',
    },

    inputView: {
        flexDirection: 'row',
    },
});