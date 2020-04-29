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
    
    frequencia: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 15,
        padding: 5,
        borderRadius: 5
    },

    frequenciaText: {
        fontSize: 20,
        color: '#2091a8',
        paddingHorizontal: 5,
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

    materia: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#fafafa',
    },

    materiaButton:{
        width: 55,
        paddingVertical: 15,
    },

    materiaText: {
        width: 280,
        fontSize: 18,
        marginTop: 4,
        marginRight: 70,
        paddingVertical: 15
    },

    materiaIcon: {
        marginLeft: 8,
    },

    box: {
        backgroundColor: '#fafafa',
    },

    boxText: {
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5',
        fontSize: 20,
        padding: 5,
    },

    boxTextContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
    },

    boxTextContainerItem: {
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        padding: 5,
    },

    boxViewContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5',
        padding: 5,
    },

    boxViewText: {
        fontSize: 15,
    },

    boxViewIcon: {
        padding: 2,
        marginLeft: -1,
        marginRight: 4,
    },
});