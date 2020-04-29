import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#2bc44c',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
    },

    form: {
        paddingHorizontal: 10,
        backgroundColor: '#17b038',
        borderRadius: 10,
    },

    viewInput: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    input: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 10,
        borderColor: '#c3ebcb',
        borderWidth: 1,
        height: 50,
        width: 275,
    },

    inputLogo: {
        paddingTop: 20,
        marginLeft: 5
    },
    
    button: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    textButton: {
        paddingVertical: 6,
        color: '#33a149',
        fontSize: 25
    },

    ident: {
        flexDirection: 'row',
        padding: 10 
    },

    identText: {
        fontSize: 30,
        color: 'white',
        marginRight: 5
    },

    link: {
        flexDirection: 'row',
    },

    linkLogo: {
        marginVertical: 9,
        marginRight: 5
    },

    linkText: {
        color: 'white',
        fontSize: 20,
        marginVertical: 9
    },

    switch: {
        flexDirection: 'row',
        marginTop: 10,
    },

    switchText: {
        color: 'white',
        fontSize: 16,
        marginTop: 2
    },

    switchButton: {
        
    }
});