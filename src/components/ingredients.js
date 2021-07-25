import React, { Fragment, useState, useCallback, useContext, useMemo, useEffect } from "react";
import { PanemContext } from "../store/centralrecipes";
import '../style/styleIngredients.css';
import QuantiteParIngredients from "./ingredients/pesee";
import Entete from "./ingredients/header";
import { roundTo, levainDetector, viennoiserieDetector } from "./functions.js";

const farineDetector = new RegExp(/farine/im);
const eauDetector = new RegExp(/eau/im);
const levureDetector = new RegExp(/levure/im);

// const roundTo = (value, decimals = 2) => Math.round(value * 10 ** decimals) / 10 ** decimals

const Ingredients = () => {

    const { recipedata, totaldemande } = useContext(PanemContext);

    const [qtt, setQtt] = useState(recipedata);
    const [coef, setCoef] = useState(1);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState(0);
    const [weightPoolish, setWeightPoolish] = useState(0);
    const [weightPetrisse, setWeightPetrisse] = useState(0);
    const [percentHydra, setPercentHydra] = useState(0);
    const [percentLevain, setPercentLevain] = useState(0);
    const [addIgrd, setAddIgrd] = useState(false);
    const [detrempe, setDetrempe] = useState(0);

    const getWithcoef = (base) => {
      return roundTo(base*coef, 1);
    }

    const totalRecettePoolish = useMemo(() => {
      let somme = 0;
      qtt.ingredientsbase.map((ingredient) => {
          let ingredientType = "undefined";
          if(ingredient.type !== undefined){
            if(ingredient.type === "petrisse") ingredientType = "petrisse";
            if(ingredient.type === "poolish") ingredientType = "poolish";
            if(ingredient.type === "global") ingredientType = "global";// Farine non divisée
            if(ingredient.type === "double") ingredientType = "double";
          }
          if(ingredientType === "double"){
            somme = somme + ingredient.poolish;
          }
          if(ingredientType === "poolish"){
            somme = somme + ingredient.quantite;
          }
          return null;
        }
      );
      setWeightPoolish(roundTo(somme*coef));// Si on appelle la méthode getCoef, react renvois un warning de missing dependencie...
      return somme;
    }, [qtt, coef]);

    const totalRecettePetrisse = useMemo(() => {
      let somme = 0;
      qtt.ingredientsbase.map((ingredient) => {
          let ingredientType = "undefined";
          if(ingredient.type !== undefined){
            if(ingredient.type === "petrisse") ingredientType = "petrisse";
            if(ingredient.type === "poolish") ingredientType = "poolish";
            if(ingredient.type === "global") ingredientType = "global";// Farine non divisée
            if(ingredient.type === "double") ingredientType = "double";
          }
          if(ingredientType === "double"){
            somme = somme + ingredient.petrisse;
          }
          if(ingredientType === "petrisse" || ingredientType === "undefined"){
            somme = somme + ingredient.quantite;
          }
          return null;
        }
      );
      setWeightPetrisse(roundTo(somme*coef, 0));
      return somme;
    }, [qtt, coef])

    const totalRecetteBase = useMemo(() => {
      if(qtt.poolish){
        return totalRecettePetrisse+totalRecettePoolish;
      } else {
        return qtt.ingredientsbase.reduce(
          (somme, ingredient) => {
            if(ingredient.type !== undefined){
              if(ingredient.type === "double"){
                return somme;
              }
            }
            return somme + ingredient.quantite
          }, 0
        );
      }
    }, [qtt, totalRecettePetrisse, totalRecettePoolish]);

    const addIngredient = () => {
      setAddIgrd(!addIgrd);
    }

    const displayPercentLevain = useCallback(() => {
      const levainQtt = qtt.ingredientsbase.find(el => levainDetector.test(el.nom));
      if(levainQtt !== undefined){
        const levainPourcentage = roundTo(levainQtt.quantite*100/(totalRecetteBase-levainQtt.quantite), 0);
        setPercentLevain(levainPourcentage);
      }
    }, [totalRecetteBase, qtt]);

    const setHydra = useCallback(() => {
      const totalFarine = qtt.ingredientsbase.reduce((somme, ingredient) => {
        if(farineDetector.test(ingredient.nom)){
          if(ingredient.type !== undefined){
            if(ingredient.type === "double"){
              return somme;
            }
          }
          return somme = somme + ingredient.quantite;
        }
        return somme;
      }, 0);
      const ingredientEau = qtt.ingredientsbase.find(ingredient => eauDetector.test(ingredient.nom));
      const qttEau = ingredientEau.quantite;
      const percentHydratation = roundTo((qttEau*100)/totalFarine, 0);
      setPercentHydra(percentHydratation);
    }, [qtt]);

    const updateData = useCallback((quantite) => {

      let levain = quantite.ingredientsbase.find(el => levainDetector.test(el.nom));
      let viennoiserie = quantite.ingredientsbase.find(el => viennoiserieDetector.test(el.nom));
      if(!viennoiserie) setDetrempe(0);

      // Si paramètre poolish, on calcul le pourcentage de chaque farine, et on en retire le pourcentage d'eau
      if(quantite.poolish){
        let poidEau = 0;
        let totalFarinePoid = 0;

        quantite.ingredientsbase.forEach((ingredient, a) => {

          let ingredientType = "undefined";
          if(ingredient.type !== undefined){
            if(ingredient.type === "petrisse") ingredientType = "petrisse";
            if(ingredient.type === "poolish") ingredientType = "poolish";
            if(ingredient.type === "global") ingredientType = "global";// Farine non divisée
            if(ingredient.type === "double") ingredientType = "double";
          }

          // Détermine le poid total de la farine
          if(farineDetector.test(ingredient.nom) && ingredientType !== "double"){
            totalFarinePoid = totalFarinePoid + ingredient.quantite;
          };
          if(eauDetector.test(ingredient.nom)){
            poidEau = ingredient.quantite;
            quantite.ingredientsbase[a].type = "poolish";
          }
          if(levureDetector.test(ingredient.nom)){
            quantite.ingredientsbase[a].type = "poolish";
          }
        });

        quantite.ingredientsbase.map((ingredient, i) => {
          if(farineDetector.test(ingredient.nom) && ingredient.type === undefined){
            let percentFarineType = roundTo(ingredient.quantite*100/totalFarinePoid);
            // Calculer la meme proportion d'eau
            let farineProportionnelle = roundTo((poidEau*percentFarineType)/100, 0);
            quantite.ingredientsbase[i].type = "global";

            let poolishFarine = {
              "type": "double",
              "nom": ingredient.nom,
              "poolish": farineProportionnelle,
              "petrisse": roundTo(ingredient.quantite - farineProportionnelle, 1),
            }

            if(!quantite.ingredientsbase.find(el => 
              el.type !== undefined && el.type === "poolish" && el.nom === ingredient.nom
            )){
              quantite.ingredientsbase.unshift(poolishFarine);
            }
          }
          return null;
        });

        setQtt(quantite);
        // Sinon
      }else if(levain){
        setQtt(quantite);
        setHydra();
        displayPercentLevain();
      }else if(viennoiserie){
        const qttBeurreSec = quantite.ingredientsbase.find(el => viennoiserieDetector.test(el.nom)).quantite;
        const poidProduitFinal = quantite.ingredientsbase.reduce((somme, ingredient) => {
            return somme = somme + ingredient.quantite;
        }, 0);
        const poidDetrempe = poidProduitFinal - qttBeurreSec;
        setDetrempe(poidDetrempe);
        setQtt(quantite);
        setHydra();
      } else {
        setPercentLevain(0);
        setQtt(quantite);
        setHydra();
      }
    }, [setHydra, displayPercentLevain]);

    useEffect(() => {
        updateData(recipedata);
        setCoef(roundTo((totaldemande/totalRecetteBase), 2));
      }, [qtt, updateData, recipedata, totalRecetteBase, totaldemande]
    );

    const togglePoolish = (val) => {
      qtt.poolish = !val;
      setQtt({ ...qtt });
    }

    const suppr = (piece) => {
      for (var i = 0; i < qtt.ingredientsbase.length; i++) {
          if (qtt.ingredientsbase[i].nom === piece.nom) {
            delete qtt.ingredientsbase[i];
            break;
          }
        }
        // poolishParameter({ ...qtt });
        setQtt({ ...qtt });
    }

    const handleNewName = (e) => {
      setNewName(e.target.value);
    }

    const handleNewWeight = (e) => {
      setNewWeight(parseInt(e.target.value));
    }

    const FinTableauSecondCol = ({qtt, weightPoolish, weightPetrisse, percentLevain}) => {
      if(qtt.poolish){
        return <Fragment>
          <div className="base">{weightPoolish}</div>
          <div className="base">{weightPetrisse}</div>
        </Fragment>
      }
      if(percentLevain > 0){
        return <Fragment>
          <div className="base">-</div>
          <div className="base">{weightPetrisse}</div>
        </Fragment>
      }
      return <div><b>{totaldemande}</b>gr</div>
    }

    const FinTableauFirstCol = ({qtt, totalRecettePoolish, totalRecettePetrisse}) => {
      if(qtt.poolish){ 
        return <Fragment>
          <div className="base">{totalRecettePoolish}</div>
          <div className="base">{totalRecettePetrisse}</div>
        </Fragment>
      }
      if(percentLevain > 0){ 
        return <Fragment>
          <div className="base">-</div>
          <div className="base">{totalRecetteBase}</div>
        </Fragment>
      }
      return <div className="base"><b>{totalRecetteBase}</b>gr</div>
    } 

    const setNewIngrd = () => {
      let newingredient = {
        "nom": newName,
        "quantite": newWeight
      }
      qtt.ingredientsbase.push(newingredient);
      setAddIgrd(!addIgrd);
      setQtt({ ...qtt });
    }

    return (
    <Fragment>
      {qtt && (
        <section>
          <div className="ingredients">
            <div className="poolish">
              {detrempe === 0 && <Fragment>
                  <label htmlFor="poolish">Poolish</label>
                  <input id="poolish" checked={qtt.poolish} type="checkbox" onChange={() => togglePoolish(qtt.poolish)} />
                </Fragment>
              }
            </div>
            <ul>
              <Entete isPoolish={qtt.poolish} percentLevain={percentLevain} />
              {qtt.ingredientsbase.map((ingredient, i) => (
                <QuantiteParIngredients detrempe={detrempe} percentLevain={percentLevain} hydra={percentHydra} key={i} iteration={i} isPoolish={qtt.poolish} coef={coef} ingredient={ingredient} fonctions={{getWithcoef, suppr}} />
              ))}
                <li className="total">
                    <label>Total</label>
                    <FinTableauFirstCol percentLevain={percentLevain} qtt={qtt} totalRecettePoolish={totalRecettePoolish} totalRecettePetrisse={totalRecettePetrisse} />
                    <div className="coef">{coef}</div>
                    <FinTableauSecondCol percentLevain={percentLevain} qtt={qtt} weightPoolish={weightPoolish} weightPetrisse={weightPetrisse} />
                </li>
                <li className={`${addIgrd ? 'hide' : 'addIngredient'}`}>
                  <div>
                    <button onClick={() => addIngredient()} className="ajouterIngredients">
                      Ajouter un ingrédient
                    </button>
                  </div>
                </li>
            </ul>

            <div className={`formAddPrd ${addIgrd ? '' : 'hide'}`}>
                <fieldset>
                    <label>Nom de l'ingredient</label>
                    <input type="text" id="title" value={newName} onChange={handleNewName}>
                    </input>
                </fieldset>
                <fieldset>
                    <label>Poid dans la recette de base (pour 1000gr de farine)</label>
                      <input value={newWeight} type="number" id="poid" onChange={handleNewWeight}>
                    </input>
                </fieldset>
                <input onClick={() => setNewIngrd()} type="submit" className="submit" value="Ajouter" />
                <span onClick={() => setAddIgrd(false)}>Annuler</span>
            </div>
                
            </div>
        </section>
      )}
    </Fragment>
  );
};

export default Ingredients;
