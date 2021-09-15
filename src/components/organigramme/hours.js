import React, {useContext} from "react";
import { PanemContext } from "../../store/selectedrecipes.js";
import '../../style/hours.css';

const Hours = () => {

    const { nbHeures, setNbHeures } = useContext(PanemContext);

    const changeHeure = (heure, direction) => {
        heure = Math.max(4, heure + direction);
        setNbHeures(heure);
    };

    return (
        <div className="selectHour">
            <h2>Durée</h2>
            <div>
                <button onClick={() => changeHeure(nbHeures, -1)}>-</button>
                <b>{nbHeures}h</b>
                <button onClick={() => changeHeure(nbHeures, 1)}>+</button>
            </div>
        </div>
    )

};

export default Hours;