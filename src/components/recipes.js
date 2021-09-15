import React, {Fragment, useState, useContext} from "react";
import datarecipes from "../store/datarecipes.json";
import trashIcon from '../style/trash.svg';
import { PanemContext } from "../store/centralrecipes";

const getAlreadyRegistred = () => {
    let newExisting = datarecipes;
    if(localStorage.getItem("panemportions-recipes") !== null){
        newExisting = newExisting.concat(JSON.parse(localStorage.getItem("panemportions-recipes")).recipes);
    }
    return newExisting;
}

const recipeInsideStorage = getAlreadyRegistred();


const Recipes = () => {

    const { setIndexSelected, indexSelected } = useContext(PanemContext);

    /* Just usefull for refresh the component when lang is changed */
    const [existing, setExisting] = useState(recipeInsideStorage);

    const deleteRecipe = (e) => {
        const keyId = parseInt(e.target.dataset.index);
        if (window.confirm("Êtes vous sûr de vouloir supprimer ?")) {
            const nextExisting = existing.filter((item, i) => i !== keyId);
            const initObj = {recipes: nextExisting}
            const toSave = JSON.stringify(initObj);
            localStorage.setItem("panemportions-recipes", toSave);
            setExisting(nextExisting);
        }
    }

    const recipe = [];
    
    for (let a = 0; a < existing.length; a++) {

        const title = `${existing[a].titre} :`;

          recipe.push(
          <li className={`recipe${indexSelected === a ? " active" : " "}`} key={a}>
            <span data-index={a} role="presentation" onClick={() => {setIndexSelected(a)}} title={title} className="recipe">
                <b>{existing[a].titre}</b> {
                    existing[a].pieces.map(piece => 
                    `● ${piece.nombre} ${piece.titre} de ${piece.poid}gr `
                    )
                }
            </span>
            {/* pour trasher la ligne seulement si non éditable */}
            {existing[a].editable && <span data-index={a} role="presentation" onFocus={(e) => deleteRecipe(e)} onClick={(e) => deleteRecipe(e)} title="deleteThisRecipe" className="trash">
                <img width="15" src={trashIcon} alt="supprimer"/>
            </span>}
          </li>)
    }



    return (
        <Fragment>
            {existing.length > 0 && <section className="existing">
                <ul className="recipes">
                    {recipe}
                </ul>
            </section>}
        </Fragment>
    )

};

export default Recipes;