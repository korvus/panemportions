import React, {Fragment, useContext} from "react";
import datarecipes from "../../store/datarecipes.json";
import { PanemContext } from "../../store/selectedrecipes.js";

const getAlreadyRegistred = () => {
    let newExisting = datarecipes;
    if(localStorage.getItem("panemportions-recipes") !== null){
        newExisting = newExisting.concat(JSON.parse(localStorage.getItem("panemportions-recipes")).recipes);
    }
    return newExisting;
}

const recipeInsideStorage = getAlreadyRegistred();


const Recipes = () => {

    const { initiateList, listSelected } = useContext(PanemContext);

    const recipe = [];
    
    for (let a = 0; a < recipeInsideStorage.length; a++) {

        const title = `${recipeInsideStorage[a].titre} :`;

          recipe.push(
          <li className="recipe" key={a}>
            <span
                onClick={() => {initiateList(a)}}
                data-index={a} 
                role="presentation" 
                title={title} 
                className="recipe">
                <input 
                    type="checkbox" name={`recipe-${a}`} 
                    checked={listSelected.includes(a)}
                    value={a}
                    onChange={() => {}}
                />
                <span>
                <b>{recipeInsideStorage[a].titre}</b> {
                    recipeInsideStorage[a].pieces.map(piece => 
                    `● ${piece.nombre} ${piece.titre} de ${piece.poid}gr `
                    )
                }
                </span>
            </span>
          </li>)
    }


    return (
        <Fragment>
            {recipeInsideStorage.length > 0 && <section className="existing">
                <ul className="recipes">
                    {recipe}
                </ul>
            </section>}
        </Fragment>
    )

};

export default Recipes;