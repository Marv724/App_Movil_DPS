import { ScrollView } from "react-native";
import FormularioSala from "../app/salas/formulariosala";
import TablaSalas from "../app/salas/tablasalas";

export default function SalaScreen(){
    return <TablaSalas ListHeaderComponent={<FormularioSala />} />
}   