import React, {useContext} from "react";
import { PanemContext } from "../../store/selectedrecipes.js";

const ModalLegend = () => {

    const { setDisplayModalChoices, selectAction } = useContext(PanemContext);

    return (
        <section className="modal">
            <span onClick={() => setDisplayModalChoices(false)} className="close" />
            <div className="legend">
                <h1>Selectionnez une action</h1>
                <h2>Retirer une action</h2>
                <dl>
                    <dt onClick={() => selectAction("")} className="cancel">X</dt>
                    <dd>Retirer une action existante</dd>
                </dl>
                <h2>Pour Pâte Levée Fermentée</h2>
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
                <h2>Pour pâte levée</h2>
                <dl>
                    <dt className="b" onClick={() => selectAction("B")}>B</dt>
                    <dd>Beurrage</dd>

                    <dt className="td" onClick={() => selectAction("Td")}>Td</dt>
                    <dd>Tour double</dd>

                    <dt className="ts" onClick={() => selectAction("Ts")}>Ts</dt>
                    <dd>Tour simple</dd>

                    <dt className="d" onClick={() => selectAction("D")}>D</dt>
                    <dd>Détaillage</dd>
                </dl>
            </div>
        </section>
    )

};

export default ModalLegend;