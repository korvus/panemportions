import React, { Fragment, useState, useContext, useMemo, useEffect } from "react";
import { PanemContext } from "../store/centralrecipes";
import trashIcon from '../style/trash.svg';

const multiplication = (a, b) => {
  return a * b;
};

const Pieces = () => {
  const { recipedata, setTotaldemande } = useContext(PanemContext);

  const [portions, setPortions] = useState(14);
  const [nbprd, setNbprd] = useState(1);
  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState(250);
  const [addPrd, setAddPrd] = useState(false);
  const [qtt, setQtt] = useState(recipedata);

  const total = useMemo(() => {
    let total = qtt.pieces.reduce(
      (somme, piece) => somme + multiplication(piece.nombre, piece.poid),
      0
    );
    return total;
  }, [qtt]);

  // Chaque fois que recipedata est update, il faut mettre a jour le state.
  useEffect(() => {
    setQtt(recipedata);
    setTotaldemande(multiplication(portions, total));
  }, [recipedata, qtt, portions, setTotaldemande, total]);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }

  const handleNewWeight = (e) => {
    setNewWeight(e.target.value);
  }

  const suppr = (piece) => {
    for (var i = 0; i < qtt.pieces.length; i++) {
        if (qtt.pieces[i].titre === piece.titre) {
          delete qtt.pieces[i];
          break;
        }
      }
      setQtt({ ...qtt });   
  }

  const setNewprd = () => {
    let newprd = {
        "nombre": nbprd,
        "titre": newName,
        "poid": newWeight
    }
    qtt.pieces.push(newprd);
    setAddPrd(!addPrd);
    setQtt({ ...qtt });
  }

  const changeQtt = (piece, direction) => {
    for (var i = 0; i < qtt.pieces.length; i++) {
      if (qtt.pieces[i].titre === piece.titre) {
        qtt.pieces[i].nombre = Math.max(0, qtt.pieces[i].nombre + direction);
        break;
      }
    }
    setQtt({ ...qtt });
  };

  const addPiece = () => {
    setAddPrd(!addPrd);
  }

  return (
    <Fragment>
      {qtt && (
        <section className="existing">
          <div className="pieces">
            <h2>{qtt.titre}</h2>
            <ul>
              {qtt.pieces.map((piece, i) => (
                <li key={i}>
                  <button onClick={() => changeQtt(piece, -1)}>-</button>
                  <b>{piece.nombre}</b>
                  <button onClick={() => changeQtt(piece, 1)}>+</button>
                  {` ${piece.titre}${piece.nombre > 1 ? "s" : ""} de ${
                    piece.poid
                  }gr `}
                  → {multiplication(piece.nombre, piece.poid)}gr
                  <button onClick={() => suppr(piece)} className="supprimer" title="retirer de la liste des produits">
                    <img width="15" src={trashIcon} alt="supprimer"/>
                  </button>
                </li>
              ))}
              <li className="total">
                <b>{total}</b>gr
              </li>
              <li className="nombre">
                <button onClick={() => setPortions(portions - 1)}>-</button>
                <b>{portions}</b>
                <button onClick={() => setPortions(portions + 1)}>
                  +
                </button>→ <b className="poidTotal">{multiplication(portions, total)}</b>gr
              </li>
              <li className={`${addPrd ? 'hide' : 'nopuce'}`}>
                  <button onClick={() => addPiece()} className="ajouterIngredients">Ajouter une pièce</button>
              </li>
            </ul>
            <div className={`formAddPrd ${addPrd ? '' : 'hide'}`}>
                <fieldset>
                    <label>Nom du produit</label>
                    <input type="text" id="titlePieces" value={newName} onChange={handleNewName}>
                    </input>
                </fieldset>
                <fieldset>
                    <label>Poid (en gr)</label>
                        <input value={newWeight} type="number" id="poid" onChange={handleNewWeight}>
                    </input>
                </fieldset>
                <fieldset>
                    <label>Nombre de produits</label>
                    <button onClick={() => setNbprd(nbprd - 1)}>-</button>
                        <b>{nbprd}</b>
                    <button onClick={() => setNbprd(nbprd + 1)}>+</button>
                </fieldset>
                <input onClick={() => setNewprd()} type="submit" className="submit" value="Ajouter" />
                <span onClick={() => setAddPrd(false)}>Annuler</span>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Pieces;
