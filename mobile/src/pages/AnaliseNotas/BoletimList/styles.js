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

    flatList: {
        backgroundColor: 'white'
    },

    periodo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#ebebeb'
    },

    periodoText: {
        fontSize: 22,
        color: '#20a83d',
        marginTop: 12,
        marginLeft: 12
    },

    periodoIcon: {
        marginRight: 12,
        marginTop: 10
    },

    configList: {
        backgroundColor: '#7be892'
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

    configIcon: {
        marginRight: 12,
        marginTop: 10
    },
});