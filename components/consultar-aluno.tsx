import { supabase } from "@/lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

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
                    </View>
                )}
            />
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