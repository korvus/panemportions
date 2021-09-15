import React, {useContext} from "react";
import { PanemContext } from "../../store/selectedrecipes.js";

const Legend = () => {

    const { selectAction } = useContext(PanemContext);

    return (
        <section className="legend">
            <h2>Légende</h2>
            <dl>
                <dt onClick={() => selectAction("")} className="cancel">X</dt>
                <dd>Effacer la sélection</dd>
            </dl>
            <h4>Pâte Levée</h4>
            <dl>
                <dt onClick={() => selectAction("A")} className="a">A</dt>
                <dd>Autolyse</dd>
                
                <dt onClick={() => selectAction("P")} className="p">P</dt>
                <dd>Pétrissage</dd>
                
                <dt onClick={() => selectAction("Ps")} className="ps">Ps</dt>
                <dd>Pesage des pâtons</dd>

                <dt onClick={() => selectAction("F")} className="f">F</dt>
                <dd>Façonnage</dd>

                <dt onClick={() => selectAction("C")} className="c">C</dt>
                <dd>Cuisson</dd>
            </dl>
            <h4>Pour PLF (Pâte Levée Feuilletée)</h4>
            <dl>
                <dt  onClick={() => selectAction("B")} className="b">B</dt>
                <dd>Beurrage</dd>

                <dt onClick={() => selectAction("Td")} className="td">Td</dt>
                <dd>Tour double</dd>

                <dt onClick={() => selectAction("Ts")} className="ts">Ts</dt>
                <dd>Tour simple</dd>

                <dt onClick={() => selectAction("D")} className="d">D</dt>
                <dd>Détaillage</dd>
            </dl>
        </section>
    )

};

export default Legend;