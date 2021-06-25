import React, {Fragment} from "react";
import trashIcon from '../../style/trash.svg';

const eauDetector = new RegExp(/eau/im);

const Supp = ({ action, ingredient }) => {
    return <button onClick={() => action(ingredient)} className="supprimer" title="retirer de la liste des produits">
      <img width="15" src={trashIcon} alt="supprimer"/>
    </button>
}

const QuantiteParIngredients = ({iteration, isPoolish, hydra, ingredient, fonctions}) => {
    const {suppr, getWithcoef} = fonctions;
    let ingredientType = "undefined";
    if(ingredient.type !== undefined){
      if(ingredient.type === "petrisse") ingredientType = "petrisse";
      if(ingredient.type === "poolish") ingredientType = "poolish";
      if(ingredient.type === "global") ingredientType = "global";// Farine non divisée
      if(ingredient.type === "double") ingredientType = "double";
    }
  
    if(isPoolish && ingredientType === "global"){
      // lorsqu'il y a le poid de la farine réunit a un seul endroit (équivalent défaut).
      return null;
    }

    if(!isPoolish && ingredientType === "double"){
      // lorsqu'il s'agit de la ligne ayant les deux valeur de poid de farine pour la pétrissé et la poolish
      return null;
    }
  
    let label = ingredient.nom;
    if(eauDetector.test(label)){
      label = <Fragment>
        {ingredient.nom}
        <span className="hydratation">({hydra}%)</span>
      </Fragment>;
    }

    return <li key={iteration}>
      <label>{label}</label>
      {isPoolish ? 
        <Fragment>
          {ingredientType === "poolish" && <Fragment>
            <div className="base">{ingredient.quantite}</div>
            <div className="base">-</div>
          </Fragment>}
          {ingredientType === "double" && <Fragment>
            <div className="base">{ingredient.poolish}</div>
            <div className="base">{ingredient.petrisse}</div>
          </Fragment>}
          {ingredientType === "undefined" && <Fragment>
            <div className="base">-</div>
            <div className="base">{ingredient.quantite}</div>
          </Fragment>}
          {ingredientType === "petrisse" && <Fragment>
            <div className="base">-</div>
            <div className="base">{ingredient.quantite}</div>
          </Fragment>}
        </Fragment>
      :
        <Fragment>
          <div className="base">{ingredient.quantite}</div>
        </Fragment>
      }
      <div className="coef"></div>
        {isPoolish ? 
          <Fragment>
            {ingredientType === "poolish" && <Fragment>
              <div className="recette">{getWithcoef(ingredient.quantite)}</div>
              <div className="recette">
                -
                <Supp action={suppr} ingredient={ingredient} />
              </div>
            </Fragment>}
            {ingredientType === "double" && <Fragment>
              <div className="recette">{getWithcoef(ingredient.poolish)}</div>
              <div className="recette">
                {getWithcoef(ingredient.petrisse)}
                <Supp action={suppr} ingredient={ingredient} />
              </div>
            </Fragment>}
            {ingredientType === "undefined" && <Fragment>
              <div className="recette">-</div>
              <div className="recette">
                {getWithcoef(ingredient.quantite)}
                <Supp action={suppr} ingredient={ingredient} />
              </div>
            </Fragment>}
            {ingredientType === "petrisse" && <Fragment>
              <div className="recette">-</div>
              <div className="recette">
                {getWithcoef(ingredient.quantite)}
                <Supp action={suppr} ingredient={ingredient} />
              </div>
            </Fragment>}
          </Fragment>
        :
          <div className="recette">
            {getWithcoef(ingredient.quantite)}
            <Supp action={suppr} ingredient={ingredient} />
          </div>
        }
    </li>;
}


export default QuantiteParIngredients;