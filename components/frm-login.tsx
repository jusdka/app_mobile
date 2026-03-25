import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
} from 'react-native';

import { useState } from 'react';
//npm install react-native-toast-message
import Toast from 'react-native-toast-message';
export default function Login(){
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    function validarLogin(){
        if(usuario === 'admin'){
            Toast.show({
                type:'success',
                text1: 'Sucesso',
                text2: 'Login efetuado com sucesso'
            })
        }else{
             Toast.show({
                type:'error',
                text1: 'Erro!',
                text2: 'Usuário ou Senha inválidos'
            })
            //subir para o git
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.Text}> Área Restrita</Text>
            
            <TextInput 
                style={styles.Input} 
                placeholder="Informe seu usuário"
                value={usuario}
                onChangeText={setUsuario}
            />

            <TextInput 
                style={styles.Input}
                placeholder="Informe sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <Toast />

            <TouchableOpacity style={styles.Button} onPress={validarLogin}>
                <Text style={styles.Text}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    Text:{
        fontSize: 24, color: '#ffffff',
        marginBottom:20,
    },
    Input:{
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom:20,
        color: '#000000'
    },
    Button:{
        width: '100%',
        height: 40,
        backgroundColor: '#c2e015',
        alignItems: 'center',
    },
})