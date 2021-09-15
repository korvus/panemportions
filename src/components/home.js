import Proportions from "./proportions.js";
import Organigramme from "./organigramme.js";
import { Switch, Route } from "react-router-dom";
// import { PanemContext } from "../store/recipes";
import { PanemContextProvider } from "../store/selectedrecipes.js";

function App() {

    return (
        <Switch>
            <Route path="/organigramme">
                <PanemContextProvider>
                    <Organigramme />
                </PanemContextProvider>
            </Route>
            <Route path="/">
                <Proportions />
            </Route>
        </Switch>
    );

}

export default App;