import { ScrollView } from "react-native";
import FormularioFuncion from "../app/funciones/FormularioFuncion"
import TablaFucniones from "../app/funciones/TablaFunciones";

export default function funcionScreen() {
    return(
        <ScrollView contentContainerStyle={{padding: 16}}>
            <FormularioFuncion />
            <TablaFucniones />
        </ScrollView>
    );
}