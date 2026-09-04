import { ScrollView } from "react-native";
import FormularioSala from "../app/salas/formulariosala";
import TablaSalas from "../app/salas/tablasalas";

export default function salaScreen(){
    return(
        <ScrollView contentContainerStyle={{padding: 16}}>
            <FormularioSala />
            <TablaSalas />
        </ScrollView>
    )
}