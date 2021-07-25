import Recipes from "./recipes.js";
import Pieces from "./pieces.js";
import Ingredients from "./ingredients.js";
import Petrissage from "./petrissage.js";
import Temperature from "./temperature.js";
// import { PanemContext } from "../store/recipes";

function App() {

    // const { indexSelected } = useContext(PanemContext);

    return (
        <div className="App">
        <section className="etalon">
            <Recipes />
        </section>
        <section className="pieces">
            <Pieces />
        </section>
        <section className="ingredients">
            <Ingredients />
        </section>
        <section className="timing">
            <Petrissage />
        </section>
        <section className="temperature">
            <Temperature />
        </section>
        </div>
    );
}

export default App;