import { useContext } from "react";
import RecipesSelection from "./organigramme/recipes.js";
import Hours from "./organigramme/hours.js";
import Tableau from "./organigramme/tableau.js";
import Menu from "./menu.js";
import ModalLegend from "./organigramme/modalChoice.js";
import { PanemContext } from "../store/selectedrecipes.js";

function App() {

    const { displayModalChoices } = useContext(PanemContext);

    return (
        <div className="App">
            <section className="menu">
                <Menu page="organigramme" />
            </section>
            <section className="etalon">
                <RecipesSelection />
            </section>
            <section className="heures">
                <Hours />
            </section>
            <section className="tableau">
                <Tableau />
            </section>
            {displayModalChoices && <section className="modalContainer">
                <ModalLegend />
            </section>}
        </div>
    );
}

export default App;