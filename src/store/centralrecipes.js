import React, { useState, createContext, useEffect } from "react";
import stockedRecipes from "./datarecipes.json";

export const PanemContext = createContext(null);

/*
const keyIndex = e.target.dataset.index;
const datas = recipesRegistered[keyIndex];

const url = `(${keyIndex})`;
window.location.hash = url;
*/

function setUrl(i){
  const url = `(${i})`;
  window.location.hash = url;
}

export const PanemContextProvider = (props) => {
  const [recipedata, setRecipedata] = useState(stockedRecipes[0]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [totaldemande, setTotaldemande] = useState(0);

  useEffect(() => {
    setUrl(indexSelected);
    setRecipedata(stockedRecipes[indexSelected])
  }, [indexSelected]);

  const provider = {
    recipes: stockedRecipes,
    indexSelected,
    recipedata,
    setIndexSelected,
    totaldemande,
    setTotaldemande
  };

  return (
    <PanemContext.Provider value={provider}>
      {props.children}
    </PanemContext.Provider>
  );
};
