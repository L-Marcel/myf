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

    logout: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 5,
        borderRadius: 10,
    },

    logoutText: {
        fontSize: 20,
        color: '#e65c5c',
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

    serviceList: {
        backgroundColor: 'white'
    },

    service: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#ebebeb'
    },

    serviceText: {
        fontSize: 22,
        color: '#20a83d',
        marginTop: 12,
        marginLeft: 12
    },

    serviceIcon: {
        marginRight: 12,
        marginTop: 10
    },
});