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
                        <Text>{item.nome}</Text>
                        <Text>{item.idade}</Text>
                        <Text>{item.email}</Text>

                        <TouchableOpacity onPress={()=> editarAluno(item.id, item.nome)}>
                            <Text>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> excluirAluno(item.id, item.nome)}>
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
            backgroundColor: "#fff",
            color: "#000",
        }
    })