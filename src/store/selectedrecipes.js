import React, { useState, createContext } from "react";
import stockedRecipes from "./datarecipes.json";

export const PanemContext = createContext(null);

/*
const keyIndex = e.target.dataset.index;
const datas = recipesRegistered[keyIndex];

const url = `(${keyIndex})`;
window.location.hash = url;
*/

export const PanemContextProvider = (props) => {
  const [listSelected, setListSelected] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);
  const [indexSelected, setIndexSelected] = useState();
  const [displayModalChoices, setDisplayModalChoices] = useState(false);
  const [nbHeures, setNbHeures] = useState(7);

  const initiateList = (indexItem) => {
    let neutralArray = new Array(nbHeures*4).fill('');
    // Si on ajoute une recette.
    if(!listSelected.includes(indexItem)){
        setListSelected([...listSelected, indexItem]);
        for (let a = 0; a < listSelected.length+1; a++) {
          if(listSchedule[a] !== undefined){
            neutralArray = listSchedule[a];
          } else {
            neutralArray = new Array(nbHeures*4).fill('');
          }
          listSchedule[a] = neutralArray;
        }
    } else {
    // Si on la supprime
        let removed = 0;
        setListSelected(listSelected.filter((selected, a) => {
          if(selected === indexItem) removed = a;
          return selected !== indexItem;
        }));

        listSchedule.splice(removed, 1);
    }
    setListSchedule([...listSchedule]);
    
  }

  const selectAction = (label) => {
    const newArray = listSchedule.map(arr => {
      return arr.map((usage) => {
        if(usage === "?"){
          return label;
        }
        return usage;
      })
    });
    setListSchedule([...newArray]);
    setDisplayModalChoices(false);
  }

  const initSchedule = (hourselected, hour, recipeIndex) => {
    let neutralArray = new Array(nbHeures*4).fill('');
    const starthour = Math.min(hourselected, hour);
    const endhour = Math.max(hourselected, hour);
    for (let a = 0; a < listSelected.length; a++) {
      if(listSchedule[a] !== undefined){
        neutralArray = listSchedule[a];
      }
      if(a === recipeIndex){
        const cloneNeutralArray = neutralArray.map((v, i) => {
          if((i > starthour && i < endhour) || i === endhour || i === starthour){
            return "?";
          } else {
            return v;
          }
        });
        // console.log("modifiedArray", cloneNeutralArray);
        listSchedule[a] = cloneNeutralArray;
      } else {
        listSchedule[a] = neutralArray;
      }
    }
    setListSchedule([...listSchedule]);
  }

  const provider = {
    recipes: stockedRecipes,
    indexSelected,
    displayModalChoices,
    setDisplayModalChoices,
    listSelected,
    setIndexSelected,
    initiateList,
    initSchedule,
    listSchedule,
    nbHeures, 
    selectAction,
    setNbHeures
  };

  return (
    <PanemContext.Provider value={provider}>
      {props.children}
    </PanemContext.Provider>
  );
};
