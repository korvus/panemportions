import React from "react"
import "./style/main.css";
import "./style/page.css";

import { PanemContextProvider } from "./store/centralrecipes.js";
import Home from "./components/home.js";

function App() {
  return (
    <PanemContextProvider>
      <Home />
    </PanemContextProvider>
  );
}

export default App;
