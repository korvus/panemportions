import Recipes from "./recipes.js";
import Pieces from "./pieces.js";
import Ingredients from "./ingredients.js";
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
        <section className="temperatures">
            <Ingredients />
        </section>

        <section className="timing">

        </section>
        </div>
    );
}

export default App;