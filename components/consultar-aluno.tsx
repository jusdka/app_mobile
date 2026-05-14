import { supabase } from "@/lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Toast from 'react-native-toast-message';
import {router} from "expo-router";

export default function ConsultarAluno(){
    const [alunos, setAlunos] = useState<any[]>([]);
    const isFocused = useIsFocused();

    useEffect(() =>{
        if(isFocused){
            carregarAlunos();
        }
    
    }, [isFocused]);

    async function carregarAlunos(){
        const {data, error} = await supabase
            .from("tb_aluno")
            .select("*") 
            
        setAlunos(data || []);
    }

    async function editarAluno(id: number, nome: string){
        Toast.show({
            type: 'error',
            text1: 'ERRO',
            text2: 'Erro ao editar aluno' + id + nome,
        });
        router.push({pathname: '/(tabs)/alterar', params: {id: id}});
    }
    async function excluirAluno(id: number, nome: string){
        const {error} = await supabase
            .from("tb_aluno")
            .delete().eq('id', id)

        if(error){
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Não foi possível excluir o aluno'
            })

        }else{
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Aluno excluído com sucesso!' + id + nome,
            });
        }
        carregarAlunos();
    }
    return(
        <View style={styles.container}>
            <Text>Consultar Aluno</Text>
            <FlatList
                data={ alunos }
                keyExtractor={(item) => item.id.toString()}
                renderItem = {({item}) =>(
                    <View>
                        <Text style = {styles.name}>{item.nome}</Text>
                        <Text style = {styles.meta}>{item.idade}</Text>
                        <Text style = {styles.meta}>{item.email}</Text>

                        <TouchableOpacity style={styles.buttonAlterar} onPress={()=> editarAluno(item.id, item.nome)}>
                            <Text>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonExcluir} onPress={()=> excluirAluno(item.id, item.nome)}>
                            <Text>Excluir</Text>
                        </TouchableOpacity>


                    </View>
                )}
            />
            <Toast/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
    },
    listContent: {
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    meta: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 4,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 16,
        marginTop: 32,
    },
    buttonAlterar:{
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonExcluir:{
        backgroundColor: '#ef4444',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    }
})