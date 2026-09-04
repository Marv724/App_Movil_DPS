import FormularioFuncion from "../app/funciones/FormularioFuncion"
import TablaFucniones from "../app/funciones/TablaFunciones";

export default function FuncionScreen() {
    return <TablaFucniones ListHeaderComponent={<FormularioFuncion />} />
}